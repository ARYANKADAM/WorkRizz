// import { GoogleGenerativeAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY); // remove later


export default genAI;