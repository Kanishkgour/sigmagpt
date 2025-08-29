
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Conection DB Successful");
    } catch (err) {
        console.log("Error to connect: ", err)
    }
}
app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`On Port ${PORT} Gemini Listening...`)
    connectDB();
})
