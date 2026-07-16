// ===== Smooth Scrolling =====
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
                setActiveLink(link);
            }
        });
    });

    // Scroll to Top Button
    const scrollBtn = document.getElementById('scrollBtn');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active Link Highlighting
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navLink = document.querySelector(`a[href="#${section.id}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
});

function setActiveLink(link) {
    document.querySelectorAll('.nav-link').forEach(nav => {
        nav.classList.remove('active');
    });
    link.classList.add('active');
}

// ===== Hamburger Menu =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getAnimationForElement(entry.target);
        }
    });
}, observerOptions);

function getAnimationForElement(element) {
    if (element.classList.contains('feature-card')) {
        return 'slideInUp 0.8s ease-out forwards';
    }
    if (element.classList.contains('testimonial-card')) {
        return 'slideInUp 0.8s ease-out forwards';
    }
    if (element.classList.contains('step')) {
        return 'slideInUp 0.8s ease-out forwards';
    }
    return '';
}

document.querySelectorAll('.feature-card, .testimonial-card, .step').forEach(el => {
    observer.observe(el);
});

// ===== Counter Animation =====
const stats = document.querySelectorAll('.stat h4');
let animated = false;

const animateCounters = () => {
    if (animated) return;
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);
        
        if (number) {
            let current = 0;
            const increment = number / 50;
            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + (text.includes('%') ? '%' : (text.includes('+') ? '+' : ''));
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + (text.includes('%') ? '%' : (text.includes('+') ? '+' : ''));
                }
            }, 20);
        }
    });
    
    animated = true;
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entries[0].target);
        }
    });
    statsObserver.observe(statsSection);
}

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        element.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    });
});

// ===== Easter Egg: Keyboard Shortcut =====
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
        // Ctrl+B to open birthday card
        e.preventDefault();
        window.location.href = 'index.html';
    }
});

// ===== Console Message =====
console.log('%c🎉 Birthday Gyanvi - Digital Card 🎉', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cClick "Open Birthday Card" to celebrate!', 'color: #764ba2; font-size: 14px;');
console.log('%cKeyboard Shortcut: Press Ctrl+B to jump to the card', 'color: #f093fb; font-size: 12px;');
