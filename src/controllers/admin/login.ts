import { RequestHandler } from "express";
import { loginDto } from "../../util/dtos/auth";
import usersSchema from "../../models/app/userSchema";
//import Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';

const adminLoginController : RequestHandler = async(req, res) =>{
    const validation = loginDto.validate(req.body)

    if(validation.error){
        return res.status(403).json({
            message: "Validation Error",
            errors: validation.error.details
        })
    }
    const {userName, email, password} = req.body
    const  existingAdmin = await usersSchema.findOne({
      $or:[{userName},{email}]
    })
    
    if(existingAdmin!.role !== 'admin'){
      return res.status(400).json({
        message: "Not found"
    }
      )}

    if(!existingAdmin){
        return res.status(403).json({
            message: "email Invalid Credentials"

        })
    }
    const matchedPassword = await bcrypt.compare(password,existingAdmin.password!)

    if(!matchedPassword){
        return res.status(403).json({
            message: "password Invalid Credentials" 
       })
    }

    // const token = Jwt.sign({
    //   userName: existingAdmin.userName,
    //   email: existingAdmin.email
    // },process.env.SECRET_KEY!,{
    //   //expiresIn: '1m',
    //   issuer: `http://localhost:${process.env.PORT!}`,
    //   subject: existingAdmin._id.toString()
    // })

    // console.log("token is ", token)
    
    return res.json({
        message: "Login Successfully",
        data:{
            admin: existingAdmin
        }
    })
  }
export default adminLoginController;