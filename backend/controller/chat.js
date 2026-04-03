import pkg from '../parser.cjs';
const { parser } = pkg;
import { chattingPrompt } from "../prompt/chatingPrompt.js"
import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();
import { Pinecone } from '@pinecone-database/pinecone';

const api_key = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: api_key })
const pinecone_api_key = process.env.PINECONE_API_KEY
const pinecone_index = process.env.PINECONE_INDEX

const chat = async (req, res, next) => {
  const pc = new Pinecone({
    apiKey: pinecone_api_key
  });

  const index = pc.index(pinecone_index, process.env.PINECONE_HOST)
  console.log("body>>>>>>>>>>>", req.body)
  const query = req.body.query
  console.log(query)

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
    topK: 5,
    includeMetadata: true,
  });

  const releventChunk = searchResult.matches.map(
    match => ({ pageContent: match.metadata.text })
  );

  console.log("releventChunk>>>>>>>>>>>>>", releventChunk)
  const formattedData = releventChunk
    .map(item => item.pageContent)
    .join("\n\n");
  const prompt = chattingPrompt(query, formattedData)
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  console.log("Response>>>>>>>>>>>>>>>>", response.text)
  res.json({
    answer: response.text
  })
}
export default chat