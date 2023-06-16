import { RequestHandler } from 'express';
import Jwt from 'jsonwebtoken';
import usersSchema from '../../../models/app/userSchema';
import token from '../../../models/app/userSchema';

const userLogoutController : RequestHandler = async(req, res) =>{
    const userToken = req.headers.authorization?.split(" ")[1]
    const decodedClaims : any = Jwt.verify(userToken!,process.env.SECRET_KEY!)
    const user: any = await usersSchema.findById(decodedClaims.id)
   
    try {   
    if(!user){
        return res.status(404).json({
            message : "User not found"
        })
    }
    if (user.token! != userToken) {
        return res.status(498).json({
            message: "Invalid Token"
        });
    }

    let now = new Date()
    now.setMinutes(now.getMinutes()+0)
    now = new Date(now)

    //console.log(now)
   
    res.cookie("token",token,{
        httpOnly : false,
        expires : now
    })
    return  res.status(200).json({
        message : "Logout Successfully"
    })

    } catch (error) {
        return res.status(500).json(error)
        
    }
}
export default userLogoutController;

