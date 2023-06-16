import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import { forgetDto } from "../../../util/dtos/auth";
import vendorsSchema from "../../../models/app/vendorSchema";

const vendorForgotPassword : RequestHandler =async(req,res)=>{
    const validation = forgetDto.validate(req.body);

    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const {email, newPassword, confirmPassword} =  req.body;

    try {
        const vendorData =  await vendorsSchema.findOne({email})
        //console.log("vendorData", vendorData)

        if(!vendorData){
            return res.status(404).json({message: "User Not Found"})
        }
        const password = `${newPassword}`

        //console.log("passwod is",password)

        if(newPassword != confirmPassword){
            return res.status(403).json({message: "Password not Match"})
        }

        const hashPassword = await bcrypt.hash(password,8)

        const updatePassword = await vendorsSchema.findOneAndUpdate(vendorData._id,{
            $set:{
                password: hashPassword
            }
        },{new: true})

        //console.log("updatepassword",updatePassword)

        return res.json({
            message: "Password Reset Successfully"
        })
    
    } catch (error) {
        res.status(400).json({error})
        
    }
}

export default vendorForgotPassword;