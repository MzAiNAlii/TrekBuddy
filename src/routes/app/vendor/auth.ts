import { Router } from "express";
import vendorSignupController from "../../../controllers/app/vendor/signup";
import vendorLoginController from "../../../controllers/app/vendor/login";
import emailForgotPasswordController from "../../../controllers/app/vendor/emailForgotPassword";
import otpResendController from "../../../controllers/app/vendor/otpResend";
import emailVerificationController from "../../../controllers/app/vendor/emailVerification";
import resetPasswordController from "../../../controllers/app/vendor/resetPassword";

const vendorRouter = Router();

vendorRouter.post("/vendorsignup",vendorSignupController);
vendorRouter.post("/vendorlogin",vendorLoginController);
vendorRouter.post("/forgetpassword",emailForgotPasswordController);
vendorRouter.post("/emailVerification",emailVerificationController);
vendorRouter.post("/otpResend",otpResendController);
vendorRouter.post("/resetPassword",resetPasswordController);

export default vendorRouter;