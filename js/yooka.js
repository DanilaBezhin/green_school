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
                data.emails.forEach((email) => {
                    if (email) {
                        emailjs
                            .send('green_school_service_id', 'template_cxd1gjc', {
                                user_email: email,
                                download_link: 'https://disk.yandex.ru/d/5_kc0L5PYaY4Bw',
                            })
                            .then(() => {
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
function parseTimeString(timeString) {
    const parts = timeString.match(/(\d+):(\d+):(\d+)/);
    if (!parts) return null;
    const [, h, m, s] = parts.map(Number);
    return h * 3600 + m * 60 + s;
}

// Возвращает начальное значение таймера в секундах (1 день 2 часа 15 минут)
function getInitialTimerSeconds() {
    const days = 1; // 1 день = 24 часа
    const hours = 2; // +2 часа
    const minutes = 15; // +15 минут
    return days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60;
}

function startTimerFrom(seconds) {
    const display = document.getElementById('discount-timer');
    let timer = seconds;
    let firstTick = true;

    const interval = setInterval(() => {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const secondsLeft = timer % 60;

        const formatted = `Осталось: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0',
        )}:${String(secondsLeft).padStart(2, '0')}`;
        display.textContent = formatted;

        if (firstTick) {
            display.classList.add('show');
            firstTick = false;
        }

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = 'Скоро вернём скидку...';

            // Перезапускаем таймер с новым значением (1 день 2 часа 15 минут)
            const newEndTime = Date.now() + getInitialTimerSeconds() * 1000;
            localStorage.setItem('discountEndsAt', newEndTime);
            startTimerFrom(getInitialTimerSeconds());
        }
    }, 1000);
}

window.onload = () => {
    const display = document.getElementById('discount-timer');
    const savedEndTime = localStorage.getItem('discountEndsAt');

    if (savedEndTime) {
        const timeLeft = Math.floor((+savedEndTime - Date.now()) / 1000);
        if (timeLeft > 0) {
            startTimerFrom(timeLeft);
        } else {
            // Перезапускаем таймер с начальным значением (1 день 2 часа 15 минут)
            const newEndTime = Date.now() + getInitialTimerSeconds() * 1000;
            localStorage.setItem('discountEndsAt', newEndTime);
            startTimerFrom(getInitialTimerSeconds());
        }
    } else {
        const htmlText = display.dataset.start;
        const seconds = parseTimeString(htmlText);
        if (seconds !== null) {
            const endAt = Date.now() + seconds * 1000;
            localStorage.setItem('discountEndsAt', endAt);
            startTimerFrom(seconds);
        }
    }
};
