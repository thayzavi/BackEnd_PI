import express from "express";
import Log from "../models/Log.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const logs = (await Log.find()).toSorted({ createdAt: -1});
    res.json(logs);
});

export default router;