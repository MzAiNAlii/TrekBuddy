import { RequestHandler } from "express";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";

const searchingRoomController: RequestHandler = async (req, res) => {
  const {
    location,
    classType,
    minCapacityMembers,
    maxCapacityMembers,
    minPrice,
    maxPrice,
  } = req.body;

  try {
    const classTypeExists = await hotelRoomSchemas.exists({
      location,
      "hotels.classType": classType,
    });

    if (!classTypeExists) {
      return res.status(400).json({
        success: false,
        message: "Location not found in the specified classType.",
      });
    }

    const query = {
      location,
      "hotels.classType": classType,
      "hotels.rooms.membersCapacity": {
        $gte: minCapacityMembers,
        $lte: maxCapacityMembers,
      },
      "hotels.rooms.price": { $gte: minPrice, $lte: maxPrice },
      // "hotels.rooms.availability": true,
    };
    const rooms = await hotelRoomSchemas.find(query);

    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No rooms found within the specified price range and members capacity.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Searching Rooms Successfully",
      data: rooms,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default searchingRoomController;
