import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth.middleware'
import { Booking } from '../models/booking.model'
import { User } from '../models/user.model'

const patientRoute = new Hono()

patientRoute.get('/dashboard', authMiddleware, async (c) => {
  try {
    const authUser = c.get('user')

    const patient = await User.findById(authUser.userId)

    if (!patient) {
      return c.json({ message: 'User not found' }, 404)
    }

    const bookings = await Booking.find({ patient: authUser.userId })
      .populate('professional', 'name')
      .sort({ createdAt: -1 })

    const upcomingBookings = bookings.filter((b) => b.status === 'upcoming')
    const completedBookings = bookings.filter((b) => b.status === 'completed')

    const totalSpent = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0)

    const ratingsGiven = bookings.filter((b) => typeof b.rating === 'number')
    const avgRatingGiven =
      ratingsGiven.length > 0
        ? (
            ratingsGiven.reduce((sum, booking) => sum + (booking.rating || 0), 0) /
            ratingsGiven.length
          ).toFixed(1)
        : '0'

    return c.json({
      user: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        role: patient.role,
        governorate: patient.governorate,
      },
      stats: {
        upcomingVisits: upcomingBookings.length,
        completed: completedBookings.length,
        avgRatingGiven,
        totalSpent,
      },
      upcomingBookings,
    })
  } catch (error) {
    console.error('Patient dashboard error:', error)
    return c.json({ message: 'Internal server error' }, 500)
  }
})

export default patientRoute