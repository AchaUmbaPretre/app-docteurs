import express from "express";
import {appDocteurController,
        authController,
        bookRdvController,
        bookingAvailabilityController,
        deleteALLNotificationController, 
        getALLNotificationController,
        getAllDocteurController,
        loginController,
        registerController,
        userRdvController}
        from "../controllers/userCtrl.js"
import { authMid } from "../midllewares/authMidlleware.js";

const router = express.Router();


router.post("/login", loginController);

router.post("/register", registerController);

router.post("/getUser", authMid, authController);

router.post("/appDocteur", authMid, appDocteurController);

router.post("/get-all-notification", authMid, getALLNotificationController);

router.post("/delete-all-notification", authMid, deleteALLNotificationController);

router.get("/getAllDocteur", authMid, getAllDocteurController);

router.post("/book-rdv", authMid, bookRdvController);

router.post("/booking-availability", authMid, bookingAvailabilityController);

router.get("/user-rdv", authMid, userRdvController);

export default router;
