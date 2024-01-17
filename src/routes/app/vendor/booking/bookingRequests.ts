import { Router } from "express";
import pendingBookingRequestController from "../../../../controllers/app/vendor/bookingRequests/pendingBookingRequest";
import acceptBookingController from "../../../../controllers/app/vendor/bookingRequests/acceptBookingRequest";
import activeBookingController from "../../../../controllers/app/vendor/bookingRequests/activeBooking";
import rejectBookingRequestController from "../../../../controllers/app/vendor/bookingRequests/rejectBookingRequest";

const bookingRequestRouter = Router();

bookingRequestRouter.get("/pending-requests/:vendorId", pendingBookingRequestController);
bookingRequestRouter.get("/active-booking/:vendorId", activeBookingController);
bookingRequestRouter.put("/accept-bookingRequest/:bookingId", acceptBookingController);
bookingRequestRouter.delete("/reject-bookingRequest/:bookingId", rejectBookingRequestController);


export default bookingRequestRouter;