// import OpenAI from "openai";
// import dotenv from 'dotenv';
// dotenv.config();
// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

// const response = await openai.chat.completions.create({
//     model: "gemini-2.5-flash",
//     // reasoning_effort: "low",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//             role: "user",
//             content: "who are you",
//         },
//     ],
// });

// console.log(response.choices[0].message);

import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from "openai/client.js";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());



// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Conection DB Successful");
    } catch (err) {
        console.log("Error to connect: ", err)
    }
}
app.use("/api", chatRoutes); //to access all routes 

// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gemini-2.5-flash",
//             // reasoning_effort: "low",
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 {
//                     role: "user",
//                     content: "who are you",
//                 },
//             ],
//         })
//     }
//     try {
//         // const response = await fetch("https://api.openai.com/v1/chat/completions" , options);
//         const response = await openai.chat.completions.create({
//             model: "gemini-2.5-flash",
//             reasoning_effort: "low",
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 {
//                     role: "user",
//                     // content: "who are you",
//                     content : req.body.message,
//                 },
//             ],
//         });
//         res.send(response.choices[0].message.content);
//         console.log(response.choices[0].message.content);
//     } catch (err) {
//         console.log("Error: ", err);
//     }
// })
// 


app.listen(PORT, () => {
    console.log(`On Port ${PORT} Gemini Listening...`)
    connectDB();
})