const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// 🔥 Раздаём статические файлы (если фронтенд лежит вместе с сервером)
app.use(express.static(path.join(__dirname, "public")));

// 📌 Главная страница (если просто заходят на сайт)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
        to: "your-email@gmail.com",
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
