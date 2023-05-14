import express from "express";
import { authMid } from "../midllewares/authMidlleware.js";
import { changeAccountStatusCls, getAllDocteurs, getAllUsers } from "../controllers/adminCtrl.js";

const router = express.Router();

    router.get('/getAllUsers',authMid, getAllUsers )
    router.get('/getAllDocteur',authMid, getAllDocteurs )
    router.post('/changeAccountStatus',authMid, changeAccountStatusCls )

export default router;