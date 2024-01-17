import { RequestHandler } from "express";
import vendorsSchema from "../../../../models/app/vendorSchema";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";

const roomDetailController: RequestHandler = async (req, res) => {
  const { roomId } = req.params;
  try {
    const hotelDetails = await hotelRoomSchemas.findById({ _id: roomId });

    const vendorInfo = await vendorsSchema
      .findById({ _id: hotelDetails!.vendorId })
      .select("userName email contactNumber companyName");

    return res.status(200).json({
      message: "Room Details ",
      data: {
        roomDetails: hotelDetails,
        vendorInformation: vendorInfo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default roomDetailController;
