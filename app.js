// ================================
// Diplomado en Yoga - Interactive Scripts
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Mobile Navigation Toggle
    // ================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ================================
    // Navbar Scroll Effect
    // ================================
    const mainNav = document.querySelector('.main-nav');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    // ================================
    // Smooth Scroll for Anchor Links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = mainNav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // FAQ Accordion
    // ================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // ================================
    // WhatsApp Form Submission
    // ================================
    const inscriptionForm = document.getElementById('inscriptionForm');
    
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nombre = document.getElementById('nombre').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const email = document.getElementById('email').value.trim();
            const modulo = document.getElementById('modulo').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validate required fields
            if (!nombre || !whatsapp) {
                showNotification('Por favor completa los campos requeridos', 'error');
                return;
            }
            
            // Validate phone number (10 digits)
            if (!/^\d{10}$/.test(whatsapp)) {
                showNotification('Por favor ingresa un número de 10 dígitos', 'error');
                return;
            }
            
            // Build WhatsApp message
            let message = `*Inscripción Diplomado en Yoga*\n\n`;
            message += `📝 *Nombre:* ${nombre}\n`;
            message += `📱 *WhatsApp:* +52 ${whatsapp}\n`;
            
            if (email) {
                message += `📧 *Email:* ${email}\n`;
            }
            
            if (modulo) {
                const moduloText = document.querySelector(`#modulo option[value="${modulo}"]`).textContent;
                message += `📚 *Interés:* ${moduloText}\n`;
            }
            
            if (mensaje) {
                message += `\n💬 *Mensaje:*\n${mensaje}`;
            }
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp number (replace with actual number)
            const whatsappNumber = '5215512345678';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showNotification('¡Redirigiendo a WhatsApp!', 'success');
            
            // Reset form after a delay
            setTimeout(() => {
                inscriptionForm.reset();
            }, 1000);
        });
    }
    
    // ================================
    // Notification System
    // ================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#0b3b1d' : type === 'error' ? '#c0392b' : '#2c3e50'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-family: var(--font-body);
        `;
        
        // Add animation keyframes
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.8;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ================================
    // Scroll Animations (Intersection Observer)
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.module-card, .material-card, .instructor-card, .outcome, .feature'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animate-in styles
    const animateStyle = document.createElement('style');
    animateStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animateStyle);
    
    // ================================
    // Module Cards Stagger Animation
    // ================================
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // ================================
    // Hero WhatsApp Button
    // ================================
    const heroWhatsappBtn = document.querySelector('.hero-buttons .btn-primary');
    
    if (heroWhatsappBtn) {
        heroWhatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to inscription form instead of opening WhatsApp directly
            const inscriptionSection = document.getElementById('inscription');
            if (inscriptionSection) {
                const navHeight = mainNav.offsetHeight;
                const targetPosition = inscriptionSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ================================
    // Active Navigation Highlight
    // ================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - mainNav.offsetHeight;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Add active link styles
    const navActiveStyle = document.createElement('style');
    navActiveStyle.textContent = `
        .nav-links a.active {
            color: var(--color-primary);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(navActiveStyle);
    
    // ================================
    // Parallax Effect for Hero
    // ================================
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroGradient) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroGradient.style.transform = `translate(${rate * 0.1}px, ${rate * 0.2}px)`;
        });
    }
    
    // ================================
    // Form Input Animations
    // ================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', function() {
            if (label) {
                label.style.color = 'var(--color-primary)';
            }
        });
        
        input.addEventListener('blur', function() {
            if (label) {
                label.style.color = '';
            }
        });
    });
    
    // ================================
    // Timeline Animation on Scroll
    // ================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // ================================
    // Keyboard Navigation Support
    // ================================
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // ================================
    // Image Lazy Loading Enhancement
    // ================================
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Check if already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // ================================
    // Console Welcome Message
    // ================================
    console.log('%c🧘 Diplomado Integral en Yoga', 'font-size: 24px; font-weight: bold; color: #0b3b1d;');
    console.log('%cAnasura Yoga - Transformando vidas', 'font-size: 14px; color: #5a5a5a;');
    console.log('%c¿Interesado en el código? Contáctanos en info@anasurayoga.com.mx', 'font-size: 12px; color: #8a8a8a;');
    
});

// ================================
// Performance Optimization
// ================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
