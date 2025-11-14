import express from "express";
import { receiveData, getAllData } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/send", receiveData);
router.get("/all", getAllData);

export default router;
