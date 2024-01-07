import { RequestHandler } from "express";
import vendorsSchema from "../../../models/app/vendorSchema";
import hotelSchemas from "../../../models/app/hotels";

const roomDetailController: RequestHandler = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotelDetails = await hotelSchemas.findById({ _id: hotelId });

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
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default roomDetailController;
