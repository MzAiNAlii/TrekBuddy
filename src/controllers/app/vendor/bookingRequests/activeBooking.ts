import { RequestHandler } from "express";
import bookingRoomSchemas from "../../../../models/app/bookingRoom";

const activeBookingController: RequestHandler = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const checkActiveRequests: any = await bookingRoomSchemas.find({
      vendorId,
      roomBookingStatus: true,
    });
    if (checkActiveRequests.length == 0) {
      return res.status(404).json({
        messaage: "No Active Booking are here.",
      });
    }
    return res.status(200).json({
      message: "Active Booking",
      data:  checkActiveRequests
        
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default activeBookingController;
