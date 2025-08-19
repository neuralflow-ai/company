# Email Service Setup Guide

This guide will help you set up a working email service for your contact form. The form now supports multiple methods with automatic fallbacks.

## Quick Setup (Recommended: EmailJS)

EmailJS is free, reliable, and easy to set up. Follow these steps:

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```html
Subject: New Contact Form Submission from {{from_name}}

Hi,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}

Message:
{{message}}

---
This email was sent from your website contact form.
```

4. Note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key**

### 5. Update Environment Variables
Update your `.env` file with your EmailJS credentials:

```env
# EmailJS configuration (working alternative)
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_CONTACT_TEMPLATE=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# Your email address where form submissions will be sent
VITE_RECIPIENT_EMAIL=hello@neuralflow.cloud
```

## Fallback Methods

If EmailJS fails, the form will automatically:

1. **Try Formspree** (if configured)
2. **Open mailto link** - Opens user's email client with pre-filled message
3. **Save locally** - Stores submission data for manual processing

## Testing

1. Restart your development server: `npm run dev`
2. Fill out the contact form
3. Submit and check for success message
4. Check your email inbox for the submission

## Troubleshooting

### EmailJS Not Working?
- Check your service ID, template ID, and public key are correct
- Verify your email service is properly connected in EmailJS dashboard
- Check browser console for error messages

### Still Having Issues?
- The form will fall back to opening the user's email client
- Users can still contact you directly at hello@neuralflow.cloud
- Check the browser's local storage for saved form submissions

## Production Deployment

Make sure to set the same environment variables in your production environment (Vercel, Netlify, etc.).

## Cost

- **EmailJS**: Free tier includes 200 emails/month
- **Formspree**: Free tier includes 50 submissions/month
- **Mailto fallback**: Always free, uses user's email client

The current setup prioritizes reliability - if one method fails, it automatically tries the next one, ensuring your contact form always works!