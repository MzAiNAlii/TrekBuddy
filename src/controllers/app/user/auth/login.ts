import { RequestHandler } from "express";
import { LoginDto } from "../../../../util/dtos/auth";
import Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import usersSchema from "../../../../models/app/userSchema";

const vendorLoginController : RequestHandler = async(req, res) =>{
    const validation = LoginDto.validate(req.body);

    try {
        if(validation.error){
            return res.status(403).json({
                message: "Validation Error",
                errors: validation.error.details
            })
        }
        const {email, password} = req.body;
        const  existingUser = await usersSchema.findOne({email})

        if(!existingUser){
            return res.status(404).json({
                message: "User Not Exist",
                status: false
            })
        }
        
        if(existingUser!.role !== 'user'){
          return res.status(400).json({
            message: "Not found"
        }
          )}
          
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
          expiresIn: '10d',
          subject: existingUser._id.toString()
        })
        
        return res.json({
            message: "Login Successfully",
            data:{
                user: existingUser,
                token: token
            }
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }  
};
export default vendorLoginController;