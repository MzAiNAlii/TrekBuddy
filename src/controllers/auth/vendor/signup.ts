import { RequestHandler } from "express";
import { vendorSignupDto } from "../../../util/dtos/auth";
import bcrypt from 'bcrypt';
import vendorsSchema from "../../../models/vendorSchema";

const vendorSignupController : RequestHandler = async(req, res) =>{
    const validation = vendorSignupDto.validate(req.body)

    if(validation.error){
        return res.status(400).json({
            message: "Validation Failed",
            erros: validation.error.details
        })
    }
    const {firstName, lastName, email, password, companyName, DateOfBirth, Gender, phoneNumber} = req.body
    const existingVendor = await vendorsSchema.findOne({email})
    
    if(existingVendor){
        return res.status(409).json({
            message: "User Already Exists",
            status: false
        })
    }
    const userName = `${firstName} ${lastName}`
    const contactNumber = `${phoneNumber}`
    const hashPassword = await bcrypt.hash(password,8)
    const newVendor = await vendorsSchema.create({
        userName,
        email,
        password: hashPassword,
        companyName,
        contactNumber,
        DateOfBirth,
        Gender,
        role:'vendor'
    })

    return res.json({
        message: "Signup Successfully",
        data: {user: newVendor}
    })

}
export default vendorSignupController;