import { Schema, model, models } from 'mongoose'

export type UserRole = 'patient' | 'professional'

export const tunisianGovernorates = [
  'Ariana',
  'Béja',
  'Ben Arous',
  'Bizerte',
  'Gabès',
  'Gafsa',
  'Jendouba',
  'Kairouan',
  'Kasserine',
  'Kébili',
  'Le Kef',
  'Mahdia',
  'La Manouba',
  'Médenine',
  'Monastir',
  'Nabeul',
  'Sfax',
  'Sidi Bouzid',
  'Siliana',
  'Sousse',
  'Tataouine',
  'Tozeur',
  'Tunis',
  'Zaghouan',
] as const

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['patient', 'professional'],
      default: 'patient',
    },
    governorate: {
      type: String,
      enum: tunisianGovernorates,
      required: true,
    },

    // Professional profile fields
    specialty: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    verificationStatus: {
      type: String,
      enum: ['NOT_VERIFIED', 'UNVERIFIED', 'BASIC_VERIFIED', 'REJECTED'],
      default: 'NOT_VERIFIED',
    },
    detectedRole: {
      type: String,
      default: '',
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

export const User = models.User || model('User', userSchema)