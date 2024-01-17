import { RequestHandler } from "express";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";

const deleteBookingDetailsController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const findVendor = await hotelRoomSchemas.findById({ _id: id });
    if (!findVendor) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    await hotelRoomSchemas.findByIdAndDelete({ _id: findVendor._id });
    return res.status(200).json({
      message: "Post Delete Successully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default deleteBookingDetailsController;
