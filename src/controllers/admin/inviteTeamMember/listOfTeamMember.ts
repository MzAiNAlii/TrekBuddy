import { RequestHandler } from "express";
import adminSchemas from "../../../models/admin/admin";

const listOfTeamMember: RequestHandler = async (req, res) => {
  try {
    const teamMemberList = await adminSchemas.find();

    return res.status(200).json({
      message: "Team Members Are",
      data: teamMemberList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default listOfTeamMember;
