const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => 
    console.log(`Сервер запущен на порту ${PORT}`)
);

app.use(express.json());
app.use(cors());

app.use(cors({ origin: "*" }));

// 🔥 Раздаём статические файлы (если фронтенд лежит вместе с сервером)
app.use(express.static(path.join(__dirname, "public")));

// 📌 Главная страница (если просто заходят на сайт)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/send", async (req, res) => {
    console.log("POST /send received"); // ЛОГИРОВАНИЕ для проверки

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Все поля обязательны!" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rostiksmoliar@gmail.com",
            pass: "apxjygmczfjthxwt"
        }
    });

    const mailOptions = {
        from: `"${name}" <rostiksmoliar@gmail.com>`,  // ✅ Gmail разрешает только ТВОЙ email
        to: "rostiksmoliar@gmail.com",  // ✅ Письмо приходит тебе
        subject: "Новое сообщение с сайта",
        text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,  // ✅ Email пользователя внутри письма
        replyTo: email  // ✅ Теперь "Ответить" отправит письмо пользователю
        };


    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Сообщение отправлено!" });
    } catch (error) {
        console.error("Ошибка отправки:", error);
        res.status(500).json({ message: "Ошибка отправки", error });
    }
});
