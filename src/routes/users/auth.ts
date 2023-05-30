import { Router } from "express";
import userSignuoController from "../../controllers/auth/user/signup";
import userLoginController from "../../controllers/auth/user/login";
import userLogoutController from "../../controllers/auth/user/logout";
import userForgotPassword from "../../controllers/auth/user/forgetPassword";
import resetPassword from "../../controllers/auth/user/resetPassword";
import userAuthentication from "../../controllers/auth/user/authentication";

const userrouter = Router();

userrouter.post("/usersignup",userSignuoController);
userrouter.post("/userlogin",userLoginController);
userrouter.get("/userlogout",userLogoutController);
userrouter.post("/forgotpassword",userForgotPassword);
userrouter.post("/otp",userAuthentication);
userrouter.post("/resetpassword",resetPassword)


//userrouter.post("/otp",otpRouter)

export default userrouter;