import { RequestHandler } from "express";
import hotelRoomSchemas from "../../../../models/app/hotelsRoom";
import bookingRoomSchemas from "../../../../models/app/bookingRoom";

const updateRoomAvailabilityController: RequestHandler = async (req, res) => {
  const { roomId } = req.params;
  try {
    const hotelRoomDetails: any = await hotelRoomSchemas.findById({ _id: roomId });
    const currentDateAndTime = new Date();
    const room_already_booked = await bookingRoomSchemas.findOne({
      roomId: roomId,
    });
  
    if (room_already_booked?.roomBookingStatus === true) {
        
      if (room_already_booked?.roomBookingStatus === true && room_already_booked!.bookingEndDate! <= currentDateAndTime ) {
        console.log("123456");

        hotelRoomDetails.hotels.forEach((hotel: any) => {
          hotel.rooms.forEach((room: any) => {
            room.availability = true; 
          });
        });
        await hotelRoomDetails.save();
        await bookingRoomSchemas.findOneAndDelete({roomId: roomId});
        return res.status(400).json({
          message: "Room availability are update successfully",
        });
      }
      return res.status(409).json({
        message: "This room is already booked. Please try again",
          currentDateAndTime,
          endDateAndTime: room_already_booked.bookingEndDate,
        
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
    
  }
};
export default updateRoomAvailabilityController;
