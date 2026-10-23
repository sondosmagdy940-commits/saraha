import { logger } from "../../pkg/logger/logger.js"
export function globalErrorHandller(error, req, res, _next) {
  logger.error(error.message, {
    stack: error.stack,
    correlattionId: req.correlattionId
  })
  if (error.isOpreational === true) {
    res.json({
      message: error.message,
      success: false,
      stack: error.stack
    })
  }
  return res.status(500).json({
    error: "something was wrong",
    success: false
  })
}