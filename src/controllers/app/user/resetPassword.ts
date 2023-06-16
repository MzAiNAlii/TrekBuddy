import { RequestHandler } from "express";
import { forgetDto } from "../../../util/dtos/auth";
import bcrypt from 'bcrypt'
import usersSchema from "../../../models/app/userSchema";
import Jwt from "jsonwebtoken";

const resetPassword : RequestHandler =async (req, res) =>{
    const validation = forgetDto.validate(req.body);
    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const userToken = req.headers.authorization?.split(" ")[1]
    const decodedClaims : any = Jwt.verify(userToken!,process.env.SECRET_KEY!)
    const user = await usersSchema.findById(decodedClaims.id)
    const {newPassword, confirmPassword} =  req.body;

    try {
        if(!user){
            return res.status(404).json({message: "User Not Found"})
        }
        const password = `${newPassword}`

        if(newPassword !== confirmPassword){
            return res.status(403).json({message: "Password not Match"})
        }

        const hashPassword = await bcrypt.hash(password,8)

        const updatePassword = await usersSchema.findOneAndUpdate(user._id,{
            $set:{
                password: hashPassword
            }
        },{new: true})

        console.log(updatePassword)

        
        return res.status(200).json({
            message: "Password Reset Successfully"
        })
        
    } catch (error) {
        
    }
}
export default resetPassword;