import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId : { type:String },
    firstname: { type:String, required:[ true, "firstname is required" ]},
    lastname: { type: String, required: [ true, "lastname is required"]},
    phone: { type: String, required: [ true, "phone is required"]},
    email: { type: String, required: [ true, "email is required"]},
    website: { type: String},
    adresse: { type: String, required: [ true, "adresse is required"]},
    specialisation: { type: String, required: [ true, "specialisation is required"]},
    experience: { type: String, required: [ true, "experience is required"]},
    feesPerCunsaltation: { type: String, required: [ true, "fee is required"]},
    status: { type: String, default: "pending" },
    timings: { type: Object, required: [ true, "work timing is required"]}
},
{timestamps: true}
)

const doctorModel = mongoose.model('doctor', doctorSchema)

export default doctorModel;