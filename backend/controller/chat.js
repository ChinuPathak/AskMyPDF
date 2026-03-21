import pkg from '../parser.cjs';
const {parser} = pkg;
import {chattingPrompt} from "../prompt/chatingPrompt.js"
import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();
import { chunk } from "llm-chunk";

const api_key = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey:api_key })

const chat = async(req , res , next) => {
    console.log("file>>>>>>>>>>>" , req.file)
    console.log("body>>>>>>>>>>>" , req.body)
    const query = req.body.query
    console.log(query)
    const fileBuffer = req.file.buffer;
    const data = await parser(fileBuffer)
    console.log("data>>>>>>>>>>>>" , data)
    const chunks = chunk(data, { 
        minLength: 128, 
        maxLength: 1024, 
        overlap: 128 
    });
    console.log(chunks);
    const prompt = chattingPrompt(query , chunks)
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