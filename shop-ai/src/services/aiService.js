import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function askAI(message) {
  const prompt = `
You are ShopAI, an AI shopping assistant.

Your job is to help users:
- Recommend products
- Compare products
- Suggest budget-friendly options
- Give short and helpful answers

User Question:
${message}
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(prompt);

  return result.response.text();
}