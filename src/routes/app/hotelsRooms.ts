import { Router } from "express";
import hotelsRoomsController from "../../controllers/app/hotelsRooms";

const hotelsRoomsRouter = Router();

hotelsRoomsRouter.get("/hotelRooms", hotelsRoomsController);

export default hotelsRoomsRouter;