import { Context, Next } from "koa"
import commentService from "../service/comment.service"

class CommentController {
  async create(ctx: Context, next: Next) {
    // 1 receive {momentID, content,userID}
    // if(!commentID){commentID=null}
    const { content, commentID = null } = ctx.request.body
    const { momentID } = ctx.params
    const { id } = ctx.user

    // 2 query Database
    const result = await commentService.create(content, momentID, id, commentID)

    // 3 return data
    ctx.body = result
  }

  async getCommentsForMoment(ctx: Context, next: Next) {
    const momentID = ctx.params.momentID
    const result = await commentService.getCommentsByMomentID(momentID)
    ctx.body = result
  }

  async updateComment(ctx: Context, next: Next) {
    const commentID = ctx.params.commentID
    const { content } = ctx.request.body
    const result = await commentService.updateCommentByID(commentID, content)

    ctx.body = result
  }

  async deleteComment(ctx: Context, next: Next) {
    const commentID = ctx.params.commentID

    const result = await commentService.deleteCommentByID(commentID)

    ctx.body = result
  }
}

export = new CommentController()
