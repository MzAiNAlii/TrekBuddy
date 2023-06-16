import mongoose, { Schema } from 'mongoose';

const authenticationsSchemas = new Schema({
    email:{
       type: String,
        require: true,
        unique: true,
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
const authenticationSchema = mongoose.model("AuthenticationSchema",authenticationsSchemas)
export default authenticationSchema;