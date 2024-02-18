import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["Super Admin", "Admin"],
    },
    signupDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const adminSchemas = mongoose.model("adminSchema", adminSchema);

export default adminSchemas;
