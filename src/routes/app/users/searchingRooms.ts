import { Router } from "express";
import searchingRoomController from "../../../controllers/app/user/bookingDetails/searchingRooms";
import roomDetailController from "../../../controllers/app/user/bookingDetails/RoomDetails";
import sendRequestRoomBookingController from "../../../controllers/app/user/bookingRequests/sendRequestRoomBooking";
import pendingBookingRequestController from "../../../controllers/app/user/bookingRequests/pendingBookingRequest";
import activeBookingController from "../../../controllers/app/user/bookingRequests/activeBooking";

const bookRoomRouter = Router();

bookRoomRouter.post("/searching-room", searchingRoomController);
bookRoomRouter.get("/room-details/:roomId", roomDetailController);
bookRoomRouter.post(
  "/sendRequest-roomBooking/:userId/:vendorId/:roomId",
  sendRequestRoomBookingController
);
bookRoomRouter.get(
  "/pending-requests/:userId",
  pendingBookingRequestController
);
bookRoomRouter.get("/active-booking/:userId", activeBookingController);

export default bookRoomRouter;
