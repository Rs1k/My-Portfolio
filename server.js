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

app.post("/send", (req, res) => {
    console.log("Запрос пришел!", req.body);  // Вывод в логи
    res.json({ message: "Запрос получен!" }); // Отправка ответа
});


app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
