import express from "express";
import { authMid } from "../midllewares/authMidlleware.js";
import { docteurRdvController, getDocteurByIdController, getDocteurInfoCtrl, updateProfileCtrl, updateStatusController } from "../controllers/docteurCtrl.js";

const router = express.Router();

    router.post('/getDocteurInfo',authMid, getDocteurInfoCtrl )
    router.post('/updateProfile',authMid, updateProfileCtrl )
    router.post('/getDocteurById',authMid, getDocteurByIdController )
    router.get('/docteur-rendezVous',authMid, docteurRdvController )
    router.post('/update-status',authMid, updateStatusController )

export default router