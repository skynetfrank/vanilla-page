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
