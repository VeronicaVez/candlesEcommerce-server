module.exports = app => {
  const candlesRouter = require("./candle.routes")
  app.use("/api/candles", candlesRouter)

  const userRouter = require("./user.routes")
  app.use("/api/user", userRouter)
  
  const authRoutes = require("./auth.routes")
  app.use("/api/auth", authRoutes)

  const uploadRoutes = require("./upload.routes")
  app.use("/api/upload", uploadRoutes)
}