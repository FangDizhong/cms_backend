import jwt from "jsonwebtoken"

import type { Context, Next } from "koa"

import errorTypes from "../constants/error-types"
import userService from "../service/user.service"
import { md5password } from "../utils/password-handler"
import config from "../app/config"
import authService from "../service/auth.service"

const verifyLogin = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body

  // 1. verify not null
  // if (!name || !password || name === "" || password === "") {
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }

  // 2. verify user exists
  // "as any[]" is to fix mysql2 ts error
  const result = (await userService.getUserByName(name)) as any[]
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

  ctx.user = user

  await next()
}

const verifyToken = async (ctx: Context, next: Next) => {
  // 1. get token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.USER_NOT_AUTHORIZED)
    return ctx.app.emit("error", error, ctx)
  }
  const token = authorization!.replace("Bearer ", "")

  // 2. verify token
  try {
    const result = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result

    await next()
  } catch (err) {
    const error = new Error(errorTypes.USER_NOT_AUTHORIZED)
    ctx.app.emit("error", error, ctx)
  }
}

/**
 * "update / delete" action
 * service api : user = user
 * cms api : user(1) v role(1)  role(n) v menu(n) "CRUD"
 */
const verifyAuth = async (ctx: Context, next: Next) => {
  // 1. get resourceName resourceID & userID
  const paramKeys = Object.keys(ctx.params)
  // in our restful design, resourceKey will be the last one of paramKeys
  const resourceKey = paramKeys[paramKeys.length - 1]
  console.log(resourceKey)
  const resourceName = resourceKey.replace("ID", "")
  const resourceID = ctx.params[resourceKey]
  const userID = ctx.user.id

  // 2. verify moment Auth
  // the "err" catched here is from error thrown nearby
  try {
    const isAuthorized = await authService.verifyResourceAuth(
      resourceName,
      resourceID,
      userID
    )

    if (!isAuthorized) throw new Error()

    await next()
  } catch (err) {
    const error = new Error(errorTypes.NOT_AUTHORIZED)
    return ctx.app.emit("error", error, ctx)
  }
}

export { verifyLogin, verifyToken, verifyAuth }
