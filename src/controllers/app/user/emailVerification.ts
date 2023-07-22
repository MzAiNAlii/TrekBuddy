import { RequestHandler } from "express";
import { forgotDto } from "../../../util/dtos/auth";
import otpSchema from "../../../models/otpSchema";

const emailVerificationController : RequestHandler = async(req, res)=> {
    const validation = forgotDto.validate(req.body);

    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const {enterOtp, _id} =  req.body;
    const verifyOtp   = await otpSchema.findById({_id})
    let currentTime = new Date();
    let expirationTime = currentTime.toTimeString().slice(0, 8)
    //console.log("current",expirationTime)
   
    try {
        if(verifyOtp!.otp! != enterOtp){
            return res.status(498).json({message: "Invalid Otp"})
        } 

        if(verifyOtp!.expire! <= expirationTime){
            //const updateAthenticationSchema = await otpSchema.findOneAndDelete(verifyOtp!._id)
             return res.status(498).json({message: "OTP is Expired"})
        }

        //const updateAthenticationSchema = await otpSchema.findOneAndDelete(verifyOtp!._id)

        return res.status(200).json({
            message:"Verification Successfull"
        });
        
    } catch (error) {
        res.status(500).json(error)
        
    }

}
export default emailVerificationController;