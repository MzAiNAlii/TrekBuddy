import { Router } from "express";
import userSignuoController from "../../../controllers/app/user/signup";
import userLoginController from "../../../controllers/app/user/login";
import userLogoutController from "../../../controllers/app/user/logout";
import userForgotPassword from "../../../controllers/app/user/forgetPassword";
import resetPassword from "../../../controllers/app/user/resetPassword";
import userAuthentication from "../../../controllers/app/user/authentication";

const userrouter = Router();

userrouter.post("/usersignup",userSignuoController);
userrouter.post("/userlogin",userLoginController);
userrouter.get("/userlogout",userLogoutController);
userrouter.post("/forgotpassword",userForgotPassword);
userrouter.post("/otp",userAuthentication);
userrouter.post("/resetpassword",resetPassword)


//userrouter.post("/otp",otpRouter)

export default userrouter;