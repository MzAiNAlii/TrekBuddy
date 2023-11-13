import express from 'express';
import cors from 'cors';
import adminRouter from './routes/admin/auth';
import userRouter from './routes/app/users/auth';
import vendorRouter from './routes/app/vendor/auth';
import userProfileRouter from './routes/app/users/userProfile';
import vendorProfileRouter from './routes/app/vendor/vendorProfile';
import bookingDetailsRouter from './routes/app/vendor/BookingDetails';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/",adminRouter);

app.use("/vendor",vendorRouter);
app.use("/vendor", vendorProfileRouter);
app.use("/vendor", bookingDetailsRouter);

app.use("/user",userRouter);
app.use("/user",userProfileRouter);

export default app;