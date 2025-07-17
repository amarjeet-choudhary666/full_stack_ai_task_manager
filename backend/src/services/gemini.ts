import dotenv from "dotenv";
dotenv.config();

type GeminiResponse = {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
  error?: {
    code: number;
    message: string;
    status?: string;
  };
};

export async function generateTasks(topic: string): Promise<string[]> {
  const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
    {
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
    }
  );

  const data: GeminiResponse = await response.json();

  if (data.error) {
    console.error("Gemini API Error:", data.error);
    throw new Error(`Gemini API Error: ${data.error.message}`);
  }

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

  const tasks: string[] = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return tasks;
}
