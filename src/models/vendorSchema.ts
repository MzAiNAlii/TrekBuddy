import mongoose, { Schema } from 'mongoose';

const vendorSchema = new Schema({
    userName:{
        type: String,
        unique: true,
        maxLength: 50,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        maxlength : 30
    },
    password:{
        type: String,
        require: true,
        minlength: 8

    },
    contactNumber:{
        type: String,
        require: true
    },
    companyName:{
        type: String,
        require: true,
        maxlength: 50
    },
    DateOfBirth:{
        type: String,
        require: true

    },
    Gender:{
        type: String,
        require: true
    },
    role:{
        type: String,
        //enum: ['admin', 'vendor', 'user'],
    },
    token:{
        type: String,
        select: true,
        require: false,
        default: ""
    }
    
},
    {
        timestamps: true
    })
const vendorsSchema = mongoose.model("Vendors",vendorSchema);
export default vendorsSchema;  
