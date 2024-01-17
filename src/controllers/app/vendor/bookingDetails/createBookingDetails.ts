import { RequestHandler } from "express";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";

const createBookingDetailsController: RequestHandler = async (req, res) => {
  const { vendorId, location, address, hotelDetail } = req.body;
  console.log(req.body);
  try {
    const hotelArray: any = [];
    hotelDetail.forEach((hotel: any) => {
      hotelArray.push({
        name: hotel.name,
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
      message: error,
    });
  }
};
export default createBookingDetailsController;
