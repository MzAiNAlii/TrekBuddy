import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import vendorsSchema from "../../../models/app/vendorSchema";
import bookingRoomSchemas from "../../../models/app/bookingRoom";
import hotelSchemas from "../../../models/app/hotels";
import usersSchema from "../../../models/app/userSchema";

const sendRequestRoomBookingController: RequestHandler = async (req, res) => {
  const { userId, vendorId, hotelId } = req.params;
  const { bookingRoomDays, bookingStartDate, bookingEndDate } = req.body;
  try {
    const userInfo = await usersSchema.findById({ _id: userId });
    const vendorInfo = await vendorsSchema.findById({ _id: vendorId });
    const hotelRoomDetails: any = await hotelSchemas.findById({ _id: hotelId });
    const hotelName = hotelRoomDetails.hotels.map(
      (hotel_name: any) => hotel_name.name
    );

    const rooms = hotelRoomDetails.hotels[0].rooms;

    const roomArray: any = [];

    rooms.forEach((room: any) => {
      roomArray.push({
        roomNumber: room.roomNumber,
        membersCapacity: room.membersCapacity,
        No_of_beds: room.No_of_beds,
        price: room.price * bookingRoomDays,
      });
    });

    const roomNumber = roomArray.map((room_no: any) => room_no.roomNumber);
    const membersCapacity = roomArray.map(
      (members_capacity: any) => members_capacity.roomNumber
    );
    const No_of_beds = roomArray.map((No_of_bed: any) => No_of_bed.No_of_beds);
    const price = roomArray.map((room_price: any) => room_price.price);

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
    // Send email
    await transporter.sendMail({
      from: userInfo!.email,
      to: userInfo!.email,
      subject: "Request for Room Booking Approval",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room Booking Inquiry</title>
</head>
<body>

    <p>
        <strong>I hope this email finds you well.</strong> My name is ${
          userInfo!.userName
        }</strong>, and I am writing to inquire about the availability of rooms at your <strong>${hotelName}</strong> for the dates <strong>${bookingStartDate}</strong> to <strong>${bookingEndDate}</strong>.
    </p>

    <h2>Booking Details:</h2>

    <ul>
        <li><strong>Room Number:</strong> ${roomNumber}</li>
        <li><strong>Members Capacity:</strong> ${membersCapacity}</li>
        <li><strong>Number of Beds:</strong> ${No_of_beds}</li>
        <li><strong>Room Price Per Day:</strong> ${rooms[0].price}</li>
        <li><strong>Total Price:</strong> ${price}</li>
        <li><strong>Total Day For Booking Room:</strong> ${bookingRoomDays}</li>
    </ul>

    <p>
        Please let me know if the requested dates are available and provide any additional information regarding the booking process. I am eager to confirm my reservation and appreciate
`,
    });

    const addDetails = await bookingRoomSchemas.create({
      userId,
      userInfo: [
        {
          userName: userInfo?.userName,
          email: userInfo?.email,
          contactNumber: userInfo?.contactNumber,
        },
      ],
      vendorId,
      hotelId,
      rooms: roomArray,
      bookingRoomDays,
      bookingStartDate,
      bookingEndDate,
    });

    res.set("Content-Type", "application/json");

    return res.status(200).json({
      message: "Send Request For Room Booking Successfully",
      data: addDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default sendRequestRoomBookingController;
