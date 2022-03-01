import type { Context, Next } from "koa"
import momentService from "../service/moment.service"

class MomentController {
  async create(ctx: Context, next: Next) {
    // 1 receive {user_id, content}
    const userID = ctx.user.id
    const content = ctx.request.body.content

    // 2 query Database
    const result = await momentService.create(userID, content)

    // 3 return data
    ctx.body = result
  }

  async getDetail(ctx: Context, next: Next) {
    // 1 receive /:momentID
    const momentID = ctx.params.momentID

    // 2 query Database
    const result = await momentService.getMomentByID(momentID)

    ctx.body = result
  }

  async getList(ctx: Context, next: Next) {
    // 1 receive ?offset= &size=
    // `Array.isArray(x)? x[0] :x ` is to fix koa ts error about "string[]"
    const offset = Array.isArray(ctx.query.offset)
      ? ctx.query.offset[0]
      : ctx.query.offset
    const size = Array.isArray(ctx.query.size)
      ? ctx.query.size[0]
      : ctx.query.size

    // 2 query Database
    // `parseInt(x || "") ` is to fix koa ts error about "string | undefined" into number
    const result = await momentService.getMomentList(
      parseInt(offset || ""),
      parseInt(size || "")
    )

    ctx.body = result
  }

  async updateMoment(ctx: Context, next: Next) {
    // 1 recieve /:momentID
    const momentID = ctx.params.momentID
    const content = ctx.request.body.content

    // 2 update moment content
    const result = await momentService.updateMomentByID(content, momentID)

    ctx.body = result
  }

  async deleteMoment(ctx: Context, next: Next) {
    // 1 recieve /:momentID
    const momentID = ctx.params.momentID

    // 2 remove moment content
    const result = await momentService.deleteMomentByID(momentID)

    ctx.body = result
  }
}

export = new MomentController()
