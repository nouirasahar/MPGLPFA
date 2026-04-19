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

    const earnings = completedBookings.reduce(
      (sum, booking) => sum + (booking.price || 0),
      0
    )

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
        specialty: professional.specialty,
        price: professional.price,
        verificationStatus: professional.verificationStatus,
        detectedRole: professional.detectedRole,
        isVerified: professional.isVerified,
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

professionalRoute.post('/complete-profile', async (c) => {
  try {
    const body = await c.req.json()

    const {
      email,
      specialty,
      price,
      verificationStatus,
      detectedRole,
    } = body

    const professional = await User.findOne({ email })

    if (!professional) {
      return c.json({ message: 'User not found' }, 404)
    }

    professional.specialty = specialty
    professional.price = Number(price)
    professional.verificationStatus = verificationStatus
    professional.detectedRole = detectedRole
    professional.isVerified = verificationStatus === 'BASIC_VERIFIED'

    await professional.save()

    return c.json({
      success: true,
      message: 'Professional profile saved successfully',
      user: {
        id: professional._id,
        name: professional.name,
        email: professional.email,
        role: professional.role,
        governorate: professional.governorate,
        specialty: professional.specialty,
        price: professional.price,
        verificationStatus: professional.verificationStatus,
        detectedRole: professional.detectedRole,
        isVerified: professional.isVerified,
      },
    })
  } catch (error: any) {
    console.error('Complete profile error:', error)
    return c.json(
      {
        message: error?.message || 'Internal server error',
      },
      500
    )
  }
})

export default professionalRoute