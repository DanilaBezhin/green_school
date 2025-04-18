// --- Бургер-меню ---
const burger = document.querySelector('.burgermenu');
const menu = document.querySelector('.header-menu');
burger.addEventListener('click', function () {
    this.classList.toggle('active');
    menu.classList.toggle('active');
});

// --- Аккордеоны ---
const accordion_items_py = document.querySelectorAll(
    '.section2-accordion-py .section2-accordion-item',
);
accordion_items_py.forEach((item) => {
    item.addEventListener('click', function () {
        accordion_items_py.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
    });
});
const accordion_items_sc = document.querySelectorAll(
    '.section2-accordion-sc .section2-accordion-item',
);
accordion_items_sc.forEach((item) => {
    item.addEventListener('click', function () {
        accordion_items_sc.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
    });
});

// --- Кнопка "Вверх" ---
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    let scrollPos = window.scrollY,
        innerH = window.innerHeight;
    if (scrollPos > innerH) {
        arrowUp.classList.add('active');
    } else {
        arrowUp.classList.remove('active');
    }
});
arrowUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Блокировка и разблокировка скролла ---
function preventScroll(e) {
    e.preventDefault();
}
function disableScroll() {
    document.body.classList.add('no-scroll');
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
}
function enableScroll() {
    document.body.classList.remove('no-scroll');
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
}

// --- Слайдеры ---
document.addEventListener('DOMContentLoaded', () => {
    // Glide primary
    const glidePrimary = document.querySelector('.glide-primary');
    if (glidePrimary) {
        new Glide(glidePrimary, {
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
        }).mount();
    }

    // Glide secondary
    const glideSecondary = document.querySelector('.glide-secondary');
    if (glideSecondary) {
        new Glide(glideSecondary, {
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
        }).mount();
    }
});

// --- Маска номера телефона ---
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phoneNumber');
    const countryCode = document.getElementById('countryCode');
    if (phoneInput && countryCode) {
        function applyMask() {
            const selected = countryCode.options[countryCode.selectedIndex];
            const mask = selected.getAttribute('data-mask');
            Inputmask({ mask: mask, placeholder: '_' }).mask(phoneInput);
        }
        applyMask();
        countryCode.addEventListener('change', function () {
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

// --- Прелоадер (и управление скроллом) ---
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        disableScroll();
        setTimeout(() => {
            preloader.style.opacity = '0';

            // После исчезновения прелоадера — убираем его и включаем скролл
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
                enableScroll();
                AOS.init();
            });
        }, 700);
    } else {
        AOS.init();
    }
});
