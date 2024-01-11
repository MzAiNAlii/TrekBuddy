import { RequestHandler } from "express";
import { SendOtpDto } from "../../../../util/dtos/auth";
import usersSchema from "../../../../models/app/userSchema";
import nodemailer from 'nodemailer';
import otpSchema from "../../../../models/otpSchema";
import { otpRouter } from "../../../../util/otp/otp";

const sendOtpController : RequestHandler =async(req, res)=> {
  const validation = SendOtpDto.validate(req.body);

  try {
    if(validation.error){
      return res.status(400).json({
        message: "Validation Failed",
        erros: validation.error.details
      })
    }
  const {email} =  req.body;
  const existingUser =  await usersSchema.findOne({email})

  if(!existingUser){
    return res.status(404).json({message: "User Not Found"})
  }
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
  });
  // Send OTP email
  const sendOTPEmail = await transporter.sendMail({
    from: process.env.EMAIL_HOST_USER!,
    to: email,
    subject: "here's Your PIN",
    text: `Enter this code to complete the reset: ${isOtp.userotp}`
  })
  
  const newUserData = await otpSchema.create({
    email: email,
    otp: isOtp.userotp,
    expire: isOtp.expirationTime
  })

  res.set('Content-Type', 'application/json');
            
  return res.status(200).json({
    message: "Successsfully",
    userId: newUserData._id,
    userEmail: email
  
  });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error"});
    
  }
};
export default sendOtpController;