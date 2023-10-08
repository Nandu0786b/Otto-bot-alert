import mongoose from "mongoose";

const stockAvailable = new mongoose.Schema(
  {
    stock: {
      type: String,
      required: true,
      maxLength: 25,
      minLength: 2,
    },
    subscriber:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    }
  },
  {
    timestamps: true,
    versionKey: '__v', // Enable versioning
});

mongoose.pluralize(null);
const StockAlert = mongoose.model("StockAvailable", stockAvailable);
export default StockAlert;


