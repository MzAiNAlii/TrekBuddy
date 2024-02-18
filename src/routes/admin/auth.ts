import { Router } from "express";
import adminLoginController from "../../controllers/admin/auth/login";
import sendOtpController from "../../controllers/admin/auth/sendOtp";
import verifyOtpController from "../../controllers/admin/auth/verifyOtp";
import resetPasswordController from "../../controllers/admin/auth/resetPassword";
import resendOtpController from "../../controllers/admin/auth/resendOtp";

const adminRouter = Router();

adminRouter.post("/admin-login", adminLoginController);
adminRouter.post("/send-otp", sendOtpController);
adminRouter.post("/verify-otp", verifyOtpController);
adminRouter.post("/resend-otp", resendOtpController);
adminRouter.post("/resetPassword", resetPasswordController);

export default adminRouter;
