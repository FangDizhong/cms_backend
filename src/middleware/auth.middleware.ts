import * as Koa from "koa"
import errorTypes from "../constants/error-types"
import authService from "../service/user.service"
import { md5password } from "../utils/password-handler"

const verifyLogin = async (ctx: Koa.Context, next: Koa.Next) => {
  const { name, password } = ctx.request.body

  // 1. verify not null
  // if (!name || !password || name === "" || password === "") {
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }

  // 2. verify user exists
  // "as any[]" is to fix mysql2 ts error
  const result = (await authService.getUserByName(name)) as any[]
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXIST)
    return ctx.app.emit("error", error, ctx)
  }

  // 3. verify password(encryption)
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_NOT_CORRECT)
    return ctx.app.emit("error", error, ctx)
  }

  await next()
}

const handlePassword = async (ctx: Koa.Context, next: Koa.Next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)

  await next()
}

export { verifyLogin, handlePassword }
