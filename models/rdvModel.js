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
    lastname: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "en attente"
    },
    time: {
        type: String,
        required: true
    }
},{timestamps: true})

const rdvModel = mongoose.model('rdv', rdvSchema);
export default rdvModel;