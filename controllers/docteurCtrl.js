import doctorModel from "../models/doctorModel.js"

export const getDocteurInfoCtrl = async (req, res) =>{
    try {
        const docteur = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            data:  docteur,
            message: "Docteur data fetch success",
            success: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error fetching docteurs Details',
            error
        })
    }
}

export const updateProfileCtrl = async (req, res) =>{
    try {
        const docteur = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(200).send({
            data: docteur,
            message: "le profil de docteur est modifié",
            success: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'docteurs profile ipdate issue Details',
            error
        })
    }
}

export const getDocteurByIdController = async (req, res) =>{
    try {
        const docteur = await doctorModel.findOne({_id: req.body.docteurId});
        res.status(200).send({
            data: docteur,
            message: 'sigle docteur info fetched',
            success: true
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Single docteur  info',
            error
        })
    }
}