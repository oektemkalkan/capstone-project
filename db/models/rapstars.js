import mongoose from "mongoose";

const { Schema } = mongoose;

const showRapStars = new Schema({
  name: { type: String },
  location: { type: String },
  image: { type: String },
  rating: { type: String },
  price: { type: Number },
  currency: { type: String },
});

const Rapstar =
  mongoose.models.Rapstar || mongoose.model("Rapstar", showRapStars);

export default Rapstar;
