import { RequestHandler } from "express";
import usersSchema from "../../../models/app/userSchema";
import bcrypt from 'bcrypt';
import { userSignupDto } from "../../../util/dtos/auth";

const userSignupController : RequestHandler = async(req, res) =>{
    const validation = userSignupDto.validate(req.body)

    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const {firstName, lastName, email, password, DateOfBirth, Gender, phoneNumber} = req.body
    const existingUser = await usersSchema.findOne({email})
    //console.log("mail",email)
    
    if(existingUser){
        return res.status(409).json({
            message: "User Already Exists",
            status: false
        })
    }
    
    const userName = `${firstName} ${lastName}`
    const contactNumber = `${phoneNumber}`
    const hashPassword = await bcrypt.hash(password,8)
    const newUser = await usersSchema.create({
        userName,
        email,
        password: hashPassword,
        DateOfBirth,
        Gender,
        contactNumber,
        role:'user'
    })
    return res.status(200).json({
        message: "Signup Successfully",
        data: {user: newUser}
    })

}
export default userSignupController;