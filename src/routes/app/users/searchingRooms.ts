import { Router } from "express";
import searchingRoomController from "../../../controllers/app/user/searchingRooms";
import roomDetailController from "../../../controllers/app/user/RoomDetails";
import sendRequestRoomBookingController from "../../../controllers/app/user/sendRequestRoomBooking";
import pendingBookingRequestController from "../../../controllers/app/user/pendingBookingRequest";
import activeBookingController from "../../../controllers/app/user/activeBooking";

const bookRoomRouter = Router();

bookRoomRouter.post("/searching-room", searchingRoomController);
bookRoomRouter.get("/room-details/:hotelId", roomDetailController);
bookRoomRouter.post(
  "/sendRequest-roomBooking/:userId/:vendorId/:hotelId",
  sendRequestRoomBookingController
);
bookRoomRouter.get(
  "/pending-requests/:userId",
  pendingBookingRequestController
);
bookRoomRouter.get("/active-booking/:userId", activeBookingController);

export default bookRoomRouter;
