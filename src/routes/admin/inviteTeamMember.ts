import { Router } from "express";
import setPasswordController from "../../controllers/admin/auth/setPassword";
import deleteInviteTeamMemberAccountController from "../../controllers/admin/inviteTeamMember/deleteInviteTeamMember";
import inviteTeamMemberController from "../../controllers/admin/inviteTeamMember/inviteTeamMember";
import listOfTeamMember from "../../controllers/admin/inviteTeamMember/listOfTeamMember";
import updateInviteTeamMemberController from "../../controllers/admin/inviteTeamMember/updateInviteTeamMember";

const inviteTeamMemberRouter = Router();

inviteTeamMemberRouter.post("/setPassword", setPasswordController);
inviteTeamMemberRouter.post("/send-invitation", inviteTeamMemberController);
inviteTeamMemberRouter.get("/all-teamMember", listOfTeamMember);
inviteTeamMemberRouter.delete(
  "/delete-teamMember/:id",
  deleteInviteTeamMemberAccountController
);
inviteTeamMemberRouter.put(
  "/update-teamMemberInfo/:id",
  updateInviteTeamMemberController
);

export default inviteTeamMemberRouter;
