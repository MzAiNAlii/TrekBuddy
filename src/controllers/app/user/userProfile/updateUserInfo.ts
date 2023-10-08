import { RequestHandler } from "express";
import usersSchema from "../../../../models/app/userSchema";
import { UpdateInfoDto } from "../../../../util/dtos/auth";

const updateUserInfoController : RequestHandler = async(req, res)=>{
    const validation = UpdateInfoDto.validate(req.body)

    try {
        if(validation.error){
            return res.status(403).json({
                message: "Validation Error",
                errors: validation.error.details
            });
        }

        const {id} = req.params
        const data = {
            userName: req.body.userName,
            DateOfBirth: req.body.DateOfBirth,
            contactNumber: req.body.contactNumber
        }
        const updateUserInfo = await usersSchema.findByIdAndUpdate({_id: id},{
            $set: data
        },{new: true});
        return res.status(200).json({
            message: "Profile Infomation",
            data: updateUserInfo
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"}) 
    }

};
export default updateUserInfoController;