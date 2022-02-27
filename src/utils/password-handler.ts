import crypto from "crypto" //node original

const md5password = (password: string) => {
  //md5加密算法，返回对象
  const md5 = crypto.createHash("md5")
  // 返回16进制字符串
  const result = md5.update(password).digest("hex")

  return result
}

export { md5password }
