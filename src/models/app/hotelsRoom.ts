import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
  vendorId: {
    type: mongoose.Types.ObjectId,
    ref: "Vendors",
  },
  location: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  hotels: [
    {
      name: {
        type: String,
        required: true,
      },
      classType: {
        type: String,
        enum: ["Business", "First", "Economy"],
      },
      description: String,
      rating: {
        type: Number,
        default: 0,
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
          availability: Boolean,
          images: [
            {
              imgURL: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
});

const hotelSchemas = mongoose.model("hotelRooms", hotelSchema);
export default hotelSchemas;
