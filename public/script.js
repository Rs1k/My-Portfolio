document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Форма не найдена!");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();  // 🔥 Останавливаем перезагрузку страницы

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
            alert(result.message);
        } catch (error) {
            console.error("Ошибка запроса:", error);
            alert("Ошибка отправки формы. Попробуйте снова!");
        }
    });
});
