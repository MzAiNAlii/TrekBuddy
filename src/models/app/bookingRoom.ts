import mongoose, { Schema } from "mongoose";

const bookingRoomSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    userInfo: [
      {
        userName: {
          type: String,
        },
        email: {
          type: String,
        },
        contactNumber: {
          type: String
        },
      },
    ],
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "Vendors",
    },
    roomId: {
      type: mongoose.Types.ObjectId,
      ref: "hotelRooms",
    },
    rooms: [
      {
        roomNumber: {
          type: Number,
          required: true,
        },
        membersCapacity: Number,
        No_of_beds: String,
        price: Number,
      },
    ],
    bookingRoomDays: {
      type: Number,
    },
    bookingStartDate: {
      type: Date,
    },
    bookingEndDate: {
      type: Date,
    },
    roomBookingStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const bookingRoomSchemas = mongoose.model("bookingRooms", bookingRoomSchema);
export default bookingRoomSchemas;
