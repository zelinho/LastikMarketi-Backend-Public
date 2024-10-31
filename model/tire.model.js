import mongoose from "mongoose";

const tireSchema = mongoose.Schema({
    name : String,
    price : Number,
    category : String,
    image: String,
    title: String,
});
const Tire = mongoose.model("Tire", tireSchema);

export default Tire;