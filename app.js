// Anasura Yoga - Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    // Mobile Navigation
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                var offset = nav.offsetHeight;
                var top = target.offsetTop - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
    
    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(function(item) {
        var question = item.querySelector('.faq-q');
        if (question) {
            question.addEventListener('click', function() {
                document.querySelectorAll('.faq-item').forEach(function(i) {
                    if (i !== item) i.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });
    
    // WhatsApp Form
    var form = document.getElementById('inscriptionForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var nombre = document.getElementById('nombre').value.trim();
            var whatsapp = document.getElementById('whatsapp').value.trim();
            var email = document.getElementById('email').value.trim();
            
            if (!nombre || !whatsapp) {
                alert('Por favor completa los campos requeridos');
                return;
            }
            
            if (!/^\d{10}$/.test(whatsapp)) {
                alert('Ingresa un numero de 10 digitos');
                return;
            }
            
            var msg = '*Inscripcion Diplomado en Yoga*\n\n';
            msg += 'Nombre: ' + nombre + '\n';
            msg += 'WhatsApp: +52 ' + whatsapp + '\n';
            if (email) msg += 'Email: ' + email + '\n';
            
            var url = 'https://api.whatsapp.com/send/?phone=528126592009&text=' + encodeURIComponent(msg);
            window.open(url, '_blank');
            form.reset();
        });
    }
    
    // Scroll animations
    var observerOptions = { threshold: 0.1 };
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    var elements = document.querySelectorAll('.programa-card, .curriculum-card, .instructor, .pillar, .t-item, .material-item');
    elements.forEach(function(el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease ' + (i * 0.05) + 's, transform 0.5s ease ' + (i * 0.05) + 's';
        observer.observe(el);
    });
    
    // Add animate-in styles
    var style = document.createElement('style');
    style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
    
    // Image lazy load
    document.querySelectorAll('img').forEach(function(img) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    // ESC close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu) {
            navMenu.classList.remove('active');
        }
    });
    
    console.log('Anasura Yoga School - Diplomado en Yoga');
});
