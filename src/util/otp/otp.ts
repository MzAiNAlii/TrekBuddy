
import nodemailer from 'nodemailer'

export const otpRouter = ()=>{
    console.log("user:", process.env.EMAIL!,"pass:", process.env.PASSWORD!)

        
              
              //Generate a random OTP
              const generateOTP = () => {
                const digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                  OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
              };
              const userotp = generateOTP();
              return userotp;
              console.log("otp ",userotp)

              //Send OTP email
  

    //console.log("otp is",newOtp)

}















// import { RequestHandler } from 'express';
// import nodemailer from 'nodemailer'
// import usersSchema from '../../models/userSchema';

// // Create a transporter using your email service provider's SMTP settings
// const sendOtp : RequestHandler =async (req,res)=>{

//     const {email} = req.body;

//     const mail = await usersSchema.findOne({email})
//     console.log("mail",mail!.email)
//     if(!mail!.email){
//         return res.status(404).json("Not Found")
//     }

//     console.log("mail",mail!.email)
    
//     const transporter = nodemailer.createTransport({
//         service: "Outlook",
//         auth: {
//             user: process.env.EMAIL!,
//             pass: process.env.PASSWORD!
//         }
//     });
  
//   //Generate a random OTP
//   const generateOTP = () => {
//     const digits = '0123456789';
//     let OTP = '';
//     for (let i = 0; i < 6; i++) {
//       OTP += digits[Math.floor(Math.random() * 10)];
//     }
//     return OTP;
//   };
//   const otp = generateOTP();

// const userEnteredOtp = '123456'; // Replace with user input

// if (otp === userEnteredOtp) {
//     // Create the account
//     console.log('Account created successfully');
//   } else {
//     // Invalid OTP
//     console.log('Invalid OTP');
//   }

//  // Send OTP email
//   const sendOTPEmail = await transporter.sendMail({
//       from: 'zain1903@outlook.com',
//       to: mail!.email,
//       subject: 'OTP Verification',
//       text: `Your OTP is: ${otp}`
//   })
//   //console.log("Send use mail: ",sendOTPEmail)

  
//   transporter.sendMail(sendOTPEmail, (error, info) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log('OTP email sent: ' + info.response);
//     }
//   });

//   console.log("message send",sendOTPEmail.messageId),
//   res.json({
//     message: sendOTPEmail
//   })
// }

// export default sendOtp;
