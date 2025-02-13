document.getElementById("contact-form").addEventListener("submit", async function (e) {
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

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert("Ошибка отправки!");
    }
});
