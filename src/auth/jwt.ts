import * as jwt from 'jsonwebtoken'
// require('dotenv').config()

const secret = process.env.JWT_SECRET
const ttl = 3600 * 4 // our JWT tokens are valid for 4 hours

interface JwtPayload {
  id: number
}

export const sign = (data: JwtPayload) =>
  jwt.sign({ data }, secret!, { expiresIn: ttl })

export const verify = (token: string): { data: JwtPayload } =>
  jwt.verify(token, secret!) as { data: JwtPayload }