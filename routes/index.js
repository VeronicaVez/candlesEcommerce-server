module.exports = app => {
  const candlesRouter = require("./candle.routes")
  app.use("/api/candles", candlesRouter)

  const userRouter = require("./user.routes")
  app.use("/api/user", userRouter)

}