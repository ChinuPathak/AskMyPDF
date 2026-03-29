import pkg from '../parser.cjs';
const {parser} = pkg;
import {chattingPrompt} from "../prompt/chatingPrompt.js"
import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();
import { chunk } from "llm-chunk";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone';


const api_key = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey:api_key })
const pinecone_api_key = process.env.PINECONE_API_KEY
const pinecone_index = process.env.PINECONE_INDEX

const chat = async(req , res , next) => {
    const filePath = req.file.path;
    console.log("filepath>>>>>>>>>>",filePath);
    console.log("body>>>>>>>>>>>" , req.body)
    const query = req.body.query
    console.log(query)
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    console.log("docsData>>>>>>>>>>>>" , docs)
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(docs);
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

    console.log("ENV INDEX:", pinecone_index);
    console.log("splitDocs:", splitDocs.length);
    console.log("docEmbeddings:", docEmbeddings.length);
    console.log("first embedding length:", docEmbeddings[0]?.length);

    const records = docEmbeddings.map((embedding, i) => ({
      id: `doc-${i}-${Date.now()}`,
      values: embedding,
      metadata: {
        text: splitDocs[i].pageContent,
      },
    }));

    // console.log("vectors length:", vectors.length);
    console.log("records>>>>>>>>>>>>>>" , records)
    console.log("first records:", records[0]);
    console.log(Array.isArray(records[0]?.values))

    console.log("index>>>>>>>>>>>>" , index)
    await index.namespace("__default__").upsert({
      records: records 
    });

    const queryRes = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: [
        {
          role: "user",
          parts: [{ text: query }],
        },
      ],
    });

    const queryEmbedding = queryRes.embeddings[0].values;

    const searchResult = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    const releventChunk = searchResult.matches.map(
      match => ({ pageContent: match.metadata.text })
    );

    console.log("releventChunk>>>>>>>>>>>>>",releventChunk)
    const formattedData = releventChunk
    .map(item => item.pageContent)
    .join("\n\n");
    const prompt = chattingPrompt(query , formattedData)
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    console.log("Response>>>>>>>>>>>>>>>>" , response.text)
    res.json({
        answer : response.text
    })
}
export default chat