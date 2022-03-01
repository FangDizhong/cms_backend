import type { Context, Next } from "koa"
import userService from "../service/user.service"

class UserController {
  async create(ctx: Context, next: Next) {
    // 1 receive user's queryInfo
    const user = ctx.request.body

    // 2 query Database
    const result = await userService.create(user)

    // 3 return data
    ctx.body = result
  }
}

export = new UserController()
