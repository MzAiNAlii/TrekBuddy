import { Router } from "express";
import userSignuoController from "../../../controllers/app/user/signup";
import userLoginController from "../../../controllers/app/user/login";
import emailForgotPasswordController from "../../../controllers/app/user/emailforgotPassword"
import emailVerificationController from "../../../controllers/app/user/emailVerification";
import otpResendController from "../../../controllers/app/user/otpResend";
import resetPasswordController from "../../../controllers/app/user/resetPassword";



const userRouter = Router();

userRouter.post("/usersignup",userSignuoController);
userRouter.post("/userlogin", userLoginController);
userRouter.post("/forgotPassword", emailForgotPasswordController);
userRouter.post("/otpVerification", emailVerificationController);
userRouter.post("/otpResend",  otpResendController)
userRouter.post("/resetPassword", resetPasswordController);

export default userRouter;