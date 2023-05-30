import doctorModel from "../models/doctorModel.js"
import userModel from "../models/userModels.js"

export const getAllUsers = async(req, res) =>{
    try {
        const users = await userModel.find({})

        res.status(200).send({
            data:  users,
            message: "Users data list",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while fetching users',
            error
        })
    }
}

export const getAllDocteurs = async(req, res) =>{
    try {
        const docteurs = await  doctorModel.find({})

        res.status(200).send({
            data:  docteurs,
            message: "docteur data list",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while fetching docteurs',
            error
        })
    }
}

export const changeAccountStatusCls = async(req, res) => {

    try {
        const  {docteurId, status}  = req.body;

        const docteur  = await doctorModel.findByIdAndUpdate(docteurId, {status});
        const users = await userModel.findOne({_id: docteur.userId});
        const notification = users.notification;
        notification.push({
            type: 'Demande de compte docteur mise à jour',
            message: `Votre demande de compte docteur est ${status}`,
            onclickPath: '/notification'
        })
        users.isDocteur = status === "approuvée"  ? true : false;
        await users.save();
        res.status(201).send({
            success: true,
            message: 'Account Status Updated',
            data: docteur,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while fetching docteurs',
            error
        })
    }
}