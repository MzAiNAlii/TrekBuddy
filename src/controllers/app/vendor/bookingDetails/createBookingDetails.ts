import { RequestHandler } from "express";
import roomSchemas from "../../../../models/app/room";

const createBookingDetailsController: RequestHandler = async (req, res) => {
  const { vendorId, address, hotelDetail } = req.body;

  try {
    const hotelArray: any = [];
    hotelDetail.forEach((hotel: any) => {
      hotelArray.push({
        name: hotel.name,
        classType: hotel.classType,
        description: hotel.description,
        rating: hotel.rating,
        rooms: hotel.rooms.map((room: any) => ({
          roomNumber: room.roomNumber,
          capacity: room.capacity,
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
    const createBookingDetails = await roomSchemas.create({
      vendorId,
      address,
      hotels: hotelArray,
    });
    return res.status(200).json({
      message: "Booking For Room Post Created Successfully",
      data: createBookingDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
};
export default createBookingDetailsController;
