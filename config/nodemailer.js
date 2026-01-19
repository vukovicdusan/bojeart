import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

// export const mailOptions = {
// 	from: email,
// 	to: to_email,
// }

export const mailOptions = {
  from: `Beojeart Website <${process.env.FROM_EMAIL}>`,
  to: process.env.TO_EMAIL,
};

