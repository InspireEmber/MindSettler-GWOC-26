const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendWelcomeEmail = async (userEmail, bookingDetails) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email service skipped: EMAIL_USER or EMAIL_PASS not set in .env');
        return;
    }

    const mailOptions = {
        from: `"MindSettler" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Welcome to MindSettler - Booking Received',
        html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 20px; color: #333; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3F2965; margin: 0; font-style: italic;">MindSettler</h1>
          <p style="color: #eeb9ff; font-weight: bold; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Your Journey Starts Here</p>
        </div>
        <h2 style="color: #3F2965;">Welcome to MindSettler!</h2>
        <p>Hi there,</p>
        <p>Thank you for taking a brave first step towards your mental well-being. We have received your booking request.</p>
        <div style="background: #fdfafd; padding: 25px; border-radius: 15px; margin: 25px 0; border: 1px solid #eeb9ff40;">
          <h3 style="margin-top: 0; color: #3F2965; font-size: 16px;">Session Overview:</h3>
          <p style="margin: 5px 0;"><strong>Mode:</strong> ${bookingDetails.sessionType.toUpperCase()}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingDetails.date}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingDetails.time}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #d97706;">Pending Review</span></p>
        </div>
        <p>Stay mindful,<br><strong>Team MindSettler</strong></p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

exports.sendPaymentConfirmationEmail = async (userEmail, paymentDetails) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

    const mailOptions = {
        from: `"MindSettler" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Payment Confirmed - MindSettler',
        html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #059669;">Payment Successful</h2>
        <p>Hello,</p>
        <p>Your payment for the session on <strong>${paymentDetails.date}</strong> has been verified. Your appointment is now officially confirmed.</p>
        <div style="background: #f0fdf4; padding: 25px; border-radius: 15px; margin: 25px 0; border: 1px solid #bbf7d0;">
          <h3 style="margin-top: 0; color: #065f46; font-size: 16px;">Payment Summary:</h3>
          <p style="margin: 5px 0;"><strong>Method:</strong> ${paymentDetails.method.toUpperCase()}</p>
          ${paymentDetails.reference ? `<p style="margin: 5px 0;"><strong>Ref No:</strong> ${paymentDetails.reference}</p>` : ''}
        </div>
        <p>Warmly,<br><strong>Team MindSettler</strong></p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Payment confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending payment email:', error);
    }
};
