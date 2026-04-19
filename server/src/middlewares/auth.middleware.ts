import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import jwt from 'jsonwebtoken'

export const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, 'token')

    if (!token) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string
      email: string
      role: string
    }

    c.set('user', decoded)

    await next()
  } catch (error) {
    return c.json({ message: 'Invalid or expired token' }, 401)
  }
})