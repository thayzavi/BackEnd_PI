import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    action: {
        type: String, 
        required: true
    },
    payload: {
        type: Object
    },
    ip: {
        type: String
    },
    userAgent: {
        type: String
    },
    createdAt: {
        type: Date, default: Date.now
    }
});

export default mongoose.model("Log", logSchema);