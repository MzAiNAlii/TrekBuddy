import { RequestHandler } from "express";
import adminSchemas from "../../../models/admin/admin";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

const setPasswordController: RequestHandler =  async(req, res)=>{
    const { email, password, confirmPassword, token } = req.body;

    try {
        Jwt.verify(token, process.env.SECRET_KEY!);

        const existingTeamMember = await adminSchemas.findOne({email})
        if(!existingTeamMember){
            return res.status(404).json({
                message: "This Email Is Not Found Against Team Member",
                status: false
            })
        }

        if(password !== confirmPassword){
            return res.status(403).json({
                message: "Password Not Match",
                status: false
            })
        }

        const hashPassword =  await bcrypt.hash(password,8);
        
        await adminSchemas.findOneAndUpdate(existingTeamMember!._id,{
            $set:{
                password: hashPassword,
                signupDate: new Date()
            }

        },{new: true})

        return res.status(200).json({
            message: "Password Set Successfully"
        })
        
    } catch (error) {
        return res.status(498).json({
            message: "Link has been Expired",
            status: false
        })
        
    }
}

export default setPasswordController;