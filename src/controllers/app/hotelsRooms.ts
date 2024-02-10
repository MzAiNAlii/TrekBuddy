import { RequestHandler } from "express";
import hotelRoomSchemas from "../../models/app/hotelsRoom";

const hotelsRoomsController: RequestHandler = async (req, res) => {
  try {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const hotelsRooms = await hotelRoomSchemas.find().limit(limit).skip(skip);
    return res.status(200).json({
      message: "Hotel Rooms are",
      data: hotelsRooms,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default hotelsRoomsController;
