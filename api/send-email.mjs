import nodemailer from 'nodemailer'

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024 // 5 MB

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { formType, data } = req.body

    if (!formType || !data) {
      return res.status(400).json({ error: 'Missing formType or data' })
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing SMTP env vars')
      return res.status(500).json({ error: 'Server email config missing' })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // ── Recipients ─────────────────────────────────────────────────
    const mailTo = process.env.MAIL_TO || process.env.SMTP_USER
    const mailCc = (process.env.MAIL_CC || '').trim()

    // ── HTML helpers ───────────────────────────────────────────────
    const header = `
      <div style="background:#1a3c2a;padding:22px 30px;border-radius:8px 8px 0 0;">
        <h1 style="margin:0;color:#c9a84c;font-family:Georgia,serif;font-size:20px;font-weight:normal;letter-spacing:1px;">
          SHRISHTI <span style="color:#ffffff;">REALTY</span>
        </h1>
        <p style="margin:5px 0 0;color:rgba(255,255,255,0.35);font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:sans-serif;">
          Website Lead Notification
        </p>
      </div>`

    const footerHtml = `
      <div style="background:#f6f4f0;padding:14px 30px;border-radius:0 0 8px 8px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;color:#9ca3af;font-size:11px;font-family:sans-serif;">
          Automated notification from <strong>shrishtirealty.com</strong>. Reply to this email to respond to the enquirer.
        </p>
      </div>`

    const wrap = (body) =>
      `<div style="max-width:600px;margin:0 auto;font-family:sans-serif;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        ${header}
        <div style="padding:28px 30px;background:#ffffff;">${body}</div>
        ${footerHtml}
      </div>`

    const row = (label, value) =>
      (value && value !== 'N/A' && value !== '—')
        ? `<tr>
            <td style="padding:8px 14px 8px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;width:150px;">${label}</td>
            <td style="padding:8px 0;color:#111827;font-size:13px;font-weight:500;">${value}</td>
           </tr>`
        : ''

    const section = (title, rows) =>
      `<h3 style="margin:20px 0 8px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;border-bottom:1px solid #f3f4f6;padding-bottom:8px;">${title}</h3>
       <table style="width:100%;border-collapse:collapse;">${rows}</table>`

    // ── Build attachment array from base64 file data ────────────────
    const buildAttachments = (files = []) => {
      const attachments = []
      for (const f of files) {
        if (!f || !f.content || !f.filename) continue
        const sizeBytes = Math.round((f.content.length * 3) / 4) // approx base64 → bytes
        if (sizeBytes > MAX_ATTACHMENT_BYTES) {
          console.warn(`Attachment "${f.filename}" exceeds 5MB limit, skipping.`)
          continue
        }
        attachments.push({
          filename: f.filename,
          content: f.content,
          encoding: 'base64',
          contentType: f.mimetype || 'application/octet-stream',
        })
      }
      return attachments
    }

    let subject = ''
    let html = ''
    let attachments = []

    switch (formType) {
      case 'consultation':
        subject = `[Consultation Request] ${data.name || 'Website Visitor'} — ${data.projectType || ''}`
        html = wrap(
          section('Enquiry Details', [
            row('Name', data.name),
            row('Email', data.email),
            row('Phone', data.phone),
            row('Project Type', data.projectType),
            row('Meeting Format', data.meetingFormat),
            row('Message', data.message || '—'),
          ].join(''))
        )
        break

      case 'contact':
        subject = `[Contact Inquiry] ${data.name || 'Website Visitor'} — ${data.inquiryType || ''}`
        html = wrap(
          section('Enquiry Details', [
            row('Name', data.name),
            row('Email', data.email),
            row('Phone', data.phone || '—'),
            row('Inquiry Type', data.inquiryType),
            row('Subject', data.subject),
            row('Message', data.message),
          ].join(''))
        )
        break

      case 'referral':
        subject = `[Referral] ${data.yourName || 'Someone'} referred ${data.friendName || 'a friend'}`
        html = wrap(
          section('Referrer Details', [
            row('Name', data.yourName),
            row('Email', data.yourEmail),
            row('Phone', data.yourPhone),
            row('City', data.yourCity),
          ].join('')) +
          section("Friend's Details", [
            row('Name', data.friendName),
            row('Email', data.friendEmail),
            row('Phone', data.friendPhone),
            row('City', data.friendCity),
          ].join(''))
        )
        break

      case 'career':
        subject = `[Career Application] ${data.name || 'Applicant'}`
        html = wrap(
          section('Applicant Details', [
            row('Name', data.name),
            row('Email', data.email),
            row('Phone', data.phone),
            row('Address', data.address || '—'),
          ].join(''))
        )
        // Attach resume and portfolio if provided
        attachments = buildAttachments([data.resumeFile, data.portfolioFile])
        break

      case 'vendor':
        subject = `[Vendor Application] ${data.companyName || 'Company'} — ${data.productType || ''}`
        html = wrap(
          section('Vendor Details', [
            row('Contact Name', data.name),
            row('Company', data.companyName),
            row('Email', data.email),
            row('Phone', data.phone),
            row('Product Type', data.productType),
            row('Website', data.website || '—'),
            row('Address', data.address || '—'),
            row('Description', data.productDescription),
          ].join(''))
        )
        // Attach brochure if provided
        attachments = buildAttachments([data.brochureFile])
        break

      default:
        return res.status(400).json({ error: 'Unknown form type' })
    }

    // ── Compose and send ───────────────────────────────────────────
    const mailOptions = {
      from: `"Shrishti Realty" <${process.env.SMTP_USER}>`,
      to: mailTo,
      replyTo: data.email || data.yourEmail || process.env.SMTP_USER,
      subject,
      html,
    }

    if (mailCc) mailOptions.cc = mailCc
    if (attachments.length > 0) mailOptions.attachments = attachments

    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true, message: 'Email sent successfully' })

  } catch (error) {
    console.error('Email error:', error.message)
    return res.status(500).json({ error: 'Failed to send email: ' + error.message })
  }
}
