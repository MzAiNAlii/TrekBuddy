import express from 'express'
import cors from 'cors'
import adminRouter from './routes/admin/auth';
import userRouter from './routes/app/users/auth';
import vendorRouter from './routes/app/vendor/auth';


const app = express();

app.use(express.json());
app.use(cors())

// app.get("/",(req,res )=>{
//     res.send("this is home")
// })

app.use("/",adminRouter)
app.use("/",vendorRouter)
app.use("/",userRouter)

export default app;