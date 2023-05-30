import { RequestHandler } from "express";
import { forgetDto } from "../../../util/dtos/auth";
import usersSchema from "../../../models/userSchema";
import nodemailer from 'nodemailer'
import authenticationSchema from "../../../models/otp";
import { otpRouter } from "../../../util/otp/otp";

const userForgotPassword : RequestHandler =async(req,res)=>{

  const validation = forgetDto.validate(req.body);

  if(validation.error){
      return res.status(400).json({
          message: "Validation Failed",
          erros: validation.error.details
      })
  }
  
  const {email} =  req.body;

  const userData =  await usersSchema.findOne({email})

  if(!userData){
        return res.status(404).json({message: "User Not Found"})
  }
        
  const isOtp = otpRouter();

  console.log("otp is ",isOtp)

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
            user: process.env.EMAIL!,
            pass: process.env.PASSWORD!
    }
  })
     // Send OTP email
  const sendOTPEmail = await transporter.sendMail({
    from: 'zain9876501@outlook.com',
    to: userData!.email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${isOtp}`
  })
  //console.log("Send use mail: ",sendOTPEmail)

  
  transporter.sendMail(sendOTPEmail, (error, info) => {
    if (error) {
      console.error(error);
      } else {
      console.log('OTP email sent: ' + info.response);
      }
    });

  // console.log("message send",sendOTPEmail.messageId),
  // res.json({
  //   message: sendOTPEmail
  // })

  const newUserData = await authenticationSchema.create({
    emails: email,
    otp: isOtp
  })

    //console.log("otp is",newOtp)

  res.set('Content-Type', 'application/json');
            

  return res.json("successsfully");
}

export default userForgotPassword;