import { RequestHandler } from "express";
import usersSchema from "../../../../models/app/userSchema";
import bcrypt from 'bcrypt';
import { UserSignupDto } from "../../../../util/dtos/auth";

const userSignupController : RequestHandler = async(req, res) =>{
    const validation = UserSignupDto.validate(req.body);

    try {
        if(validation.error){
            return res.status(400).json({
                message: "Validation Failed",
                erros: validation.error.details
            })
        }
        const {firstName, lastName, email, password, DateOfBirth, Gender, phoneNumber} = req.body
        const existingUser = await usersSchema.findOne({email})
        
        if(existingUser){
            return res.status(409).json({
                message: "User Already Exists",
                status: false
            })
        }
        
        const userName = `${firstName}${lastName}`
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
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});        
    }

};
export default userSignupController;