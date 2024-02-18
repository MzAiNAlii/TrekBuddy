import { RequestHandler } from "express";
import adminSchemas from "../../../models/admin/admin";

const deleteInviteTeamMemberAccountController: RequestHandler = async (
  req,
  res
) => {
  const { id } = req.params;

  try {
    await adminSchemas.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      message: "Team Members Delete Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default deleteInviteTeamMemberAccountController;
