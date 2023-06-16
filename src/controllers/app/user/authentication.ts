import { RequestHandler } from "express";
import { forgetDto } from "../../../util/dtos/auth";
import authenticationSchema from "../../../models/authenticationSchema";

const userAuthentication : RequestHandler = async(req, res)=> {
    const validation = forgetDto.validate(req.body);

    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const {enterUserOtp} =  req.body;
    const user   = await authenticationSchema.findOne()
    let currentTime = new Date();
    let expirationTime = currentTime.toTimeString().slice(0, 8)
    //console.log("current",expirationTime)
   
    try {
        if(user!.otp! != enterUserOtp){
            return res.status(498).json({message: "Invalid Otp"})
        } 
        if(user!.expire! <= expirationTime){
            const updateAthenticationSchema = await authenticationSchema.findOneAndDelete(user!._id)
             return res.status(498).json({message: "OTP is Expired"})
        }

        const updateAthenticationSchema = await authenticationSchema.findOneAndDelete(user!._id)

        return res.status(200).json({message:"Successfull"});
        
    } catch (error) {
        res.status(500).json(error)
        
    }

}
export default userAuthentication;