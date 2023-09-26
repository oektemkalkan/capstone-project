import mongoose from "mongoose";

const { Schema } = mongoose;

const showRockStars = new Schema({
  name: { type: String },
  location: { type: String },
  image: { type: String },
  rating: { type: String },
  price: { type: Number },
  currency: { type: String },
});

const Rockstar =
  mongoose.models.Rockstar || mongoose.model("Rockstar", showRockStars);

export default Rockstar;
