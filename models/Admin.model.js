const { Schema, model } = require("mongoose")

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"]
        }
    }
)

const Admin = model("Admin", adminSchema)

module.exports = Admin