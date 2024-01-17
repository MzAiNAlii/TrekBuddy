import { RequestHandler } from "express";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";

const pendingRoomsAvailabilityController: RequestHandler = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const checkUnavailabilityRoom = await hotelRoomSchemas.find({
      vendorId: vendorId,
      "hotels.rooms.availability": false,
    });
    if(checkUnavailabilityRoom.length == 0){
        return res.status(404).json({
            message: "Room are not Pending in unavailabilty status"
        })
    }
    return res.status(200).json({
        message: "Pending Rooms ",
        data: checkUnavailabilityRoom
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default pendingRoomsAvailabilityController;
