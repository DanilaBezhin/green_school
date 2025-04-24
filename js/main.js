// --- Бургер-меню ---
const burger = document.querySelector('.burgermenu');
const menu = document.querySelector('.header-menu');
burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu?.classList.toggle('active');
});

// --- Аккордеоны ---
const setAccordion = (selector) => {
    const items = document.querySelectorAll(`${selector} .section2-accordion-item`);
    items.forEach((item) =>
        item.addEventListener('click', () => {
            items.forEach((el) => el.classList.remove('active'));
            item.classList.add('active');
        }),
    );
};
setAccordion('.section2-accordion-py');
setAccordion('.section2-accordion-sc');

// --- Кнопка "Вверх" ---
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    arrowUp?.classList.toggle('active', window.scrollY > window.innerHeight);
});
arrowUp?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Блокировка и разблокировка скролла ---
const preventScroll = (e) => e.preventDefault();
const disableScroll = () => {
    document.body.classList.add('no-scroll');
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
};
const enableScroll = () => {
    document.body.classList.remove('no-scroll');
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
};

// --- Слайдеры ---
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    const initGlide = (selector, options) => {
        const el = document.querySelector(selector);
        if (el) new Glide(el, options).mount();
    };

    initGlide('.glide-primary', {
        type: 'carousel',
        focusAt: 'center',
        perView: 6,
        gap: 10,
        autoplay: 2600,
        hoverpause: true,
        animationDuration: 1400,
        peek: { before: 100, after: 100 },
        breakpoints: {
            2200: { perView: 5 },
            1500: { perView: 4 },
            1200: { perView: 3 },
            950: { perView: 2 },
            576: { perView: 1 },
            430: { perView: 1, peek: { before: 35, after: 35 } },
            360: { perView: 1, peek: { before: 20, after: 20 } },
        },
    });

    initGlide('.glide-secondary', {
        type: 'carousel',
        focusAt: 'center',
        perView: 4,
        gap: 20,
        autoplay: 5000,
        hoverpause: true,
        animationDuration: 1400,
        peek: { before: 100, after: 100 },
        breakpoints: {
            2200: { perView: 3 },
            1400: { perView: 2 },
            1000: { perView: 1 },
            650: { perView: 1 },
            576: { perView: 1 },
            430: { perView: 1, peek: { before: 35, after: 35 } },
            360: { perView: 1, peek: { before: 20, after: 20 } },
        },
    });
});

// --- Маска номера телефона ---
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phoneNumber');
    const countryCode = document.getElementById('countryCode');
    if (phoneInput && countryCode) {
        const applyMask = () => {
            const selected = countryCode.options[countryCode.selectedIndex];
            const mask = selected?.getAttribute('data-mask');
            if (mask) {
                Inputmask({ mask, placeholder: '_' }).mask(phoneInput);
            }
        };
        applyMask();
        countryCode.addEventListener('change', () => {
            phoneInput.value = '';
            applyMask();
        });
    }
});

// --- Отправка формы ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const contacts = document.querySelectorAll('input[name="contact"]');
        const checked = Array.from(contacts).some((el) => el.checked);
        if (!checked) {
            alert('Пожалуйста, выберите хотя бы один способ связи!');
            return;
        }

        const selected = document.querySelectorAll('input[name="contact"]:checked');
        const values = Array.from(selected).map((el) => el.value);
        let hiddenInput = document.querySelector('input[name="contact"].hidden-contact');

        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'contact';
            hiddenInput.classList.add('hidden-contact');
            this.appendChild(hiddenInput);
        }

        hiddenInput.value = values.join(', ');

        emailjs.sendForm('green_school_service_id', 'template_05wdj4x', this).then(
            () => {
                alert('Сообщение успешно отправлено!');
                this.reset();
            },
            (error) => {
                console.error('Ошибка отправки:', error);
                alert(`Ошибка отправки: ${error.text || 'Попробуйте еще раз.'}`);
            },
        );
    });
}

// --- Получение email и отправка письма после оплаты ---
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://redfox69.pythonanywhere.com/get-latest-email')
        .then((res) => res.json())
        .then((data) => {
            if (data.email) {
                emailjs
                    .send('green_school_service_id', 'template_cxd1gjc', {
                        user_email: data.email,
                        download_link: 'https://disk.yandex.ru/d/5_kc0L5PYaY4Bw',
                    })
                    .then(() => {
                        console.log('Письмо отправлено');
                        return fetch('https://redfox69.pythonanywhere.com/delete-email', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: data.email }),
                        });
                    })
                    .then((res) => res.json())
                    .then((resp) => {
                        if (resp.status === 'deleted') {
                            console.log('Email успешно удалён');
                        } else {
                            console.warn('Email не был удалён:', resp);
                        }
                    })
                    .catch((err) => {
                        console.error('Ошибка при удалении email:', err);
                    });
            }
        })
        .catch((err) => {
            console.error('Ошибка при получении email:', err);
        });
});
