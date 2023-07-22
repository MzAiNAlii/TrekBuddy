import { RequestHandler } from "express";
import { forgotDto } from "../../../util/dtos/auth";
import bcrypt from 'bcrypt'
import otpSchema from "../../../models/otpSchema";
import vendorsSchema from "../../../models/app/vendorSchema";

const resetPasswordController : RequestHandler =async (req, res) =>{
    const validation = forgotDto.validate(req.body);
    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const {newPassword, confirmPassword, _id} =  req.body;
    //console.log(_id)

    try {
        const user = await otpSchema.findById({_id});
        //console.log(user!._id, user!.email)

        const existingVendor = await vendorsSchema.findOne({email: user!.email})

        //console.log(existingVendor!.email);
        
        if(user!.email != existingVendor!.email){
            return res.status(403).json({message: "Access Denied"})
        }

        // if(!user){
        //     return res.status(404).json({message: "User Not Found"})
        // }
        const password = `${newPassword}`

        if(newPassword !== confirmPassword){
            return res.status(403).json({message: "Password not Match"})
        }

        const hashPassword = await bcrypt.hash(password,8)

        const updatePassword = await vendorsSchema.findOneAndUpdate(existingVendor!._id,{
            $set:{
                password: hashPassword
            }
        },{new: true})

        //console.log(updatePassword)

        
        return res.status(200).json({
            message: "Password Reset Successfully"
        })
        
    } catch (error) {
        return res.status(404).json({message: "User Not Found"})
        
    }
}
export default resetPasswordController;