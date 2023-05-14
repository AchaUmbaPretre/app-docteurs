import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import rdvModel from "../models/rdvModel.js";

export const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

export const authController = async(req, res) =>{

    try{
      const user = userModel.findById({_id: req.body.userId})
        user.password = undefined
      if(!user){
        return res.status(200).send({
          message: 'Auth not found',
          success: false
        })
      }
      else{
        res.status(200).send({
          success: true,
          data: user
        })
      }
    }
    catch(error){
      console.log(error)
      res.status(500).send({
        message: "Auth error",
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
        message: `${newAppDocteur.firstname} ${newAppDocteur.lastname} Has Applied For A Doctor Account`,
        data: {
          docteurId: newAppDocteur._id,
          name: newAppDocteur.firstname + "" + newAppDocteur.firstname,
          onclickPath: '/admin/docteurs'
        }
      })
      await userModel.findOneAndUpdate(adminUser._id, {notification})
        res.status(201).send({
          message: "Docteur Account Applied Successfully",
          success: true,
        })
    
  } catch (error) {
    console.log(error)
      res.status(500).send({
        message: "Error While Applying For Doctor",
        success: false,
        error
      })
  }

}

export const getALLNotificationController = async (req, res) =>{
    try {
      const user = userModel.findOne({_id: req.body.userId})
      const seennotification =  user.seennotification;
      const notification  =  user.notification;
      seennotification.push(...notification);
      user.notification = [];
      user.seennotification = notification;
      const updateUser = await user.save()
        res.status(200).send({
          success: true,
          message: "all notification marked as read",
          data: updateUser
        })
      
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error
      })
    }
}

export const deleteALLNotificationController = async (req, res) =>{
  try {
    const user = userModel.findOne({_id:  req.body.userId})
     user.notification = [];
     user.seennotification  = [];
     const updateUser = await user.save();
     user.password = undefined;

     res.status.send({
        success: true,
        message: "Notification Deleted Successfully",
        data: updateUser
     })
    
  } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "unable  to delete all notification",
        success: false,
        error
      })
  }
}

export const getAllDocteurController = async (req, res) =>{
  try {
    const docteurAll = await doctorModel.find({status: "approved"});
    res.status.send({
      success: true,
      message: "Docteur Lists Fetched Successfully",
      data: docteurAll
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error while fetching Docteur",
      success: false,
      error
    })
  }
}

export const bookRdvController = async (req, res) =>{
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = 'pending'
    const newRdv =  new rdvModel(req.body)
    await newRdv.save()
    const user = await userModel.findOne({_id: req.body.docteurId.userId});
    user.notification.push({
      type: 'New-rdv-request',
      message: `A new rendez vous Request from ${req.body.userId.name}`,
      onclickPath: '/user/rdv'
    })
    await user.save()
    res.status(200).send({
      success: true,
      message: "Rendez vous Book Successfully",
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error while fetching Docteur",
      success: false,
      error
    })
  }
}

export const bookingAvailabilityController = async (req, res) =>{
  try {
    const date = moment(req.body.date, 'DD-MM-YY').toISOString();
    const fromTime = moment(req.body.time, 'HH:mm').subtract(1, "hours").toISOString();
    const toTime = moment(req.body.time, 'HH:mm').subtract(1, "hours").toISOString();
    const docteurId = req.body.docteurId;
    const rdv =  await rdvModel.find({docteurId, date,time:{
      $gte: fromTime,
      $lte: toTime
    }})

    if(rdv.length > 0){
      res.status(200).send({
        success: true,
        message: "Rendez-vous not availibale at this time",
      })
    }
    else{
      return res.status(200).send({
        success: true,
        message: "Rendez-vous Booked successfully",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error while fetching Docteur",
      success: false,
      error
    })
  }
}

export const userRdvController = async (req, res) =>{
  try {
    const userRdv = await rdvModel.find({userId: req.body.userId});
    
    res.status(200).send({
      message: "Users rendez-vous fetchs Successfully",
      success: true,
      data: userRdv
    })

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error while fetching Docteur",
      success: false,
      error
    })
  }
}