import { RequestHandler } from "express";
import hotelSchemas from "../../../../models/app/hotels";

const getBookingDetailsController: RequestHandler = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const getAllBookingDetails = await hotelSchemas.find({ vendorId });
    if (getAllBookingDetails.length == 0) {
      return res.status(404).json({
        message: "No Posts",
      });
    }
    return res.status(200).json({
      message: "Posts",
      data: getAllBookingDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default getBookingDetailsController;
