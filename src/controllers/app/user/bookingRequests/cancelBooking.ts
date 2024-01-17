import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import bookingRoomSchemas from "../../../../models/app/bookingRoom";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";
import usersSchema from "../../../../models/app/userSchema";
import vendorsSchema from "../../../../models/app/vendorSchema";

const cancelBookingController: RequestHandler = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const checkBooking = await bookingRoomSchemas.findById({
      _id: bookingId,
    });

    const userInfo = await usersSchema.findById({
      _id: checkBooking?.userId,
    });
    const vendorInfo = await vendorsSchema.findById({
      _id: checkBooking?.vendorId,
    });
    const hotelRoomDetails: any = await hotelRoomSchemas.findById({
      _id: checkBooking?.roomId,
    });

    const hotelName = hotelRoomDetails.hotels.map(
      (hotel_name: any) => hotel_name.name
    );
    const rooms: any = hotelRoomDetails.hotels[0].rooms;
    if(checkBooking?.roomBookingStatus == true || checkBooking?.roomBookingStatus == false){
    hotelRoomDetails.hotels.forEach((hotel: any) => {
      hotel.rooms.forEach((room: any) => {
        room.availability = true;
      });
    });

    await hotelRoomDetails.save();
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
      from: userInfo!.email,
      to: vendorInfo!.email,
      subject: "Cancel the Book Room",
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
        checkBooking?.bookingStartDate
      }</strong> to <strong>${checkBooking?.bookingEndDate}</strong>.
        </p>

        <h2>Booking Details:</h2>

        <ul>
            <li><strong>Room Number:</strong> ${
              checkBooking?.rooms[0].roomNumber
            }</li>
            <li><strong>Members Capacity:</strong> ${
              checkBooking?.rooms[0].membersCapacity
            }</li>
            <li><strong>Number of Beds:</strong> ${
              checkBooking?.rooms[0].No_of_beds
            }</li>
            </li>
            <li><strong>Room Price Per Day:</strong>
            ${rooms[0].price}
            </li>
            <li><strong>Total Price:</strong> ${
              checkBooking?.rooms[0].price
            }</li>
            <li><strong>Total Day For Booking Room:</strong>
            ${checkBooking?.bookingRoomDays}
            </li>
        </ul>

        <p>
            Please let me know if the requested dates are available and provide any additional information regarding the booking process. I am eager to confirm my reservation and appreciate
    `,
    });
    await bookingRoomSchemas.findByIdAndDelete({ _id: bookingId });
    return res.status(200).json({
      message: "Cancel the Book Room Successfully",
    });
}
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default cancelBookingController;
