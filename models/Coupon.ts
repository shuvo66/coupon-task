import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  user_name: {
    required: [true, "Field is required."],
    minLength: [2, "Name must be 2 character long."],
    type: Schema.Types.String,
  },

  email: {
    required: [true, "Field is required."],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  roll: {
    required: [true, "Field is required."],
    type: Schema.Types.String,
    trim: true,
  },
  school_name: {
    required: [true, "Field is required."],
    type: Schema.Types.String,
    trim: true,
  },
  class_name: {
    required: [true, "Field is required."],
    type: Schema.Types.String,
    trim: true,
  },
  status: {
    type: Schema.Types.Boolean,
    trim: true
  }
},{timestamps: true});

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);