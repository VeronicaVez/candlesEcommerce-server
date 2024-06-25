const { Schema, model } = require("mongoose")

const adminSchema = new Schema(
    {
        username: {
            type: String
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
            required: [true, 'Password is required.'],
        },
        role: {
            type: String,
            enum: ["user", "admin"]
        }
    },
      {
    timestamps: true
  }
)

const Admin = model("Admin", adminSchema)

module.exports = Admin