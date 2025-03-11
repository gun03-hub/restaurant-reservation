import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.to,
      subject: data.subject,
      html: `
        <h1 style="color: #000; font-size: 24px;">Reservation Confirmation</h1>
        <p>Dear ${data.reservation.name},</p>
        <p>Your reservation has been confirmed!</p>
        <h2 style="color: #000; font-size: 20px;">Details:</h2>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin: 10px 0;">📅 Date: ${data.reservation.date}</li>
          <li style="margin: 10px 0;">⏰ Time: ${data.reservation.time}</li>
          <li style="margin: 10px 0;">👥 Guests: ${data.reservation.guests}</li>
          <li style="margin: 10px 0;">🪑 Table: ${data.reservation.tableId}</li>
          <li style="margin: 10px 0;">🎫 Confirmation Number: ${data.reservation.confirmationNumber}</li>
        </ul>
        ${data.reservation.specialRequests ? `<p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">✏️ Special Requests: ${data.reservation.specialRequests}</p>` : ''}
        <p style="margin-top: 20px; font-weight: bold;">Thank you for choosing Fine Dining!</p>
      `
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}