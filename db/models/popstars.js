import mongoose from "mongoose";

const { Schema } = mongoose;

const showPopSchema = new Schema({
  name: { type: String },
  location: { type: String },
  image: { type: String },
  rating: { type: String },
  price: { type: Number },
  currency: { type: String },
});

const Popstar =
  mongoose.models.Popstar || mongoose.model("Popstar", showPopSchema);

export default Popstar;
