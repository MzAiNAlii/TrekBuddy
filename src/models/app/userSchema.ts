import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    userName:{
        type: String,
        unique: true,
        maxLength: 50,
        require: true,
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
    contactNumber:{
        type: String,
        require: true
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
const usersSchema = mongoose.model("Users",userSchema);
export default usersSchema;  
