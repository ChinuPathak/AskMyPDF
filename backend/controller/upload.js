import pkg from '../parser.cjs';
const {parser} = pkg;
import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone';

const api_key = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey:api_key })
const pinecone_api_key = process.env.PINECONE_API_KEY
const pinecone_index = process.env.PINECONE_INDEX

const upload = async(req , res , next) => {
    console.log("body>>>>>>>>>>>" , req.body)
    const files = req.files
    console.dir(files)
    const filePath = files.map(item => item.path)
    console.log("filePath>>>>>>>>>" , filePath)
    const docsData = (
    await Promise.all(
      filePath.map(async (item) => {
        const loader = new PDFLoader(item);
        return await loader.load();
      })
    )
    ).flat();

    console.log("docsData>>>>>>>>>>>>>" , docsData);
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(docsData);
    console.log("chunk>>>>>>>>>>>>>>>>" , splitDocs)
    // const models = await ai.models.list();
    // console.log(models);

    const pc = new Pinecone({
      apiKey: pinecone_api_key
    });

    const index = pc.index(pinecone_index, process.env.PINECONE_HOST)

    // embed documents
    const docEmbeddings = await Promise.all(
      splitDocs.map(async (doc) => {
        const res = await ai.models.embedContent({
          model: "gemini-embedding-001",
          contents: [
            {
              role: "user",
              parts: [{ text: doc.pageContent }],
            },
          ],
        });

        return res.embeddings[0].values;
      })
    );

    console.log("docEmbedding>>>>>>>>>>>>>>>" , docEmbeddings)

    const records = docEmbeddings.map((embedding, i) => ({
      id: `doc-${i}-${Date.now()}`,
      values: embedding,
      metadata: {
        text: splitDocs[i].pageContent,
      },
    }));
    console.log("records>>>>>>>>>>>>>>" , records)

    console.log("index>>>>>>>>>>>>" , index)
    await index.namespace("__default__").upsert({
      records: records 
    });
    
    res.json({
        message : "Pdf Stored Successfully",
        totalFiles : filePath.length,
        fileName : filePath
    })
}
export default upload