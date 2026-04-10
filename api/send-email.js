import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { formType, data } = req.body

  if (!formType || !data) {
    return res.status(400).json({ error: 'Missing formType or data' })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  let subject = ''
  let html = ''

  switch (formType) {
    case 'consultation':
      subject = `New Consultation Request from ${data.name}`
      html = `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Meeting Format:</strong> ${data.meetingFormat}</p>
        <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
      `
      break

    case 'contact':
      subject = `New Contact Inquiry from ${data.name}`
      html = `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `
      break

    case 'referral':
      subject = `New Referral from ${data.yourName}`
      html = `
        <h2>New Referral Submission</h2>
        <h3>Referrer Details</h3>
        <p><strong>Name:</strong> ${data.yourName}</p>
        <p><strong>Email:</strong> ${data.yourEmail}</p>
        <p><strong>Phone:</strong> ${data.yourPhone}</p>
        <p><strong>City:</strong> ${data.yourCity}</p>
        <h3>Friend's Details</h3>
        <p><strong>Name:</strong> ${data.friendName}</p>
        <p><strong>Email:</strong> ${data.friendEmail}</p>
        <p><strong>Phone:</strong> ${data.friendPhone}</p>
        <p><strong>City:</strong> ${data.friendCity}</p>
      `
      break

    case 'career':
      subject = `New Career Application from ${data.name}`
      html = `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
        <p><em>Note: Resume and portfolio were uploaded via the website form.</em></p>
      `
      break

    case 'vendor':
      subject = `New Vendor Application from ${data.companyName}`
      html = `
        <h2>New Vendor Application</h2>
        <p><strong>Contact Name:</strong> ${data.name}</p>
        <p><strong>Company:</strong> ${data.companyName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Product Type:</strong> ${data.productType}</p>
        <p><strong>Website:</strong> ${data.website || 'N/A'}</p>
        <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
        <p><strong>Product Description:</strong> ${data.productDescription}</p>
      `
      break

    default:
      return res.status(400).json({ error: 'Unknown form type' })
  }

  try {
    await transporter.sendMail({
      from: `"Shrishti Realty Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: data.email || data.yourEmail || process.env.SMTP_USER,
      subject,
      html,
    })

    return res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
