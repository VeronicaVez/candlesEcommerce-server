const { Schema, model } = require("mongoose")

const candleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        aroma: {
            type: String,
            enum: ["Lavender", "Rose", "Citrus", "Berry", "Coco", "Cinnamon", "Chocolate", "Coffee", "Vanilla"],
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        interestedPeople: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps: true
    }
)

const Candle = model("Candle", candleSchema)

module.exports = Candle