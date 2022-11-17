import formidable from "formidable"
import fs from "fs/promises"
import path from "path"

export const config = {
	api: {
		bodyParser: false,
	},
}

const readFile = (req, saveLocaly) => {
	const options = {}
	if (saveLocaly) {
		options.uploadDir = path.join(process.cwd(), "/public/uploads")
		options.filename = (name, ext, path, form) => {
			return Date.now().toString() + "_" + path.originalFilename
		}
	}
	const form = formidable(options)
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err)
			resolve({ fields, files })
		})
	})
}

const handler = async (req, res) => {
	//!proveri sutra zasto ovo ne radi - https://nodejs.org/api/fs.html#fsreaddirpath-options-callback
	//! https://stackoverflow.com/questions/72432428/i-am-getting-cb-argument-error-when-i-run-the-code
	try {
		await fs.readdir(path.join(process.cwd() + "/public", "/uploads"))
	} catch (error) {
		await fs.mkdir(path.join(process.cwd() + "/public", "/uploads"))
	}
	await readFile(req, true)
	res.json({ done: "ok" })
}

export default handler
