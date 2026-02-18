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

// Simple health check endpoint to keep the server awake
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Endpoint to handle form submission
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received form submission: Name - ${name}, Email - ${email}`);

  // Check if credentials exist before trying to send
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('SERVER FATAL: Missing EMAIL_USER or EMAIL_PASS in environment variables.');
    return res.status(500).json({ success: false, message: 'Server Error: Email credentials are missing.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS.replace(/\s+/g, ''), // Your Gmail App Password (removes spaces)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Gmail requires the email to be sent FROM your account
    to: 'kaluonyemadavid@gmail.com', // Your receiving email
    replyTo: email, // This ensures when you click "Reply," it goes to the visitor
    subject: `Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
  };

  try {
    console.log('Attempting to send email via nodemailer...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully! Message ID:', info.messageId);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('NODEMAILER ERROR:', error);
    res.status(500).json({ success: false, message: 'Server failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});