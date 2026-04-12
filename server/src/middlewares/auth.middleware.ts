import type { Context, Next } from 'hono'
import { verifyToken } from '../utils/jwt'

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ message: 'Unauthorized: No token provided' }, 401)
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    c.set('user', decoded)

    await next()
  } catch (error) {
    return c.json({ message: 'Unauthorized: Invalid token' }, 401)
  }
}