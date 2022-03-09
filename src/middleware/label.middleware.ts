import { Context, Next } from "koa"
import { OkPacket } from "mysql2"
import labelService from "../service/label.service"

const verifyLabelExists = async (ctx: Context, next: Next) => {
  // Verify one label
  const label = ctx.request.body.label

  // leaving the creation process to next()
  const labelResult = (await labelService.getLabelByName(label)) as any[]
  if (!labelResult.length) {
    await next()
  } else {
    return (ctx.body = { label: labelResult[0] })
  }
}

const verifyEveryLabelExists = async (ctx: Context, next: Next) => {
  // Verify multi labels
  const labels = ctx.request.body.labels

  const newLabels = []

  // if label NOT exists, create one
  for (let name of labels) {
    const labelResult = (await labelService.getLabelByName(name)) as any[]
    if (!labelResult.length) {
      const result = (await labelService.create(name)) as OkPacket
      newLabels.push({ id: result.insertId, name })
    } else {
      newLabels.push(labelResult[0])
    }
  }

  ctx.request.body.labels = newLabels

  await next()
}

export { verifyLabelExists, verifyEveryLabelExists }
