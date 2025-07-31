import dotenv from 'dotenv';
import OpenAI from 'openai/index.js';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gemini-2.5-flash",
            // reasoning_effort: "low",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "who are you",
                },
            ],
        })
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            reasoning_effort: "low",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    // content: "who are you",
                    content:message,
                },
            ],
        });
        return (response.choices[0].message.content);
        console.log(response.choices[0].message.content);

    } catch (err) {
        console.log("Error: ", err);
    }
}

export default getOpenAIAPIResponse;