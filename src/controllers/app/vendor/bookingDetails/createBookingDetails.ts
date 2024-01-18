import { RequestHandler } from "express";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";

const createBookingDetailsController: RequestHandler = async (req, res) => {
  const { vendorId, location, address, hotelDetail } = req.body;
  try {
    const hotelName = hotelDetail[0].name;
    const changeCharater = hotelName
      .split(" ")
      .map((n: any) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
      .join(" ");

    const room = hotelDetail[0].rooms;
    const hotelRoomNumber = room[0].roomNumber;
    
    const hotelArray: any = [];
    hotelDetail.forEach((hotel: any) => {
      hotelArray.push({
        name: changeCharater,
        classType: hotel.classType,
        description: hotel.description,
        rooms: hotel.rooms.map((room: any) => ({
          roomNumber: room.roomNumber,
          membersCapacity: room.membersCapacity,
          No_of_beds: room.No_of_beds,
          price: room.price,
          availability: room.availability,
          images: room.images.map((img: any) => ({
            imgURL: img.imgURL,
          })),
        })),
      });
    });

    const existingHotelDetails = await hotelRoomSchemas.find({
      "hotels.name": changeCharater,
      "hotels.rooms.roomNumber": hotelRoomNumber,
    });

    if (existingHotelDetails.length == 1) {
      return res.status(409).json({
        message: `The room number:${hotelRoomNumber} is already exist against the hotel name:${changeCharater} `,
      });
    }
    const isImagesSpaceFull = hotelArray.some((hotel: any) =>
      hotel.rooms.some((room: any) => room.images.length > 5)
    );
    if (isImagesSpaceFull) {
      return res.status(400).json({
        message: "Images space is full. Maximum allowed is 5 images per room.",
      });
    }
    const createBookingDetails = await hotelRoomSchemas.create({
      vendorId,
      location,
      address,
      hotels: hotelArray,
    });
    return res.status(200).json({
      message: "Booking For Room Post Created Successfully",
      data: createBookingDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default createBookingDetailsController;
