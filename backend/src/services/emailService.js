const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Add these for better debugging on the server
  logger: true,
  debug: true,
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

exports.sendSessionConfirmationEmail = async (userEmail, sessionDetails) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const mailOptions = {
    from: `"MindSettler" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Session Confirmed - MindSettler',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 20px; color: #333; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3F2965; margin: 0; font-style: italic;">MindSettler</h1>
          <p style="color: #eeb9ff; font-weight: bold; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Your Journey Starts Here</p>
        </div>
        <h2 style="color: #3F2965;">Your Session is Confirmed!</h2>
        <p>Hi there,</p>
        <p>Great news! Your session with MindSettler has been confirmed. We are looking forward to supporting you on your journey.</p>
        <div style="background: #fdfafd; padding: 25px; border-radius: 15px; margin: 25px 0; border: 1px solid #eeb9ff40;">
          <h3 style="margin-top: 0; color: #3F2965; font-size: 16px;">Session Details:</h3>
          <p style="margin: 5px 0;"><strong>Mode:</strong> ${sessionDetails.sessionType.toUpperCase()}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${sessionDetails.date}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${sessionDetails.time}</p>
          ${sessionDetails.meetingLink ? `<p style="margin: 5px 0;"><strong>Meeting Link:</strong> <a href="${sessionDetails.meetingLink}" style="color: #DD1764;">Join Session</a></p>` : ''}
        </div>
        
        ${sessionDetails.paymentMethod === 'upi' || sessionDetails.sessionType === 'online' ? `
        <div style="background: #fdfafd; padding: 25px; border-radius: 15px; margin: 25px 0; border: 1px solid #eeb9ff40;">
          <h3 style="margin-top: 0; color: #3F2965; font-size: 16px;">Payment Information:</h3>
          <p>To finalize your booking, please complete the payment using UPI. You can scan the QR code below:</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3Dmindsettler%40upi%26pn%3DMindSettler" alt="Payment QR Code" style="border-radius: 10px; border: 5px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          </div>

          <div style="font-size: 18px; color: #3F2965; font-weight: bold; text-align: center; background: #fff; padding: 10px; border-radius: 10px; border: 1px dashed #eeb9ff; margin: 15px 0;">
            mindsettler@upi
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 10px;">Please share the transaction reference number on your booking status page for faster verification.</p>
        </div>
        ` : `
        <div style="background: #fdfafd; padding: 25px; border-radius: 15px; margin: 25px 0; border: 1px solid #eeb9ff40;">
          <h3 style="margin-top: 0; color: #3F2965; font-size: 16px;">Payment Information:</h3>
          <p>Since you chose offline payment, you can pay via cash at the time of the session or use UPI during the meeting.</p>
        </div>
        `}

        <p>If you have any questions, feel free to reach out to us.</p>
        <p>Stay mindful,<br><strong>Team MindSettler</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Session confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending session confirmation email:', error);
  }
};

