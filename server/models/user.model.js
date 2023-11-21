import mongoose from "mongoose";

const MODEL_NAME = "Users";
const COLLECTION_NAME = "users";

const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "https://randomuser.me/api/portraits/men/40.jpg",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false }
);

export const Users = mongoose.model(MODEL_NAME, UsersSchema, COLLECTION_NAME);
