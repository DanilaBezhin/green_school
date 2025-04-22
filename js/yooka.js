document.getElementById('payment-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Предотвращаем обычное поведение формы

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('https://redfox69.pythonanywhere.com/pay', {
            // Убедитесь, что адрес соответствует вашему URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Сервер вернул ошибку: ' + response.statusText);
        }

        const result = await response.json();
        // Перенаправляем на страницу подтверждения оплаты
        window.location.href = result.confirmation_url; 
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при оплате: ' + error.message);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        fetch("https://redfox69.pythonanywhere.com/get-latest-email")
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    emailjs.send("green_school_service_id", "template_cxd1gjc", {
                        user_email: data.email,
                        download_link: "https://danilabezhin.github.io/green_school/download/book.rar"
                    }).then(() => {
                        console.log("Письмо отправлено");
                    }).catch(err => {
                        console.error("Ошибка отправки:", err);
                    });
                }
            });
    }, 5000); 
});