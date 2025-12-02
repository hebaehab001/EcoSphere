import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: process.env.SMTP_SERVICE,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: process.env.SMTP_SECURE === "true",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export async function sendWelcomeEmail(to: string, name: string) {
	if (!process.env.SMTP_SERVICE || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
		console.warn("SMTP env vars missing; skipping welcome email.");
		return;
	}

	const mailOptions = {
		from: `"EcoSphere" <no-reply@ecosphere.com>`,
		to,
		subject: "Welcome to EcoSphere 🌱",
		html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Welcome to EcoSphere, ${name || "friend"}! 🌍</h2>
        <p>Thank you for joining our eco-friendly community.</p>
        <p>
          You can now explore sustainable shops, events, and more inside EcoSphere.
        </p>
        <p>We’re happy to have you on board! 💚</p>
      </div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Failed to send welcome email:", error);
	}
}

