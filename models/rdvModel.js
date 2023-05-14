import mongoose from "mongoose";

const rdvSchema  = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    docteurId: {
        type: String,
        required: true
    },
    docteurInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    time: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
},{timestamps: true})

const rdvModel = mongoose.model('rdv', rdvSchema);
export default rdvModel;