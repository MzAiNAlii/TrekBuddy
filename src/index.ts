import dotenv from 'dotenv';
dotenv.config();
import app from "./app";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL!)
.then(()=>{
    app.listen(process.env.PORT!,()=>{
        console.log(`Server Running on Port ${process.env.PORT!}`);
    })

})
.catch(error=>{
    console.log("Mongoose Error",error);

});

