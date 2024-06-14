const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String, 
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    candles: [{
      type: Schema.Types.ObjectId,
      ref: "Candle"
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
