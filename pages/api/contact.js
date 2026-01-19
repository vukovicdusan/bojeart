
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const data = req.body;

  // honeypot
  if (data.website) return res.status(200).json({ success: true });

  if (!data.email || !data.message) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    if (!process.env.BREVO_API_KEY) {
      return res.status(500).json({ message: "Missing BREVO_API_KEY env var" });
    }
    if (!process.env.FROM_EMAIL || !process.env.TO_EMAIL) {
      return res.status(500).json({ message: "Missing FROM_EMAIL or TO_EMAIL env var" });
    }

    const payload = {
      sender: { email: process.env.FROM_EMAIL, name: "Website" },
      to: [
  			{ email: "dusan.v.vukovic@gmail.com" },
  			{ email: "bojansavic011@gmail.com" },
	],
      replyTo: { email: data.email },
      subject: "Bojeart.com kontakt forma: nova poruka za Bojana i Jelenu",
      htmlContent: `
        <h2>Nova poruka sa sajta bojeart.com</h2>
        <p><b>Email:</b> ${data.email}</p>
        <p>${String(data.message).replaceAll("\n", "<br/>")}</p>
      `,
    };

    const resp = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await resp.text(); // read once
    if (!resp.ok) {
      console.log("Brevo error:", resp.status, text);
      return res.status(resp.status).json({ message: text });
    }

    // If OK, Brevo returns JSON. But sometimes it's safer to just return success.
    return res.status(200).json({ success: true, brevo: text });
  } catch (err) {
    console.log("Server error:", err);
    return res.status(500).json({ message: err?.message || "Send failed" });
  }
}

