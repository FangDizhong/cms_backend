import type { Context, Next } from "koa"
import momentService from "../service/moment.service"

class MomentController {
  async create(ctx: Context, next: Next) {
    // 1 receive {userID, content}
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

  async getMoments(ctx: Context, next: Next) {
    // 1 receive ?offset= &size=
    // `Array.isArray(x)? x[0] :x ` is to fix koa ts error about "string[]"
    // as string also can fix koa ts error about "string"
    const offset = ctx.query.offset as string
    const limit = ctx.query.limit as string

    // 2 query Database
    // `parseInt(x || "") ` is to fix koa ts error about "string | undefined" into number
    const result = await momentService.getMomentList(
      parseInt(offset || ""),
      parseInt(limit || "")
    )

    ctx.body = result
  }

  async updateMoment(ctx: Context, next: Next) {
    // 1 recieve /:momentID
    const momentID = ctx.params.momentID
    const content = ctx.request.body.content

    // 2 update moment content
    const result = await momentService.updateMomentByID(momentID, content)

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
