import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin/auth";
import userRouter from "./routes/app/users/auth";
import vendorRouter from "./routes/app/vendor/auth";
import userProfileRouter from "./routes/app/users/userProfile";
import vendorProfileRouter from "./routes/app/vendor/vendorProfile";
import bookingDetailsRouter from "./routes/app/vendor/booking/BookingDetails";
import bookRoomRouter from "./routes/app/users/searchingRooms";
import bookingRequestRouter from "./routes/app/vendor/booking/bookingRequests";
import hotelsRoomsRouter from "./routes/app/hotelsRooms";
import inviteTeamMemberRouter from "./routes/admin/inviteTeamMember";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", adminRouter);
app.use("/",inviteTeamMemberRouter)

app.use("/vendor", vendorRouter);
app.use("/vendor", vendorProfileRouter);
app.use("/vendor", bookingDetailsRouter);
app.use("/vendor", bookingRequestRouter);

app.use("/user", userRouter);
app.use("/user", userProfileRouter);
app.use("/user", bookRoomRouter);
app.use("/",hotelsRoomsRouter);

export default app;
