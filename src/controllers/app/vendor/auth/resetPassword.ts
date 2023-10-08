import { RequestHandler } from "express";
import { ResetPasswordDto } from "../../../../util/dtos/auth";
import bcrypt from 'bcrypt';
import otpSchema from "../../../../models/otpSchema";
import vendorsSchema from "../../../../models/app/vendorSchema";

const resetPasswordController : RequestHandler =async (req, res) =>{
    const validation = ResetPasswordDto.validate(req.body);

    try {
        if(validation.error){
            return res.status(400).json({
                message: "Validation Failed",
                erros: validation.error.details
            })
        }
        const {newPassword, confirmPassword, userId} =  req.body;
        const user = await otpSchema.findById({_id: userId});

        const existingVendor = await vendorsSchema.findOne({email: user!.email})
        
        if(user!.email != existingVendor!.email){
            return res.status(404).json({message: "User Not Found"})
        }

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
        
        return res.status(200).json({
            message: "Password Reset Successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});        
    }
};
export default resetPasswordController;