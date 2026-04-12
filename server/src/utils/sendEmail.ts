import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, subject: string, html: string) => {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) {
    throw new Error('Email credentials are missing in environment variables')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  })

  await transporter.sendMail({
    from: `"CareNow" <${user}>`,
    to,
    subject,
    html,
  })
}