import { RequestHandler } from "express";
import bookingRoomSchemas from "../../../../models/app/bookingRoom";

const acceptBookingController: RequestHandler = async (req, res) => {
    const {bookingId} = req.params
    try {
        const find = await bookingRoomSchemas.findById({_id: bookingId});
        const updateBookingStatus = await bookingRoomSchemas.findByIdAndUpdate({_id: bookingId},{
            $set:{
                roomBookingStatus: true
            }
        },{new: true})
        return res.status(200).json({
            meassage: "ok",
            data: updateBookingStatus
        })

        
    } catch (error) {
        console.log(error);
        
        
    }

};
export default acceptBookingController;
