import express from 'express'
import adminRouter from './routes/admin/auth';
import userRouter from './routes/users/auth';
import vendorRouter from './routes/vendor/auth';

const app = express();

app.use(express.json());

app.get("/",(req,res )=>{
    res.send("this is home")
})
app.set('Content-Type', 'application/json')

app.use("/",adminRouter)
app.use("/",vendorRouter)
app.use("/",userRouter)

export default app;