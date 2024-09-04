import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniquie: true,
  },
  email: {
    type: String,
    required: true,
    uniquie: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: Array,
    default: []
  },
});

export const User= mongoose.model('User',UserSchema);