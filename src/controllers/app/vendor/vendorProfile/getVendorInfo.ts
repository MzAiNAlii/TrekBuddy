import { RequestHandler } from "express";
import vendorsSchema from "../../../../models/app/vendorSchema";

const getVendorInfoController : RequestHandler = async(req, res)=>{
    const {id} = req.params
    try {
        const getVendorInfo: any = await vendorsSchema.findById({_id: id});
        return res.status(200).json({
            message: "Profile Infomation",
            data:{
                name: getVendorInfo.userName,
                email: getVendorInfo.email,
                DateOfBirth: getVendorInfo.DateOfBirth,
                phoneNumber: getVendorInfo.contactNumber,
                hotelName: getVendorInfo.companyName
            }
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"}) 
    }

};
export default getVendorInfoController;