// Portfolio Website JavaScript - Dark Programming Theme
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffects();
    initMatrixBackground();
    initTerminalEffects();
    initCodeTyping();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for skill categories - animate icons
                if (entry.target.classList.contains('skill-category')) {
                    setTimeout(() => {
                        const skillItems = entry.target.querySelectorAll('.skill-item');
                        skillItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0) scale(1)';
                            }, index * 100);
                        });
                    }, 300);
                }
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos], .timeline-item, .project-card, .skill-category, .contact-item, .contact-form');
    animatedElements.forEach(el => observer.observe(el));
}

// Typing effect for hero title
function initTypingEffect() {
    const titleName = document.querySelector('.title-name');
    if (!titleName) return;

    const text = titleName.textContent;
    titleName.textContent = '';
    titleName.style.borderRight = '3px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            titleName.style.borderRight = 'none';
        }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Skill icons animation
function initSkillBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const skillItems = category.querySelectorAll('.skill-item');
        
        // Initialize skill items with hidden state
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.8)';
            item.style.transition = 'all 0.5s ease';
        });
        
        // Animate skill items when category comes into view
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        skillItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0) scale(1)';
                            }, index * 100);
                        });
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(category);
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6b35' : '#00d4ff'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 600;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Matrix background effect
function initMatrixBackground() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    
    // Create multiple matrix columns
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${i * 5}%;
            top: -100vh;
            color: var(--primary-color);
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.2;
            opacity: 0.1;
            animation: matrix ${10 + Math.random() * 20}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        // Generate random binary content
        let content = '';
        for (let j = 0; j < 50; j++) {
            content += Math.random() > 0.5 ? '1' : '0';
            if (j % 10 === 9) content += '<br>';
        }
        column.innerHTML = content;
        
        matrixBg.appendChild(column);
    }
    
    document.body.appendChild(matrixBg);
}

// Terminal effects
function initTerminalEffects() {
    // Add terminal-style cursor to code elements
    const codeElements = document.querySelectorAll('code, .tech-tag');
    codeElements.forEach(element => {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
    });
    
    // Add blinking cursor effect to form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-color)';
            this.style.boxShadow = 'none';
        });
    });
}

// Code typing effect for project descriptions
function initCodeTyping() {
    const projectDescriptions = document.querySelectorAll('.project-description');
    
    projectDescriptions.forEach(description => {
        const text = description.textContent;
        description.textContent = '';
        description.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeCode = () => {
            if (i < text.length) {
                description.textContent += text.charAt(i);
                i++;
                setTimeout(typeCode, 30);
            } else {
                description.style.borderRight = 'none';
            }
        };
        
        // Start typing when element comes into view
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeCode, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(description);
    });
}

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add glitch effect to hero title
    const heroTitle = document.querySelector('.title-name');
    if (heroTitle) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                heroTitle.style.textShadow = '2px 0 var(--secondary-color), -2px 0 var(--accent-color)';
                setTimeout(() => {
                    heroTitle.style.textShadow = 'var(--glow-primary)';
                }, 100);
            }
        }, 2000);
    }
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-xl), var(--glow-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Add hover effects to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-lg), var(--glow-primary)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Add glitch effect to floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        setInterval(() => {
            if (Math.random() > 0.98) {
                icon.style.filter = 'hue-rotate(180deg) brightness(1.5)';
                setTimeout(() => {
                    icon.style.filter = 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))';
                }, 200);
            }
        }, 3000);
    });
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: var(--glow-primary);
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress bar
addScrollProgress();

// Add some CSS animations for better visual appeal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .slide-in-left {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .slide-in-right {
        animation: slideInRight 0.8s ease forwards;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #000;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        font-weight: bold;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    /* Dark theme specific animations */
    @keyframes glow {
        0%, 100% { box-shadow: var(--glow-primary); }
        50% { box-shadow: var(--glow-secondary); }
    }
    
    .glow-animation {
        animation: glow 2s ease-in-out infinite;
    }
    
    /* Terminal cursor blink */
    @keyframes terminal-blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .terminal-cursor {
        animation: terminal-blink 1s infinite;
    }
    
    /* Code syntax highlighting simulation */
    .code-keyword { color: var(--primary-color); }
    .code-string { color: var(--accent-color); }
    .code-number { color: var(--secondary-color); }
    .code-comment { color: var(--text-light); }
`;

document.head.appendChild(style);

// Add random glitch effects to elements
setInterval(() => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-content');
    if (elements.length > 0 && Math.random() > 0.99) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        randomElement.style.filter = 'hue-rotate(90deg) saturate(1.5)';
        setTimeout(() => {
            randomElement.style.filter = 'none';
        }, 100);
    }
}, 5000);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add smooth reveal animations for sections
const revealSections = function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
