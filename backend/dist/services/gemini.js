"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTasks = generateTasks;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function generateTasks(topic) {
    const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        }),
    });
    const data = await response.json();
    if (data.error) {
        console.error("Gemini API Error:", data.error);
        throw new Error(`Gemini API Error: ${data.error.message}`);
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    const tasks = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    return tasks;
}
