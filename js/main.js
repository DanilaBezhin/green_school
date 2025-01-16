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
    glide.mount();
});
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phoneNumber');
    const countryCode = document.getElementById('countryCode');
    function applyMask() {
        const selectedOption = countryCode.options[countryCode.selectedIndex];
        const mask = selectedOption.getAttribute('data-mask');
        Inputmask({ mask: mask, placeholder: '_' }).mask(phoneInput);
    }
    applyMask();
    countryCode.addEventListener('change', function () {
        phoneInput.value = '';
        applyMask();
    });
});
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const checkboxes = document.querySelectorAll('input[name="contact"]');
    const isChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    if (!isChecked) {
        alert('Пожалуйста, выберите хотя бы один способ связи!');
        return;
    }
    const serviceID = 'green_school_service_id';
    const templateID = 'template_05wdj4x';
    const selectedCheckboxes = document.querySelectorAll('input[name="contact"]:checked');
    let contactChoices = [];
    selectedCheckboxes.forEach((checkbox) => contactChoices.push(checkbox.value));
    let contactField = document.querySelector('input[name="contact"]');
    if (!contactField) {
        contactField = document.createElement('input');
        contactField.type = 'hidden';
        contactField.name = 'contact';
        this.appendChild(contactField);
    }
    contactField.value = contactChoices.join(', ');
    emailjs.sendForm(serviceID, templateID, this).then(
        () => {
            alert('Сообщение успешно отправлено!');
            this.reset();
        },
        (error) => {
            console.error('Ошибка отправки:', error);
            alert(`Ошибка отправки:${error.text || 'Попробуйте еще раз.'}`);
        },
    );
});
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
function preventScroll(event) {
    event.preventDefault();
}
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        enableScroll();
        preloader.style.opacity = '0';
        preloader.addEventListener('transitionend', () => preloader.remove());
    }, 0);
    disableScroll();
    AOS.init();
});
