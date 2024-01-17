import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import bookingRoomSchemas from "../../../../models/app/bookingRoom";
import usersSchema from "../../../../models/app/userSchema";
import hotelSchemas from "../../../../models/app/hotelsRoom";
import vendorsSchema from "../../../../models/app/vendorSchema";

const rejectBookingRequestController: RequestHandler = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const checkPendingRequests = await bookingRoomSchemas.findById({
      _id: bookingId,
    });

    const userInfo = await usersSchema.findById({
      _id: checkPendingRequests?.userId,
    });
    const vendorInfo = await vendorsSchema.findById({
      _id: checkPendingRequests?.vendorId,
    });
    const hotelRoomDetails: any = await hotelSchemas.findById({
      _id: checkPendingRequests?.roomId,
    });

    hotelRoomDetails.hotels.forEach((hotel: any) => {
      hotel.rooms.forEach((room: any) => {
        room.availability = true;
      });
    });

    await hotelRoomDetails.save();

    const hotelName = hotelRoomDetails.hotels.map(
      (hotel_name: any) => hotel_name.name
    );
    const rooms: any = hotelRoomDetails.hotels[0].rooms;

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
      subject: "Reject Your Request for Room Booking ",
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
        checkPendingRequests?.bookingStartDate
      }</strong> to <strong>${checkPendingRequests?.bookingEndDate}</strong>.
        </p>

        <h2>Booking Details:</h2>

        <ul>
            <li><strong>Room Number:</strong> ${
              checkPendingRequests?.rooms[0].roomNumber
            }</li>
            <li><strong>Members Capacity:</strong> ${
              checkPendingRequests?.rooms[0].membersCapacity
            }</li>
            <li><strong>Number of Beds:</strong> ${
              checkPendingRequests?.rooms[0].No_of_beds
            }</li>
            </li>
            <li><strong>Room Price Per Day:</strong>
            ${rooms[0].price}
            </li>
            <li><strong>Total Price:</strong> ${
              checkPendingRequests?.rooms[0].price
            }</li>
            <li><strong>Total Day For Booking Room:</strong>
            ${checkPendingRequests?.bookingRoomDays}
            </li>
        </ul>

        <p>
            Please let me know if the requested dates are available and provide any additional information regarding the booking process. I am eager to confirm my reservation and appreciate
    `,
    });
    await bookingRoomSchemas.findByIdAndDelete({ _id: bookingId });
    return res.status(200).json({
      message: "Reject Booking Request Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export default rejectBookingRequestController;
