import { RequestHandler } from "express";
import { loginDto } from "../../../util/dtos/auth";
import Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import usersSchema from "../../../models/userSchema";


const vendorLoginController : RequestHandler = async(req, res) =>{
    const validation = loginDto.validate(req.body)

    if(validation.error){
        return res.status(403).json({
            message: "Validation Error",
            errors: validation.error.details
        })
    }
    const {userName, email, password} = req.body
    const  existingUser = await usersSchema.findOne({
      $or:[{userName},{email}]
    })
    
    if(existingUser!.role !== 'user'){
      return res.status(400).json({
        message: "Not found"
    }
      )}
      
        
    if(!existingUser){
        return res.status(403).json({
            message: "Invalid Credentials"

        })
    }
    const matchedPassword = await bcrypt.compare(password,existingUser.password!)

    if(!matchedPassword){
        return res.status(403).json({
            message: "Invalid Credentials" 
       })
    }

    const token = Jwt.sign({
      id: existingUser._id,
      userName: existingUser.userName,
      email: existingUser.email
    },process.env.SECRET_KEY!,{
      //expiresIn: '1h',
      issuer: `http://localhost:${process.env.PORT!}`,
      subject: existingUser._id.toString()
    })

    //console.log("token is ", token)

    const updateToken = await usersSchema.findOneAndUpdate(existingUser._id,{
        $set:{
            token
        }
    },{new : true})
    
    return res.json({
        message: "Login Successfully",
        data:{
            user: existingUser,
            token: token
        }
    })

}
export default vendorLoginController;