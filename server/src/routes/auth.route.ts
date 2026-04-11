import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model'

const authRoute = new Hono()

authRoute.post('/sign-up', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, password, role } = body

    if (!name || !email || !password) {
      return c.json(
        { message: 'Name, email, and password are required' },
        400
      )
    }

    const normalizedEmail = String(email).toLowerCase().trim()

    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return c.json({ message: 'User already exists' }, 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role || 'patient',
    })

    return c.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
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
      return c.json(
        { message: 'Email and password are required' },
        400
      )
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

    return c.json(
      {
        message: 'User signed in successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
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