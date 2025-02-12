const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password"
        }
    });

    const mailOptions = {
        from: email,
        to: "rostiksmoliar@gmail.com",
        subject: "Новое сообщение с сайта",
        text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Сообщение отправлено!" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка отправки", error });
    }
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
