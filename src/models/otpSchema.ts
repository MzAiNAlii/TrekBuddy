import mongoose, { Schema } from 'mongoose';

const otpSchemas = new Schema({
    email:{
       type: String,
        require: true,
        maxlength : 30

    },
    otp:{
        type: String,
        default: ""
    },
    expire:{
        type : String
    }
},{
    timestamps: true
})
const otpSchema = mongoose.model("otpSchema",otpSchemas)
export default otpSchema;