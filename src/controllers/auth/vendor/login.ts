import { RequestHandler } from "express";
import { loginDto } from "../../../util/dtos/auth";
import Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import vendorsSchema from "../../../models/vendorSchema";

const vendorLoginController : RequestHandler = async(req, res) =>{
    const validation = loginDto.validate(req.body)

    if(validation.error){
        return res.status(403).json({
            message: "Validation Error",
            errors: validation.error.details
        })
    }
    const {userName, email, password} = req.body
    const  existingVendor = await vendorsSchema.findOne({
      $or:[{userName},{email}]
    })
    
    if(existingVendor!.role !== 'vendor'){
      return res.status(400).json({
        message: "Not found"
    }
      )}
      
        
    if(!existingVendor){
        return res.status(403).json({
            message: "Invalid Credentials"

        })
    }
    const matchedPassword = await bcrypt.compare(password,existingVendor.password!)

    if(!matchedPassword){
        return res.status(403).json({
            message: "Invalid Credentials" 
       })
    }

    const token = Jwt.sign({
      id: existingVendor._id,
      userName: existingVendor.userName,
      email: existingVendor.email
    },process.env.SECRET_KEY!,{
      //expiresIn: '1m',
      issuer: `http://localhost:${process.env.PORT!}`,
      subject: existingVendor._id.toString()
    })

    //console.log("token is ", token)

    const updateToken = await vendorsSchema.findOneAndUpdate(existingVendor._id,{
        $set:{
            token
        }
    },{new : true})
    
    return res.json({
        message: "Login Successfully",
        data:{
            user: existingVendor,
            token: token
        }
    })

}
export default vendorLoginController;