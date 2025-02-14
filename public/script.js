document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();  // 🔥 БЕЗ ЭТОГО страница перезагрузится!

    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    try {
        const response = await fetch("https://my-portfolio-94a3.onrender.com/send", {  // 🔥 ВАЖНО: полный URL!
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message);  // 🔥 Показываем уведомление пользователю
    } catch (error) {
        console.error("Ошибка запроса:", error);
        alert("Ошибка отправки формы. Попробуйте снова!");
    }
});
