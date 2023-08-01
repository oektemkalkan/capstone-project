import mongoose from "mongoose";

const { Schema } = mongoose;

const showPopStars = new Schema({
  name: { type: String },
  location: { type: String },
  image: { type: String },
  rating: { type: String },
  price: { type: Number },
  currency: { type: String },
});

const Popstar =
  mongoose.models.Popstar || mongoose.model("Popstar", showPopStars);

export default Popstar;
