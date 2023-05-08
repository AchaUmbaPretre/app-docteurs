import express from "express";
import {  appDocteurController, authController, getALLNotificationController, loginController, registerController} from "../controllers/userCtrl.js"
import { authMid } from "../midllewares/authMidlleware.js";

const router = express.Router();


router.post("/login", loginController);

router.post("/register", registerController);

router.post("/getUser", authMid, authController)

router.post("/appDocteur", authMid, appDocteurController)

router.post("/get-all-notification", authMid, getALLNotificationController)

export default router;
