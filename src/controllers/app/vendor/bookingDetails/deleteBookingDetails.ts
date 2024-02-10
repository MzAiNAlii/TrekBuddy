import { RequestHandler } from "express";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";

const deleteBookingDetailsController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  
  try {
    const findVendor = await hotelRoomSchemas.findById({ _id: id });
    if (!findVendor) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    await hotelRoomSchemas.findByIdAndDelete({ _id: findVendor._id });
    const details = await hotelRoomSchemas.find({vendorId: findVendor.vendorId})
    console.log(details);
    
    return res.status(200).json({
      message: "Post Delete Successully",
      data: details
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default deleteBookingDetailsController;
