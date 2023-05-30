import { RequestHandler } from "express";
import { forgetDto } from "../../../util/dtos/auth";
import authenticationSchema from "../../../models/otp";

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
   
    try {
       
        if(user!.otp! != enterUserOtp){
            return res.status(404).json({message: "Invalid Otp"})
        }

        const updateAthenticationSchema = await authenticationSchema.findOneAndDelete(user!._id)

        return res.status(200).json("Successfull");
        
    } catch (error) {
        res.status(500).json(error)
        
    }

}

export default userAuthentication;