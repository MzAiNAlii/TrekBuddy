import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import adminSchemas from "../../../models/admin/admin";
import Jwt from "jsonwebtoken";

const inviteTeamMemberController: RequestHandler = async (req, res) => {
  const { name, email, userType } = req.body;

  try {
    const user_type = userType
      .split(" ")
      .map(
        (u_type: any) =>
          u_type.charAt(0).toUpperCase() + u_type.slice(1).toLowerCase()
      )
      .join(" ");

    var checkUserType =
      user_type === "Admin" ? `an ${user_type}` : `a ${user_type}`;

    const existingTeamMember = await adminSchemas.findOne({ email });
    if (existingTeamMember) {
      return res.status(498).json({
        message: "This Email Is Already Exist For Admin Team Member",
        status: false,
      });
    }
    const token = Jwt.sign(
      {
        email: email,
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: "1d",
      }
    );

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST_SERVICE!,
      port: 587,
      auth: {
        user: process.env.EMAIL_HOST_USER!,
        pass: process.env.EMAIL_HOST_PASSWORD!,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const sendOTPEmail = await transporter.sendMail({
      from: process.env.EMAIL_HOST_USER!,
      to: email,
      subject: `This invitation is for you to become ${checkUserType}`,
      html: ` 
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Team Member Invitation</title>
              </head>
              <body
                style="
                  font-family: Arial, sans-serif;
                  background-color: #f0f0f0;
                  margin: 0;
                  padding: 0;
                "
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  bgcolor="#f0f0f0"
                >
                  <tr>
                    <td align="center">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                        style="
                          background-color: #ffffff;
                          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                          border-radius: 8px;
                          margin: 20px auto;
                          padding: 20px;
                        "
                      >
                        <tr>
                          <td align="center">
                            <h1 style="color: #454546">Join Our Team</h1>
                          </td>
                        </tr>
                        <tr>
                          <td>  
                            <p style="color: #333; font-size: 16px; line-height: 1.5">
                              We are excited to invite you to join our team as a
                              <strong>${user_type}</strong>. Your contribution will
                              be highly valuable to us.
                            </p>
                            <p style="color: #333; font-size: 16px; line-height: 1.5">
                              Here are your team member details:
                            </p>
                            <ul>
                              <li><strong>Name:</strong> ${name}</li>
                              <li><strong>Email:</strong> ${email}</li>
                              <li><strong>Role:</strong> ${user_type}</li>
                            </ul>
                            <p style="color: #333; font-size: 16px; line-height: 1.5">
                              To complete your registration, please click the button below
                              to set your password and start your journey with us:
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <a
                              href="http://localhost:4000/setPassword?email=${email}&token=${token}"
                              style="
                                display: inline-block;
                                padding: 12px 24px;
                                background-color: #8f4bf6;
                                color: #fff;
                                text-decoration: none;
                                border-radius: 4px;
                                text-align: center;
                                font-weight: bold;
                                border-radius: 24px;
                                transition: background-color 0.3s ease-in-out;
                              "
                              >Set Password</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p style="color: #333; font-size: 16px; line-height: 1.5">
                              If you have any questions or need assistance during the
                              registration process, please do not hesitate to reach out to
                              our support team.
                            </p>
                            <p style="color: #333; font-size: 16px; line-height: 1.5">
                              Thank you for choosing to be a part of our team!
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <div style="margin-top: 20px; color: #666">
                              Best regards,<br />Trek Buddy
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `,
    });

    const addTeamMember = await adminSchemas.create({
      name,
      email,
      userType: user_type,
      signupDate: "",
    });

    return res.status(200).json({
      message: "Invitation Send Successfully",
      data: addTeamMember,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default inviteTeamMemberController;
