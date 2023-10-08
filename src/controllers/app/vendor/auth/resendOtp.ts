import { RequestHandler } from "express";
import nodemailer from 'nodemailer';
import otpSchema from "../../../../models/otpSchema";
import { otpRouter } from "../../../../util/otp/otp";

const resendOtpController : RequestHandler = async (req, res)=> {
  const {userId} = req.body;
    try {

      const existingVendorOtp = await otpSchema.findById({_id: userId});
      const isOtp = otpRouter();

      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_HOST_SERVICE!,
        auth: {
        user: process.env.EMAIL_HOST_USER!,
        pass: process.env.EMAIL_HOST_PASSWORD!
        },
        tls: {
          rejectUnauthorized: false
        }
      })

      // Send OTP email
    const sendOTPEmail = await transporter.sendMail({
      from: process.env.EMAIL_HOST_USER!,
      to: existingVendorOtp!.email!,
      subject: 'For Email Verification',
      text: `Your OTP is: ${isOtp.userotp}`
      })
    
    const updateOtp = await otpSchema.findOneAndUpdate(existingVendorOtp!._id,{
          $set:{
            otp: isOtp.userotp,
            expire: isOtp.expirationTime

          }
       })
    const updatedData = await otpSchema.findOne(existingVendorOtp!._id);

    return res.json({
      message : "Success",
      data: {
        userId: updatedData!._id,
        userEmail: existingVendorOtp!.email
      }
    })
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Internal Server Error"});    
    }
};
export default resendOtpController;