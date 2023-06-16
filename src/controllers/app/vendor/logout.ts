import { RequestHandler } from 'express';
import Jwt from 'jsonwebtoken';
import vendorsSchema from '../../../models/app/vendorSchema';
import token from '../../../models/app/vendorSchema';


const vendorLogoutController : RequestHandler = async(req, res)=>{
    const vendorToken = req.headers.authorization?.split(" ")[1]
    const decodedClaims : any = Jwt.verify(vendorToken!,process.env.SECRET_KEY!)
    const vendor = await vendorsSchema.findById(decodedClaims.id)
   
    try {   
    if(!vendor){
        return res.status(404).json({
            message : "Vendor not found"
        })
    }
    if (vendor.token! != vendorToken) {
        return res.status(498).json({
            message: "Invalid Token"
        });
    }

    let now = new Date()
    now.setMinutes(now.getMinutes()+0)
    now = new Date(now)
   
    res.cookie("token",token,{
        httpOnly : true,
        expires : now
    })
      
    return  res.status(200).json({
        message : "Logout Successfully"
    })

    } catch (error) {
        return res.status(500).json(error)
        
    }
}
export default vendorLogoutController;

