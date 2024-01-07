import { RequestHandler } from "express";
import hotelSchemas from "../../../../models/app/hotels";

const updateBookingDetailsController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const data = {
      address: req.body.address,
      hotelDetail: req.body.hotelDetail,
      location: req.body.location,
    };
    const hotelArray = data.hotelDetail.map((hotel: any) => ({
      name: hotel.name,
      classType: hotel.classType,
      description: hotel.description,
      rating: hotel.rating,
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
    }));

    const isImagesSpaceFull = hotelArray.some((hotel: any) =>
      hotel.rooms.some((room: any) => room.images.length > 5)
    );

    if (isImagesSpaceFull) {
      return res.status(400).json({
        message: "Images space is full. Maximum allowed is 5 images per room.",
      });
    }

    const existingVendorBookingDetails = await hotelSchemas.findById(id);

    if (existingVendorBookingDetails) {
      existingVendorBookingDetails.hotels.forEach((hotel, hotelIndex) => {
        hotel.rooms.forEach((room, roomIndex) => {
          room.images.forEach((img, imgIndex) => {
            existingVendorBookingDetails.hotels[hotelIndex].rooms[roomIndex]
              .images[imgIndex].imgURL;
          });
        });
      });

      existingVendorBookingDetails.set({
        address: data.address,
        location: data.location,
        hotels: hotelArray,
      });

      const updatedPost = await existingVendorBookingDetails.save();

      const allPosts = await hotelSchemas.find({
        vendorId: updatedPost!.vendorId,
      });

      return res.status(200).json({
        message: "Post Updated Successfully",
        data: allPosts,
      });
    } else {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default updateBookingDetailsController;
