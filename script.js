/*=============== MOSTRAR/OCULTAR MENÚ DE NAVEGACIÓN ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MOSTRAR MENÚ =====*/
/* Validar si la constante existe */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== OCULTAR MENÚ =====*/
/* Validar si la constante existe */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== CERRAR MENÚ AL HACER CLIC EN UN ENLACE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // Cuando hacemos clic en cada nav__link, eliminamos la clase show-menu
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/*=============== VALIDACIÓN DEL FORMULARIO DE CONTACTO ===============*/
const contactForm = document.getElementById('contact-form');
const formSuccessMessage = document.getElementById('form-success');

const validateField = (field) => {
    const input = document.getElementById(field.id);
    const errorElement = input.nextElementSibling;
    let valid = true;

    if (input.value.trim() === '') {
        errorElement.textContent = 'Este campo es obligatorio.';
        input.parentElement.classList.add('error');
        valid = false;
    } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
        errorElement.textContent = 'Por favor, introduce un email válido.';
        input.parentElement.classList.add('error');
        valid = false;
    } else {
        errorElement.textContent = '';
        input.parentElement.classList.remove('error');
    }
    return valid;
};

if (contactForm) {
    const fields = [
        { id: 'name', type: 'text' },
        { id: 'email', type: 'email' },
        { id: 'message', type: 'textarea' }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.addEventListener('blur', () => validateField(field));
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Aquí se podría enviar el formulario a un servidor
            console.log('Formulario enviado con éxito');
            formSuccessMessage.textContent = '¡Gracias por tu mensaje! Te contactaremos pronto.';
            formSuccessMessage.style.display = 'block';
            contactForm.reset();

            setTimeout(() => {
                formSuccessMessage.style.display = 'none';
            }, 5000);
        }
    });
}

/*=============== MODAL DE LA GALERÍA ===============*/
const galleryImages = document.querySelectorAll('.gallery-image');
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const modalArrowLeft = document.getElementById('modal-arrow-left');
const modalArrowRight = document.getElementById('modal-arrow-right');
let currentImageIndex = 0;

if (modal) {
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', (e) => {
            modal.classList.add('is-active');
            modalImage.src = image.src;
            currentImageIndex = index;
            modalImage.alt = image.alt;
        });
    });

    const closeModal = () => {
        modal.classList.remove('is-active');
    };

    modalClose.addEventListener('click', closeModal);

    // Cierra el modal si se hace clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    const changeImage = (newIndex) => {
        // 1. Desvanece la imagen actual
        modalImage.style.opacity = '0';

        // 2. Espera a que termine la transición
        setTimeout(() => {
            // 3. Cambia la fuente de la imagen
            currentImageIndex = newIndex;
            modalImage.src = galleryImages[currentImageIndex].src;
            modalImage.alt = galleryImages[currentImageIndex].alt;

            // 4. Hace aparecer la nueva imagen
            modalImage.style.opacity = '1';
        }, 200); // Debe coincidir con la duración de la transición en CSS
    };

    modalArrowLeft.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic en la flecha cierre el modal
        const newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        changeImage(newIndex);
    });

    modalArrowRight.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic en la flecha cierre el modal
        const newIndex = (currentImageIndex + 1) % galleryImages.length;
        changeImage(newIndex);
    });

    // Cierra el modal al presionar la tecla Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });
}

/*=============== ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ) ===============*/
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
    const faqHeader = item.querySelector('.faq__header');

    faqHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.faq-open');

        // Cierra el item que ya está abierto (si no es el mismo que se clickeó)
        if (openItem && openItem !== item) {
            toggleItem(openItem);
        }

        // Abre o cierra el item actual
        toggleItem(item);
    });
});

const toggleItem = (item) => {
    const faqContent = item.querySelector('.faq__content');
    item.classList.toggle('faq-open');

    if (item.classList.contains('faq-open')) {
        // Si se abre, se establece la altura máxima al alto real del contenido
        faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
    } else {
        // Si se cierra, se vuelve a 0
        faqContent.style.maxHeight = '0';
    }
};

/*=============== MOSTRAR BOTÓN SCROLL UP ===============*/
const scrollUp = () => {
    // Lógica para el botón de scroll up
    const scrollUpButton = document.getElementById('scroll-up');
    if (window.scrollY >= 400) {
        scrollUpButton.classList.add('show-scroll');
    } else {
        scrollUpButton.classList.remove('show-scroll');
    }

    // Lógica para el cambio de fondo del header
    const header = document.querySelector('.header');
    // Cuando el scroll es mayor a 50 de altura del viewport, añade la clase scroll-header
    if (window.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');

    // Lógica para resaltar el enlace del menú activo (Scrollspy)
    highlightMenu();

    // Lógica para revelar elementos al hacer scroll
    revealElementsOnScroll();
}

const highlightMenu = () => {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // Un pequeño offset
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

/*=============== REVEAL ELEMENTS ON SCROLL ===============*/
// Selecciona todos los elementos que queremos animar (en este caso, las tarjetas de servicio)
const revealElements = document.querySelectorAll('.service-card');

// Función para verificar si un elemento está en el viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    // Retorna true si el elemento está al menos parcialmente visible
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
    );
};

// Función para revelar elementos al hacer scroll
const revealElementsOnScroll = () => {
    revealElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('revealed');
        }
        // Opcional: Si quieres que la animación se repita cada vez que el elemento entra/sale del viewport,
        // puedes añadir un 'else' para remover la clase 'revealed' cuando sale.
        // else {
        //     el.classList.remove('revealed');
        // }
    });
};


// Carga Font Awesome de forma asíncrona
function loadFontAwesome() {
    var script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/tu-kit-id.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
}

// Llama a las funciones cuando la página se carga
window.addEventListener('load', () => {
    loadFontAwesome(); // Carga Font Awesome
    revealElementsOnScroll(); // Revela elementos que ya están en el viewport al cargar
});

// También llama a revealElementsOnScroll en cada evento de scroll
window.addEventListener('scroll', scrollUp);
