import { Router } from "express";
import updateUserInfoController from "../../../controllers/app/user/userProfile/updateUserInfo";
import getUserInfoController from "../../../controllers/app/user/userProfile/getUserInfo";

const userProfileRouter = Router();

userProfileRouter.get("/profile/:id", getUserInfoController);
userProfileRouter.put("/update-info/:id", updateUserInfoController);

export default userProfileRouter;