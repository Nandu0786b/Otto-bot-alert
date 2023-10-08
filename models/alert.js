import mongoose from "mongoose";

const stockAlertSchema = new mongoose.Schema(
  {
    stock: {
      type: String,
      required: true,
      maxLength: 25,
      minLength: 2,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: 'User', // The name of the referenced model
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'], // Enum for status values
      default: 'pending',
    },
    type: {
      type: String,
      require: true,
      enum: ['greater', 'lesser', 'equal'], // Enum for type values
      required: true,
    },
    notifyStatus :{
      type:String,
      default:"Not filled",
      enum: ['faield', 'success', 'User is offline','Not filled'], // Enum for type values
    }

  },{
    timestamps: true,
    versionKey: '__v', // Enable versioning
})

mongoose.pluralize(null);
const StockAlert = mongoose.model("StockAlert", stockAlertSchema);
export default StockAlert;


