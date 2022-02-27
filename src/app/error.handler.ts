import * as Koa from "koa"
import errorTypes from "../constants/error-types"

// error as response
const errorHandler = (error: Error, ctx: Koa.Context) => {
  let status, message

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_REQUIRED:
      status = 400 // Bad Request
      message = "Username or password cannot be null!"
      break
    case errorTypes.USER_EXISTS:
      status = 409 // Conflict
      message = "User is already exists!"
      break

    default:
      status = 404
      message = "NOT FOUND!"
  }

  ctx.status = status
  ctx.body = message
}

export { errorHandler }
