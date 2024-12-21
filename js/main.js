const burger = document.querySelector('.burgermenu');
const menu = document.querySelector('.header-menu');
burger.addEventListener('click', function () {
    this.classList.toggle('active');
    menu.classList.toggle('active');
});

const accordion_items = document.querySelectorAll(
    '.section2-accordion-py .section2-accordion-item',
);

accordion_items.forEach((element) => {
    element.addEventListener('click', function () {
        accordion_items.forEach((element) => {
            element.classList.remove('active');
        });
        element.classList.add('active');
    });
});

const accordion_items_sc = document.querySelectorAll(
    '.section2-accordion-sc .section2-accordion-item',
);

accordion_items_sc.forEach((element) => {
    element.addEventListener('click', function () {
        accordion_items_sc.forEach((element) => {
            element.classList.remove('active');
        });
        element.classList.add('active');
    });
});

const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (scrollY > viewportHeight) {
        arrowUp.classList.add('active');
    } else {
        arrowUp.classList.remove('active');
    }
});

arrowUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    const glide = new Glide('.glide', {
        type: 'carousel',
        focusAt: 'center',
        perView: 6,
        gap: 10,
        autoplay: 2600,
        hoverpause: true,
        animationDuration: 1400,
        peek: {
            before: 100,
            after: 100,
        },
        breakpoints: {
            2200: { perView: 5 },
            1500: { perView: 4 },
            1200: { perView: 3 },
            950: { perView: 2 },
            576: { perView: 1 },
            430: {
                perView: 1,
                peek: {
                    before: 35,
                    after: 35,
                },
            },
            360: {
                perView: 1,
                peek: {
                    before: 20,
                    after: 20,
                },
            },
        },
    });

    glide.mount();
});

document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phoneNumber');
    const countryCode = document.getElementById('countryCode');

    // Функция для применения маски в зависимости от выбранной страны
    function applyMask() {
        const selectedOption = countryCode.options[countryCode.selectedIndex];
        const mask = selectedOption.getAttribute('data-mask');
        Inputmask({
            mask: mask,
            placeholder: '_',
        }).mask(phoneInput);
    }

    // Инициализация маски при загрузке страницы
    applyMask();

    // Смена маски при изменении кода страны
    countryCode.addEventListener('change', function () {
        phoneInput.value = ''; // Очищаем поле ввода
        applyMask();
    });
});

// БЕГУЩАЯ СТРОКА

// ОТПРАВКА ФОРМЫ

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Отключаем стандартное поведение отправки формы

    const serviceID = 'service_blyihpn'; // Укажите ID вашего сервиса
    const templateID = 'template_05wdj4x'; // Укажите ID вашего шаблона

    // Собираем данные из формы
    const formData = new FormData(this);
    const checkboxes = document.querySelectorAll('input[name="contactChoice"]:checked');
    let contactChoices = [];
    checkboxes.forEach((checkbox) => contactChoices.push(checkbox.value));
    formData.set('contactChoice', contactChoices.join(', ')); // Добавляем выбранные способы связи

    // Отправляем форму через EmailJS
    emailjs.sendForm(serviceID, templateID, formData).then(
        () => {
            alert('Сообщение успешно отправлено!');
            this.reset(); // Очистить форму
        },
        (error) => {
            console.error('Ошибка отправки:', error);
            alert('Ошибка отправки. Попробуйте еще раз.');
        },
    );
});