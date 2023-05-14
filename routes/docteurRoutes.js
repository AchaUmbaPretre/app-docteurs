import express from "express";
import { authMid } from "../midllewares/authMidlleware.js";
import { getDocteurByIdController, getDocteurInfoCtrl, updateProfileCtrl } from "../controllers/docteurCtrl.js";

const router = express.Router();

    router.post('/getDocteurInfo',authMid, getDocteurInfoCtrl )
    router.post('/updateProfile',authMid, updateProfileCtrl )
    router.post('/getDocteurById',authMid, getDocteurByIdController )

export default router