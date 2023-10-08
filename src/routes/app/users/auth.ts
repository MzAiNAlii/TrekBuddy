import { Router } from "express";
import userSignuoController from "../../../controllers/app/user/auth/signup";
import userLoginController from "../../../controllers/app/user/auth/login";
import sendOtpController from "../../../controllers/app/user/auth/sendOtp";
import verifyOtpController from "../../../controllers/app/user/auth/verifyOtp";
import resendOtpController from "../../../controllers/app/user/auth/resendOtp";
import resetPasswordController from "../../../controllers/app/user/auth/resetPassword";

const userRouter = Router();

userRouter.post("/signup",userSignuoController);
userRouter.post("/login", userLoginController);
userRouter.post("/send-otp", sendOtpController );
userRouter.post("/verify-otp", verifyOtpController );
userRouter.post("/resend-otp", resendOtpController )
userRouter.post("/resetPassword", resetPasswordController);

export default userRouter;