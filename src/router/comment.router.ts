import Router from "koa-router"
import commentController from "../controller/comment.controller"
import { verifyToken, verifyAuth } from "../middleware/auth.middleware"

const commentRouter = new Router({ prefix: "/moment/:momentID/comment" })

commentRouter.post("/", verifyToken, commentController.create)
commentRouter.patch(
  "/:commentID",
  verifyToken,
  verifyAuth,
  commentController.updateComment
)
commentRouter.delete(
  "/:commentID",
  verifyToken,
  verifyAuth,
  commentController.deleteComment
)

export = commentRouter
