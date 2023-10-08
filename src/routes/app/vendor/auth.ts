import { Router } from "express";
import vendorSignupController from "../../../controllers/app/vendor/auth/signup";
import vendorLoginController from "../../../controllers/app/vendor/auth/login";
import resetPasswordController from "../../../controllers/app/vendor/auth/resetPassword";
import sendOtpController from "../../../controllers/app/vendor/auth/sendOtp";
import verifyOtpController from "../../../controllers/app/vendor/auth/verifyOtp";
import resendOtpController from "../../../controllers/app/vendor/auth/resendOtp";

const vendorRouter = Router();

vendorRouter.post("/signup", vendorSignupController);
vendorRouter.post("/login", vendorLoginController);
vendorRouter.post("/send-otp", sendOtpController );
vendorRouter.post("/verify-otp", verifyOtpController);
vendorRouter.post("/resend-otp", resendOtpController);
vendorRouter.post("/resetPassword", resetPasswordController);

export default vendorRouter;