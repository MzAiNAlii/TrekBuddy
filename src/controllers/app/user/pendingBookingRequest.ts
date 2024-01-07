import { RequestHandler } from "express";
import bookingRoomSchemas from "../../../models/app/bookingRoom";

const pendingBookingRequestController: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const checkPendingRequests = await bookingRoomSchemas.find({
      userId,
      roomBookingStatus: false,
    });

    if (checkPendingRequests.length == 0) {
      return res.status(404).json({
        messaage: "No Pending Booking Requests are here.",
      });
    }
    return res.status(200).json({
      message: "Pending Booking Requests",
      data: checkPendingRequests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default pendingBookingRequestController;
