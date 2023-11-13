import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  vendorId: {
    type: mongoose.Types.ObjectId,
    ref: "Vendors",
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
      classType:{ 
        type: String,
        enum: ['Business', 'First', 'Economy']
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
          //type: String,
          capacity: Number,
          No_of_beds: String,
          price: Number,
          availability: [
            {
              date: Date,
              available: Boolean,
            },
          ],
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

const roomSchemas = mongoose.model("rooms", roomSchema)
export default roomSchemas;
