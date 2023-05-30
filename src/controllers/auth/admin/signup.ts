import { RequestHandler } from "express";
import { signupDto } from "../../../util/dtos/auth";
import usersSchema from "../../../models/userSchema";
import bcrypt from 'bcrypt';

const adminSignupController : RequestHandler = async(req, res) =>{
    const validation = signupDto.validate(req.body)

    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const {firstName, lastName, email, password} = req.body
    const existingAdmin = await usersSchema.findOne({email})
    
    if(existingAdmin){
        return res.status(409).json({
            message: "Admin Already Exists",
            status: false
        })
    }
    const userName = `${firstName} ${lastName}`
    const hashPassword = await bcrypt.hash(password,8)
    const newAdmin = await usersSchema.create({
        userName,
        email,
        password: hashPassword,
        role: "admin"
    })

    return res.json({
        message: "Signup Successfully",
        data: {user: newAdmin}
    })

}
export default adminSignupController;