require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // IMPORTANT: Use environment variables for security.
  // Create a .env file in your root directory with your credentials.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '', // Your Gmail App Password (removes spaces)
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'kaluonyemadavid@gmail.com', // Your receiving email
    subject: 'New Message from Portfolio Contact Form',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});