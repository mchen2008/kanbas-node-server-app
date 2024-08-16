import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    _id: String,
    number: String,
    name: String,
    startDate: String,
    endDate: String,
    department: String,
    description: String,
    image: String,
  },
  { collection: "courses" }
);
export default courseSchema;