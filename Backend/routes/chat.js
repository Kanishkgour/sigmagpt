import express from 'express';
const router = express();
import Thread from '../models/Thread.js';
import getOpenAIAPIResponse from "../utils/openai.js"


router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc+",
            title: "Testing seconds Thread"
        })
        const response = await thread.save();
        res.send(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to connect" });
    }
})

// Get all Threads
router.get("/thread", async (req, res) => {
    try {
        const thread = await Thread.find({});
        res.json(thread);
    } catch (error) {
        console.log(error);
    }
})

// Thread on id
router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({threadId})
        if (!thread) {
            res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch" });
    }
})

// delete thread
router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const delThread = await Thread.findOneAndDelete(threadId);
        if (!delThread) {
            res.status(404).json({ error: "Thread not found" });
        }
        res.status(200).json({ success: "Thread deleted succesfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch" });
    }
})

router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        res.status(400).json({ error: "missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId })

        if (!thread) {
            // create a new thread
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }],
            })
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        const AsistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({ role: "assistant", content: AsistantReply });
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: AsistantReply });


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong" });
    }
})



export default router;