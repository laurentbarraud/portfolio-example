function toggleMenu(hamburgerSelector, navMenuSelector) {
    const hamburger = document.querySelector(hamburgerSelector);
    const navMenu = document.querySelector(navMenuSelector);

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('visible');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Filter projects by category
function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');
    projects.forEach(project => {
        const projectCategories = project.getAttribute('data-category')?.split(',') || [];
        if (category === 'all' || projectCategories.includes(category)) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}
// Example usage: filterProjects('javascript');
// To show all: filterProjects('all');

// Lightbox effect for project images
function createLightbox() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.cssText = `
        display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.8); justify-content: center; align-items: center;
    `;
    const img = document.createElement('img');
    img.style.cssText = 'max-width: 90vw; max-height: 90vh; box-shadow: 0 0 20px #000;';
    modal.appendChild(img);

    // Close on click outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.body.appendChild(modal);

    // Show modal with image
    function showLightbox(src, alt) {
        img.src = src;
        img.alt = alt || '';
        modal.style.display = 'flex';
    }

    return showLightbox;
}

// Attach lightbox to project images
function enableProjectImageLightbox() {
    const showLightbox = createLightbox();
    document.querySelectorAll('#projects article img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            showLightbox(img.src, img.alt);
        });
    });
}

// Initialize lightbox after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    enableProjectImageLightbox();

    // Contact form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const message = contactForm.querySelector('[name="message"]');
            let valid = true;
            let errorMsg = '';

            if (!name || !name.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your name.\n';
            }
            // Remove any previous email error message
            const emailError = contactForm.querySelector('.email-error');
            if (emailError) emailError.remove();

            if (!email || !email.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your email.\n';
                const errorElem = document.createElement('div');
                errorElem.className = 'email-error';
                errorElem.style.color = 'red';
                errorElem.textContent = 'Please enter your email.';
                if (email && email.parentNode) {
                    email.parentNode.insertBefore(errorElem, email.nextSibling);
                }
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                valid = false;
                errorMsg += 'Please enter a valid email address.\n';
                const errorElem = document.createElement('div');
                errorElem.className = 'email-error';
                errorElem.style.color = 'red';
                errorElem.textContent = 'Please enter a valid email address.';
                if (email && email.parentNode) {
                    email.parentNode.insertBefore(errorElem, email.nextSibling);
                }
            }
            if (!message || !message.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your message.\n';
            }

            if (!valid) {
                e.preventDefault();
                alert(errorMsg);
            }
        });
    }
});