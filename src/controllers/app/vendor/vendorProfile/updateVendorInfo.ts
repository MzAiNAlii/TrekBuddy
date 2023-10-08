import { RequestHandler } from "express";
import { UpdateInfoDto } from "../../../../util/dtos/auth";
import vendorsSchema from "../../../../models/app/vendorSchema";

const updateVendorInfoController : RequestHandler = async(req, res)=>{
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
            contactNumber: req.body.contactNumber,
            companyName: req.body.companyName
        }
        const updateVendorInfo = await vendorsSchema.findByIdAndUpdate({_id: id},{
            $set: data
        },{new: true});
        return res.status(200).json({
            message: "Profile Infomation",
            data: updateVendorInfo
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"}) 
    }

};
export default updateVendorInfoController;