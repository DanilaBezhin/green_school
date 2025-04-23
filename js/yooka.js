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
                        download_link: "https://disk.yandex.ru/d/5_kc0L5PYaY4Bw"
                    }).then(() => {
                        console.log("Письмо отправлено");
                    
                        // Удаляем email с сервера
                        fetch("https://redfox69.pythonanywhere.com/delete-email", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ email: data.email })
                        }).then(res => res.json())
                          .then(resp => {
                              if (resp.status === "deleted") {
                                  console.log("Email успешно удалён");
                              } else {
                                  console.warn("Email не был удалён:", resp);
                              }
                          }).catch(err => {
                              console.error("Ошибка при удалении email:", err);
                          });
                    
                    }).catch(err => {
                        console.error("Ошибка отправки:", err);
                    });
                }
            });
    }, 5000); 
});