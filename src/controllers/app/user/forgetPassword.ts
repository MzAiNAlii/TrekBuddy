import { RequestHandler } from "express";
import { forgetDto } from "../../../util/dtos/auth";
import usersSchema from "../../../models/app/userSchema";
import nodemailer from 'nodemailer';
import authenticationSchema from "../../../models/authenticationSchema";
import { otpRouter } from "../../../util/otp/otp";

const userForgotPassword : RequestHandler =async(req, res)=> {

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
    to: userData!.email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${isOtp.userotp}`
  })
  //console.log("Send use mail: ",sendOTPEmail)
  transporter.sendMail(sendOTPEmail, (error, info) => {
    if (error) {
      console.error(error);
      } else {
      console.log('OTP email sent: ' + info.response);
      }
    });

  //console.log("message send",sendOTPEmail.messageId)
  const newUserData = await authenticationSchema.create({
    emails: email,
    otp: isOtp.userotp,
    expire: isOtp.expirationTime
  })

  res.set('Content-Type', 'application/json');
            
  return res.status(200).json({
    message: "Successsfully"
  
  });

}
export default userForgotPassword;