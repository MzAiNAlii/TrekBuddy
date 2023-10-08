import { RequestHandler } from "express";
import { LoginDto } from "../../../../util/dtos/auth";
import Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import vendorsSchema from "../../../../models/app/vendorSchema";

const vendorLoginController : RequestHandler = async(req, res) =>{
    const validation = LoginDto.validate(req.body);

    try {
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
          expiresIn: '10d',
          subject: existingVendor._id.toString()
        })
    
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
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};
export default vendorLoginController;