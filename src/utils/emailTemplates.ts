export const forgetPasswordEmailTemplate = `
    <div
      style="
        font-family: Arial, sans-serif;
        padding: 16px;
        background-color: #f9f9f9;
        border: 0.5px solid #ddd;
        border-radius: 1px;
      "
    >
      <p style="font-size: 18px; font-weight: bold">
        Nodemailer password reset
      </p>
      <p style="font-size: 15px; font-weight: normal">Dear {user},</p>
      <p style="font-size: 14px; font-weight: normal">
        We’ve received your request to reset your password. Please click the
        link below to complete the reset-
      </p>
      <a
        href="{resetLink}"
        style="
          display: inline-block;
          font-size: 13px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        "
      >
        Reset Password
      </a>

      <p style="font-size: 14px; font-weight: normal; margin-top: 18px">
        This link is valid for a single use and expires in 24 hours.
      </p>
      <p style="font-size: 14px; font-weight: normal">
        Please ignore this email if you did not initiate this change. If you
        need additional assistance, please contact
        <a href="mailto:help@nodemailer.com">help@nodemailer.com</a>.
      </p>

      <p style="font-size: 15px; font-weight: normal; margin-top: 5px">
        Thank you.
      </p>
      <div
        style="
          padding: 14px 0;
          font-size: 12px;
          border-top: 0.5px solid #ddd;
          color: #888;
        "
      >
        © 2025 Nodemailer Inc. All Rights Reserved.
      </div>
    </div>
  `;

export const verificationEmailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #007bff;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color: #007bff;
              background: #e8f5e9;
              border: 1px dashed #007bff;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Hello {user},</p>
              <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you did not create an account, no further action is required. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
