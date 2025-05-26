document.getElementById('payment-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Предотвращаем обычное поведение формы

    const email = document.getElementById('email').value;
    const product_id = 'python_tasks';

    try {
        const response = await fetch('https://redfox69.pythonanywhere.com/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, product_id }), // Пока не передаём product_id
        });

        if (!response.ok) {
            throw new Error('Сервер вернул ошибку: ' + response.statusText);
        }

        const result = await response.json();
        window.location.href = result.confirmation_url; // Перенаправление на оплату
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при оплате: ' + error.message);
    }
});

// --- Получение email и отправка письма после оплаты ---
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://redfox69.pythonanywhere.com/get-unsent-emails')
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data.emails)) {
                data.emails.forEach((item) => {
                    const email = item.email; // получаем email из объекта
                    // const product_id = item.product_id; // если нужно потом
                    if (email) {
                        emailjs
                            .send('green_school_service_id', 'template_cxd1gjc', {
                                user_email: email,
                                download_link: 'https://disk.yandex.ru/d/5_kc0L5PYaY4Bw',
                            })
                            .then(() => {
                                console.log(`Письмо отправлено: ${email}`);

                                fetch('https://redfox69.pythonanywhere.com/mark-email-sent', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ email }),
                                })
                                    .then((res) => res.json())
                                    .then((resp) => {
                                        if (resp.status === 'marked') {
                                            console.log(`Email помечен как отправленный: ${email}`);
                                        } else {
                                            console.warn(
                                                `Не удалось пометить email: ${email}`,
                                                resp,
                                            );
                                        }
                                    });
                            })
                            .catch((err) => {
                                console.error(`Ошибка при отправке письма: ${email}`, err);
                            });
                    }
                });
            }
        })
        .catch((err) => {
            console.error("Ошибка получения списка email'ов:", err);
        });
});
