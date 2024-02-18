import { RequestHandler } from "express";
import adminSchemas from "../../../models/admin/admin";

const updateInviteTeamMemberController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const data = {
      name: req.body.name,
      userType: req.body.userType,
    };

    const user_type = data.userType
      .split(" ")
      .map(
        (u_type: any) =>
          u_type.charAt(0).toUpperCase() + u_type.slice(1).toLowerCase()
      )
      .join(" ");

    const existingTeamMemberId = await adminSchemas.findById({
      _id: id,
    });
    await adminSchemas.findByIdAndUpdate(
      existingTeamMemberId!._id,
      {
        $set: {
          name: data.name,
          userType: user_type,
        },
      },
      { new: true }
    );

    const updatedTeamMember = await adminSchemas.findById({ _id: id });
    return res.status(200).json({
      message: "Pet-Breed Update Successfully",
      data: updatedTeamMember,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default updateInviteTeamMemberController;
