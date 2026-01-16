import { mailOptions, transporter } from "../../config/nodemailer"

const handler = async (req, res) => {
	if (req.method === "POST") {
		const data = req.body
		// if (!data.email || !data.message) {
		// 	return res.status(400).json({ message: "Bad request" })
		// }
		if(data.website){
			return res.status(200).json({ message: "Email Sent. Thank you for your message! I will get back to you ASAP!" })
		}

		try {
			await transporter.sendMail({
				...mailOptions,
				subject: `Poruka za Bojana i Jelenu od ${data.email}`,
				html: `<h1>Poruka za Bojana i Jelenu od ${data.email}</h1><p>${data.message}</p>`,
			})
			return res.status(200).json({ success: true })
		} catch (err) {
			console.log(err)
			return res.status(400).json({ message: err.message })
		}
	}
	res.status(400).json({ message: "Bad Request" })
}

export default handler
