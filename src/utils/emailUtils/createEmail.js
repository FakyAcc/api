export const createEmail = (token) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Learnovate Account Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; text-align: center;">
      <header style="background-color: #0077b6; color: #ffffff; padding: 20px;">
          <h1>Learnovate Account Verification</h1>
      </header>
      <main style="padding: 20px;">
          <p>Dear User,</p>
          <p>Thank you for signing up with Learnovate. To complete your registration, please click the button below to verify your account:</p>
          <a href="http://127.0.0.1:8080/api/v1/auth/verify?token=${token}" style="background-color: #0077b6; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 20px;">Verify My Account</a>
      </main>
      <footer style="background-color: #f0f0f0; padding: 10px;">
          <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:support@learnovate.com">support@learnovate.com</a>.</p>
      </footer>
  </body>
  </html>
  `;
};
