import Jwt from 'bcryptjs'

export const authMid = async (req, res, next) =>{

    try{
        const token = await req.headers('authorization').split(' ')[1];
        Jwt.verify(token, process.env.JWT, (error, decode) =>{
        if(error){
            return res.status(200).send({
                message: 'Auth Fialed',
                success: false
            })
        }
        else{
            req.body.userId = decode.id
            next()
        }
    })
    }
    catch(error){
        console.log(error)
        res.status(401).send({
            message: 'Auth fialed',
            success: false
        })
    }
}