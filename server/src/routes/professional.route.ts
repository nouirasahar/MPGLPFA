import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth.middleware'
import { Booking } from '../models/booking.model'
import { User } from '../models/user.model'

const professionalRoute = new Hono()

professionalRoute.get('/dashboard', authMiddleware, async (c) => {
  try {
    const authUser = c.get('user')

    const professional = await User.findById(authUser.userId)

    if (!professional) {
      return c.json({ message: 'User not found' }, 404)
    }

    const bookings = await Booking.find({ professional: authUser.userId })
      .populate('patient', 'name')
      .sort({ createdAt: -1 })

    const todayAppointments = bookings.filter((b) => b.status === 'upcoming')
    const completedBookings = bookings.filter((b) => b.status === 'completed')

    const uniquePatients = new Set(
      bookings.map((b: any) => String(b.patient?._id || b.patient))
    )

    const earnings = completedBookings.reduce((sum, booking) => sum + (booking.price || 0), 0)

    const ratings = bookings.filter((b) => typeof b.rating === 'number')
    const avgRating =
      ratings.length > 0
        ? (
            ratings.reduce((sum, booking) => sum + (booking.rating || 0), 0) /
            ratings.length
          ).toFixed(1)
        : '0'

    return c.json({
      user: {
        id: professional._id,
        name: professional.name,
        email: professional.email,
        role: professional.role,
        governorate: professional.governorate,
      },
      stats: {
        todayAppointments: todayAppointments.length,
        totalPatients: uniquePatients.size,
        rating: avgRating,
        earnings,
      },
      schedule: todayAppointments,
    })
  } catch (error) {
    console.error('Professional dashboard error:', error)
    return c.json({ message: 'Internal server error' }, 500)
  }
})

export default professionalRoute