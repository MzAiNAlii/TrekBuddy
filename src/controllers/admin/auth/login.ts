import { RequestHandler } from "express";
import { LoginDto } from "../../../util/dtos/auth";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import adminSchemas from "../../../models/admin/admin";

const adminLoginController: RequestHandler = async (req, res) => {
  const validation = LoginDto.validate(req.body);

  try {
    if (validation.error) {
      return res.status(403).json({
        message: "Validation Error",
        errors: validation.error.details,
      });
    }
    const { email, password } = req.body;

    const existingAdmin = await adminSchemas.findOne({
      email,
      userType: { $in: ["Super Admin", "Admin"] },
    });
    if (!existingAdmin) {
      return res.status(404).json({
        message: "User Not Found",
        status: false,
      });
    }

    if (!existingAdmin!.userType) {
      return res.status(401).json({
        message: "You Are Unauthorized For This Request",
        status: false,
      });
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingAdmin!.password!
    );
    if (!matchedPassword) {
      return res.status(403).json({
        message: "Invalid Credentials",
        status: false,
      });
    }

    const accessToken = Jwt.sign(
      {
        id: existingAdmin!._id,
        email: existingAdmin!.email,
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: "15d",
        subject: existingAdmin!._id.toString(),
      }
    );

    return res.status(200).json({
      message: "Login Successfully",
      data: existingAdmin,
      token: accessToken,
    });
  } catch (error) {}
};
export default adminLoginController;
