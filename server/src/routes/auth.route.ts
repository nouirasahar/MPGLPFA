import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model'
import { generateToken } from '../utils/jwt'

const authRoute = new Hono()

authRoute.post('/sign-up', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, password, role, governorate } = body

    if (!name || !email || !password || !role || !governorate) {
      return c.json(
        {
          message: 'Name, email, password, role, and governorate are required',
        },
        400
      )
    }

    const normalizedEmail = String(email).toLowerCase().trim()

    const existingUser = await User.findOne({ email: normalizedEmail } as any)

    if (existingUser) {
      return c.json({ message: 'User already exists' }, 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      governorate,
    })

    const token = generateToken({
      userId: String(newUser._id),
      email: newUser.email,
      role: newUser.role,
    })

    return c.json(
      {
        message: 'User registered successfully',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          governorate: newUser.governorate,
          isVerified: newUser.isVerified,
        },
      },
      201
    )
  } catch (error) {
    console.error('Sign-up error:', error)
    return c.json({ message: 'Internal server error' }, 500)
  }
})

authRoute.post('/sign-in', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body

    if (!email || !password) {
      return c.json({ message: 'Email and password are required' }, 400)
    }

    const normalizedEmail = String(email).toLowerCase().trim()

    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      return c.json({ message: 'Invalid email or password' }, 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return c.json({ message: 'Invalid email or password' }, 401)
    }

    const token = generateToken({
      userId: String(user._id),
      email: user.email,
      role: user.role,
    })

    return c.json(
      {
        message: 'User signed in successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          governorate: user.governorate,
          isVerified: user.isVerified,
        },
      },
      200
    )
  } catch (error) {
    console.error('Sign-in error:', error)
    return c.json({ message: 'Internal server error' }, 500)
  }
})

authRoute.post('/forgot-password', async (c) => {
  try {
    const body = await c.req.json()
    const { email } = body

    if (!email) {
      return c.json({ message: 'Email is required' }, 400)
    }

    return c.json(
      {
        message: 'Password reset request received',
        email,
      },
      200
    )
  } catch (error) {
    console.error('Forgot-password error:', error)
    return c.json({ message: 'Internal server error' }, 500)
  }
})

export default authRoute