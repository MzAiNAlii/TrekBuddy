import { RequestHandler } from "express";
import usersSchema from "../../../../models/app/userSchema";

const getUserInfoController : RequestHandler = async(req, res)=>{
    const {id} = req.params
    try {
        const getUserInfo: any = await usersSchema.findById({_id: id});
        return res.status(200).json({
            message: "Profile Infomation",
            data:{
                name: getUserInfo.userName,
                email: getUserInfo.email,
                DateOfBirth: getUserInfo.DateOfBirth,
                phoneNumber: getUserInfo.contactNumber
            }
        });
        
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"}) 
    }

};
export default getUserInfoController;