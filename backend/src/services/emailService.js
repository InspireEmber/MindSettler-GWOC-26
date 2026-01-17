const SibApiV3Sdk = require('@getbrevo/brevo');

// Initialize Brevo API client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Sender email - Must be the email you signed up with in Brevo
const FROM_EMAIL = process.env.EMAIL_USER || 'tirthsutariya49@gmail.com';

exports.sendWelcomeEmail = async (userEmail, bookingDetails) => {
  if (!process.env.BREVO_API_KEY) {
    console.warn('Email service skipped: BREVO_API_KEY not set in environment');
    return;
  }

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Welcome to MindSettler - Booking Received";
  sendSmtpEmail.htmlContent = `
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
          <p style="margin: 5px 0;"><strong>Price:</strong> ₹749</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #d97706;">Pending Review</span></p>
        </div>
        <p>Stay mindful,<br><strong>Team MindSettler</strong></p>
      </div>
    `;
  sendSmtpEmail.sender = { "name": "MindSettler", "email": FROM_EMAIL };
  sendSmtpEmail.to = [{ "email": userEmail }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Welcome email sent to ${userEmail} via Brevo`, data.body);
  } catch (error) {
    console.error('Error sending welcome email via Brevo:', error.response ? error.response.body : error.message);
  }
};

exports.sendPaymentConfirmationEmail = async (userEmail, paymentDetails) => {
  if (!process.env.BREVO_API_KEY) return;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Payment Confirmed - MindSettler";
  sendSmtpEmail.htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #059669;">Payment Successful</h2>
        <p>Hello,</p>
        <p>Your payment for the session on <strong>${paymentDetails.date}</strong> has been verified. Your appointment is now officially confirmed.</p>
        <div style="background: #f0fdf4; padding: 25px; border-radius: 15px; margin: 25px 0; border: 1px solid #bbf7d0;">
          <h3 style="margin-top: 0; color: #065f46; font-size: 16px;">Payment Summary:</h3>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ₹749</p>
          <p style="margin: 5px 0;"><strong>Method:</strong> ${paymentDetails.method.toUpperCase()}</p>
          ${paymentDetails.reference ? `<p style="margin: 5px 0;"><strong>Ref No:</strong> ${paymentDetails.reference}</p>` : ''}
        </div>
        <p>Warmly,<br><strong>Team MindSettler</strong></p>
      </div>
    `;
  sendSmtpEmail.sender = { "name": "MindSettler", "email": FROM_EMAIL };
  sendSmtpEmail.to = [{ "email": userEmail }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Payment email sent to ${userEmail} via Brevo`, data.body);
  } catch (error) {
    console.error('Error sending payment email via Brevo:', error.response ? error.response.body : error.message);
  }
};

exports.sendSessionConfirmationEmail = async (userEmail, sessionDetails) => {
  if (!process.env.BREVO_API_KEY) return;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Session Confirmed - MindSettler";
  sendSmtpEmail.htmlContent = `
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
          <p style="margin: 5px 0;"><strong>Price:</strong> ₹749</p>
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
    `;
  sendSmtpEmail.sender = { "name": "MindSettler", "email": FROM_EMAIL };
  sendSmtpEmail.to = [{ "email": userEmail }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Session email sent to ${userEmail} via Brevo`, data.body);
  } catch (error) {
    console.error('Error sending session email via Brevo:', error.response ? error.response.body : error.message);
  }
};

exports.sendPasswordResetEmail = async (userEmail, resetUrl) => {
  if (!process.env.BREVO_API_KEY) return;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Password Reset Request - MindSettler";
  sendSmtpEmail.htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #3F2965;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You requested a password reset. Please click the link below to reset your password. This link will expire in 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #eeb9ff; color: #2E2A36; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 12px; color: #666;">Or copy and paste this link into your browser:</p>
        <p style="font-size: 12px; color: #666; word-break: break-all;"><a href="${resetUrl}" style="color: #666;">${resetUrl}</a></p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Warmly,<br><strong>Team MindSettler</strong></p>
      </div>
    `;
  sendSmtpEmail.sender = { "name": "MindSettler", "email": FROM_EMAIL };
  sendSmtpEmail.to = [{ "email": userEmail }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Password reset email sent to ${userEmail} via Brevo`, data.body);
  } catch (error) {
    console.error('Error sending password reset email via Brevo:', error.response ? error.response.body : error.message);
  }
};
