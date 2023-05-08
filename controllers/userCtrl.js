import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";

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

export const getALLNotificationController = (req, res) =>{
    try {
      const user = userModel.findOne({id: req.body.userId})

      
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error
      })
    }
}