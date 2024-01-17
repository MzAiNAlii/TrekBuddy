import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import bookingRoomSchemas from "../../../../models/app/bookingRoom";
import usersSchema from "../../../../models/app/userSchema";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";
import vendorsSchema from "../../../../models/app/vendorSchema";

const acceptBookingController: RequestHandler = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const roomDetails = await bookingRoomSchemas.findById({ _id: bookingId });
    const userInfo = await usersSchema.findById({ _id: roomDetails?.userId });
    const vendorInfo = await vendorsSchema.findById({
      _id: roomDetails?.vendorId,
    });
    const hotelRoomDetails: any = await hotelRoomSchemas.findById({
      _id: roomDetails?.roomId,
    });
    const hotelName = hotelRoomDetails.hotels.map(
      (hotel_name: any) => hotel_name.name
    );
    const rooms = hotelRoomDetails.hotels[0].rooms;
    const updateBookingStatus = await bookingRoomSchemas.findByIdAndUpdate(
      { _id: bookingId },
      {
        $set: {
          roomBookingStatus: true,
        },
      },
      { new: true }
    );

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST_SERVICE!,
      auth: {
        user: process.env.EMAIL_HOST_USER!,
        pass: process.env.EMAIL_HOST_PASSWORD!,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: vendorInfo!.email,
      to: userInfo!.email,
      subject: "Accept Your Request for Room Booking ",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Room Booking Inquiry</title>
    </head>
    <body>

        <p>
            <strong>I hope this email roomDetailss you well.</strong> My name is ${
              vendorInfo!.userName
            }</strong>, and I am writing to inquire about the availability of rooms at your hotel <strong>${hotelName}</strong> for the dates <strong>${
        roomDetails?.bookingStartDate
      }</strong> to <strong>${roomDetails?.bookingEndDate}</strong>.
        </p>

        <h2>Booking Details:</h2>

        <ul>
            <li><strong>Room Number:</strong> ${
              roomDetails?.rooms[0].roomNumber
            }</li>
            <li><strong>Members Capacity:</strong> ${
              roomDetails?.rooms[0].membersCapacity
            }</li>
            <li><strong>Number of Beds:</strong> ${
              roomDetails?.rooms[0].No_of_beds
            }</li>
            </li>
            <li><strong>Room Price Per Day:</strong> 
            ${rooms[0].price}
            </li>
            <li><strong>Total Price:</strong> ${
              roomDetails?.rooms[0].price
            }</li>
            <li><strong>Total Day For Booking Room:</strong> 
            ${roomDetails?.bookingRoomDays}
            </li>
        </ul>

        <p>
            Please let me know if the requested dates are available and provide any additional information regarding the booking process. I am eager to confirm my reservation and appreciate
    `,
    });

    return res.status(200).json({
      meassage: "Accept the request for room booking",
      data: updateBookingStatus,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default acceptBookingController;
