import { RequestHandler } from "express";
import { VerifyOtpDto } from "../../../../util/dtos/auth";
import otpSchema from "../../../../models/app/otpSchema";

const verifyOtpController: RequestHandler = async (req, res) => {
  const validation = VerifyOtpDto.validate(req.body);

  try {
    if (validation.error) {
      return res.status(400).json({
        message: "Validation Failed",
        erros: validation.error.details,
      });
    }
    const { otp, userId } = req.body;
    const verifyOtp = await otpSchema.findById({ _id: userId });
    let currentTime = new Date();
    let expirationTime = currentTime.toTimeString().slice(0, 8);

    if (verifyOtp!.otp! != otp) {
      return res.status(498).json({ message: "Invalid Otp" });
    }

    if (verifyOtp!.expire! <= expirationTime) {
      return res.status(498).json({ message: "OTP is Expired" });
    }

    await otpSchema.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          isVerify: true,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Verification Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default verifyOtpController;
