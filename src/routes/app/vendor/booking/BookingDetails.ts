import { Router } from "express";
import getBookingDetailsController from "../../../../controllers/app/vendor/bookingDetails/getBookingDetails";
import updateBookingDetailsController from "../../../../controllers/app/vendor/bookingDetails/updateBookingDetails";
import deleteBookingDetailsController from "../../../../controllers/app/vendor/bookingDetails/deleteBookingDetails";
import createBookingDetailsController from "../../../../controllers/app/vendor/bookingDetails/createBookingDetails";
import unavailabilityRoomController from "../../../../controllers/app/vendor/bookingDetails/pendingRoomsAvailability";
import updateRoomAvailabilityController from "../../../../controllers/app/vendor/bookingDetails/updateRoomAvailability";

const bookingDetailsRouter = Router();

bookingDetailsRouter.post(
  "/create-BookingDetails",
  createBookingDetailsController
);
bookingDetailsRouter.get(
  "/all-BookingDetails/:vendorId",
  getBookingDetailsController
);
bookingDetailsRouter.patch(
  "/update-BookingDetails/:id",
  updateBookingDetailsController
);
bookingDetailsRouter.delete(
  "/delete-BookingDetails/:id",
  deleteBookingDetailsController
);
bookingDetailsRouter.get(
  "/pending-room/:vendorId",
  unavailabilityRoomController
);
bookingDetailsRouter.patch(
  "/update-roomAvailability/:roomId",
  updateRoomAvailabilityController
);

export default bookingDetailsRouter;
