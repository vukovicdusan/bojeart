import { mailOptions, transporter } from "../../config/nodemailer";

const handler = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const data = req.body;

  // honeypot
  if (data.website) {
    return res.status(200).json({ success: true });
  }

  // basic validation (bring this back)
  if (!data.email || !data.message) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `Kontakt forma: nova poruka`,
      replyTo: data.email, // <-- important: user email goes here
      html: `
        <h2>Nova poruka sa sajta</h2>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Poruka:</b></p>
        <p>${String(data.message).replaceAll("\n", "<br/>")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err?.message || "Send failed" });
  }
};

export default handler;
