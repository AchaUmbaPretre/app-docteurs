import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import rdvModel from "../models/rdvModel.js";
import moment from "moment";

export const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "utilisateur existe deja", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Enregistrer avec succes", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `controleur de registre ${error.message}`,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "utilisateur non trouvé", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Email ou mot de passe invalid", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "connexion réussie", success: true, token});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Erreur dans le controleur de connexion ${error.message}` });
  }
};

export const authController = async(req, res) =>{

    try{
      const user = await userModel.findOne({_id: req.body.userId})
        user.password = undefined
      if(!user){
        return res.status(200).send({
          message: 'Utilisateur non trouvé',
          success: false
        });
      }
      else{
        res.status(200).send({
          success: true,
          data: user
        });
      }
    }
    catch(error){
      console.log(error)
      res.status(500).send({
        message: "Erreur d'authentification",
        success: false,
        error
      })
    }
}

export const appDocteurController = async(req, res) =>{

  try {
      const newAppDocteur = await doctorModel({...req.body, status: 'pending'});
      await newAppDocteur.save();
      const  adminUser = await userModel.findOne({isAdmin: true});
      const notification = adminUser.notification;

      notification.push({
        type: "app-docteur-request",
        message: `${newAppDocteur.firstname} ${newAppDocteur.lastname} a demandé un compte docteur`,
        data: {
          docteurId: newAppDocteur._id,
          name: newAppDocteur.firstname + "" + newAppDocteur.lastname,
          onClickPath: '/admin/docteur'
        }
      })
      await userModel.findOneAndUpdate(adminUser._id, {notification})
        res.status(201).send({
          message: "compte docteur appliqué avec succes",
          success: true,
        })
    
  } catch (error) {
    console.log(error)
      res.status(500).send({
        message: "erreur lors de la demande du docteur",
        success: false,
        error
      })
  }

}

export const getALLNotificationController = async (req, res) =>{
    try {
      const user = await userModel.findOne({_id: req.body.userId})
      const seennotification =  user.seennotification;
      const notification  =  user.notification;
      seennotification.push(...notification);
      user.notification = [];
      user.seennotification = notification;
      const updateUser = await user.save();
        res.status(200).send({
          success: true,
          message: "toutes les notifications marquées comme lues",
          data: updateUser,
        })
      
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "erreur dans la notification",
        success: false,
        error
      })
    }
}

export const deleteALLNotificationController = async (req, res) =>{
  try {
    const user = await userModel.findOne({_id: req.body.userId})
     user.notification = [];
     user.seennotification  = [];
     const updateUser = await user.save();
     updateUser.password = undefined;

     res.status(200).send({
        success: true,
        message: "Notification supprimée avec succes",
        data: updateUser,
     })
    
  } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "impossible de supprimer toutes les notifications",
        success: false,
        error
      })
  }
}

export const getAllDocteurController = async (req, res) =>{
  try {
    const docteurAll = await doctorModel.find({status: "approuvée"});
    res.status(200).send({
      success: true,
      message: "listes des docteurs recupérées avec succés",
      data: docteurAll
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Erreur lors de la recuperation du docteur",
      success: false,
      error
    })
  }
}

export const bookingAvailabilityController = async (req, res) =>{
  try {
    const date = moment(req.body.date, 'DD-MM-YY').toISOString();
    const fromTime = moment(req.body.time, 'HH:mm').subtract(1 , "hours").toISOString();
    const toTime = moment(req.body.time, 'HH:mm').add(1 , "hours").toISOString();
    const docteurId = req.body.docteurId;
    const rdv =  await rdvModel.find({docteurId, date,time:{
      $gte: fromTime,
      $lte: toTime
    }})

    if(rdv.length > 0){
      res.status(200).send({
        success: true,
        message: "Rendez-vous indisponible pour le moment",
      })
    }
    else{
      return res.status(200).send({
        success: true,
        message: "Rendez-vous réservé avec succes",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Erreur in booking",
      success: false,
      error
    })
  }
}


export const bookRdvController = async (req, res) =>{
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = 'en attente'
    const newRdv =  new rdvModel(req.body)
    await newRdv.save()
    const user = await userModel.findOne({ _id: req.body.docteurInfo.userId });
    user.notification.push({
      type: 'New-rdv-request',
      message: `Une nouvelle demande de rendez-vous de ${req.body.userId.name}`,
      onclickPath: '/user/rdv'
    })
    await user.save()
    res.status(200).send({
      success: true,
      message: "Rendez-vous réservé avec succes",
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Erreur lors de la recuperation du docteur",
      success: false,
      error
    })
  }
}


export const userRdvController = async (req, res) =>{
  try {
    const userRdv = await rdvModel.find({userId: req.body.userId});
    
    res.status(200).send({
      message: "le rendez-vous des utilisateurs a ete recuperé avec succes",
      success: true,
      data: userRdv
    })

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error in user rendez-vous",
      success: false,
      error
    })
  }
}