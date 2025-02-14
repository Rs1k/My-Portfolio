function showNotification(message, isError = false) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.background = isError ? "#dc3545" : "#28a745"; // Красный если ошибка
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000); // Убираем через 3 секунды
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("❌ Форма не найдена! Проверь `id` в `index.html`.");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: this.name.value,
            email: this.email.value,
            message: this.message.value
        };

        try {
            const response = await fetch("https://my-portfolio-94a3.onrender.com/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const result = await response.json();
            showNotification("Сообщение отправлено!", false); // ✅ Показываем уведомление

            // Очистка формы после отправки
            form.reset();
        } catch (error) {
            console.error("Ошибка запроса:", error);
            showNotification("Ошибка отправки. Попробуйте снова!", true);
        }
    });
});
