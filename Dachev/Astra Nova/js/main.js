// DOM Elements
const newFactBtn = document.getElementById('new-fact');
const randomFactText = document.getElementById('random-fact');
const navLinks = document.querySelectorAll('.nav-links a');
const planetsCard = document.getElementById('planets');
const galaxiesCard = document.getElementById('galaxies');
const universeCard = document.getElementById('universe');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navContainer = document.querySelector('.nav-container');
const closeBannerBtn = document.querySelector('.close-banner');
const announcementBanner = document.querySelector('.announcement-banner');
const backToTopBtn = document.getElementById('back-to-top');
const themeToggle = document.querySelector('.theme-toggle');
const cookieConsent = document.querySelector('.cookie-consent');
const acceptCookiesBtn = document.querySelector('.cookie-consent .btn.primary');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

// Global variables
let currentTheme = 'dark';
let isTransitioning = false;
let currentTestimonialIndex = 0;
const testimonials = [];
const facts = [
    "The universe is estimated to be about 13.8 billion years old.",
    "There are more stars in the universe than grains of sand on all of Earth's beaches.",
    "A day on Venus is longer than a year on Venus.",
    "The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years.",
    "If you could fold a piece of paper 42 times, it would reach the moon.",
    "Black holes can 'sing' – they emit sound waves at a frequency humans can hear.",
    "Saturn's rings are mostly made of ice and rock particles, some as small as a grain of sand.",
    "There's an asteroid that contains so much metal that it's worth about $10 quintillion dollars.",
    "Neutron stars are so dense that a teaspoon would weigh about 10 million tons.",
    "The Milky Way and Andromeda galaxies will collide in about 4.5 billion years."
];

// Helper function to get random characters
function getRandomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.,-:;\'"`~@#$%^&*()[]{}|/<>\\';
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    
    // Initialize testimonials
    initializeTestimonials();
    
    // Set up theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Set up mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            toggleMobileMenu(e);
        });
    }
    
    // Set up dropdown menus for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up to parent elements
            this.parentNode.classList.toggle('active');
        });
    });
    
    // Set up testimonial navigation
    if (prevBtn) prevBtn.addEventListener('click', () => showTestimonial('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => showTestimonial('next'));
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Set up random fact generator
    if (randomFactText && newFactBtn) {
        // Set initial fact
        setRandomFact(randomFactText);
        
        // Set up new fact button
        newFactBtn.addEventListener('click', () => setRandomFact(randomFactText));
    }
    
    // Set up back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Set up cookie consent
    if (cookieConsent && acceptCookiesBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieConsent.classList.add('visible');
            }, 1000);
            
            acceptCookiesBtn.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieConsent.classList.remove('visible');
            });
        }
    }
    
    // Close announcement banner
    if (closeBannerBtn && announcementBanner) {
        closeBannerBtn.addEventListener('click', function() {
            announcementBanner.style.display = 'none';
        });
    }
});

// Function to initialize testimonials data
function initializeTestimonials() {
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    
    testimonialContents.forEach(content => {
        const quoteText = content.querySelector('.quote-text').textContent;
        const authorName = content.querySelector('.author-info h4').textContent;
        const authorTitle = content.querySelector('.author-info p').textContent;
        const authorIcon = content.querySelector('.author-image i').className;
        
        testimonials.push({
            quote: quoteText,
            author: authorName,
            title: authorTitle,
            icon: authorIcon
        });
    });
}

// Function to show testimonial with fade transition
function showTestimonial(direction) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Calculate next index
    let newIndex;
    if (direction === 'next') {
        newIndex = (currentTestimonialIndex + 1) % testimonials.length;
    } else if (direction === 'prev') {
        newIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    } else if (typeof direction === 'number') {
        newIndex = direction;
    }
    
    // If it's the same index, do nothing
    if (newIndex === currentTestimonialIndex) {
        isTransitioning = false;
        return;
    }
    
    // Get current and next testimonial elements
    const currentContent = document.querySelector(`.testimonial-content[data-index="${currentTestimonialIndex}"]`);
    const nextContent = document.querySelector(`.testimonial-content[data-index="${newIndex}"]`);
    
    if (!currentContent || !nextContent) {
        console.error('Cannot find testimonial content elements');
        isTransitioning = false;
        return;
    }
    
    // Fade out only the text and author
    const currentText = currentContent.querySelector('.quote-text');
    const currentAuthor = currentContent.querySelector('.author');
    currentText.style.opacity = '0';
    currentAuthor.style.opacity = '0';
    
    // After fade out, update text and fade in
    setTimeout(() => {
        // Hide current testimonial
        currentContent.style.display = 'none';
        currentContent.classList.remove('active');
        
        // Prepare and show next testimonial
        nextContent.style.display = '';
        nextContent.classList.add('active');
        
        // Get reference to the text and author elements
        const nextText = nextContent.querySelector('.quote-text');
        const nextAuthor = nextContent.querySelector('.author');
        
        // Start with invisible text and author
        nextText.style.opacity = '0';
        nextAuthor.style.opacity = '0';
        
        // Update the text content
        nextText.textContent = testimonials[newIndex].quote;
        
        // Update the author info
        nextContent.querySelector('.author-info h4').textContent = testimonials[newIndex].author;
        nextContent.querySelector('.author-info p').textContent = testimonials[newIndex].title;
        nextContent.querySelector('.author-image i').className = testimonials[newIndex].icon;
        
        // Fade in the text and author
        setTimeout(() => {
            nextText.style.opacity = '1';
            nextAuthor.style.opacity = '1';
        }, 50);
        
        // Update the active dot
        const activeDot = document.querySelector('.dot.active');
        if (activeDot) activeDot.classList.remove('active');
        
        const nextDot = document.querySelector(`.dot[data-index="${newIndex}"]`);
        if (nextDot) nextDot.classList.add('active');
        
        // Update current index
        currentTestimonialIndex = newIndex;
        
        // Reset transitioning flag
        setTimeout(() => {
            isTransitioning = false;
        }, 400);
    }, 400);
}

// Function to set a random fact
function setRandomFact(element) {
    const randomIndex = Math.floor(Math.random() * facts.length);
    element.textContent = facts[randomIndex];
}

// Function to toggle theme
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Function to apply theme
function applyTheme(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    const body = document.body;
    
    // Add transition class for smooth theme change
    body.classList.add('theme-transitioning');
    
    // Apply theme after a small delay to trigger the transition effect
    setTimeout(() => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            if (themeToggle) themeToggle.className = 'fas fa-sun';
        } else {
            body.classList.remove('light-theme');
            if (themeToggle) themeToggle.className = 'fas fa-moon';
        }
        
        currentTheme = theme;
        
        // Remove the transition class after the transition is complete
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 600); // Match --theme-transition duration
    }, 50);
}

// Function to toggle mobile menu
function toggleMobileMenu(e) {
    // If an event was passed and it came from inside a dropdown, don't toggle the menu
    if (e && e.target && (e.target.closest('.dropdown-toggle') || e.target.closest('.dropdown-menu'))) {
        return;
    }
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.classList.toggle('active');
}

// ===== ANIMATE FEATURE CARDS =====
function checkScroll() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (cardTop < triggerPoint) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// ===== EVENT LISTENERS =====

// Feature Card Click
if (planetsCard) {
    planetsCard.addEventListener('click', function() {
        window.location.href = 'planets.html';
    });
    planetsCard.style.cursor = 'pointer';
}

if (galaxiesCard) {
    galaxiesCard.addEventListener('click', function() {
        window.location.href = 'galaxies.html';
    });
    galaxiesCard.style.cursor = 'pointer';
}

if (universeCard) {
    universeCard.addEventListener('click', function() {
        window.location.href = 'universe.html';
    });
    universeCard.style.cursor = 'pointer';
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Get the href attribute
        const href = this.getAttribute('href');
        
        // Check if this is a dropdown toggle and exit if so
        if (this.classList.contains('dropdown-toggle')) {
            return; // Let the dropdown toggle handler handle it
        }
        
        // Check if this is a link inside a dropdown
        const isDropdownItem = this.closest('.dropdown-menu') !== null;
        
        // Don't prevent default for external page links (non-hash links)
        if (!href.startsWith('#')) {
            // Let the browser handle the navigation naturally
            // Only close the mobile menu if not inside a dropdown menu
            if (navContainer && navContainer.classList.contains('active') && !isDropdownItem) {
                toggleMobileMenu(e);
            }
            return;
        }
        
        // Prevent default only for hash links
        e.preventDefault();
        
        // If mobile menu is open, close it only if not a dropdown item
        if (navContainer && navContainer.classList.contains('active') && !isDropdownItem) {
            toggleMobileMenu(e);
        }
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // If href is just "#", scroll to top
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        // For other anchor links, scroll to the element
        if (href.length > 1) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Check scroll position for animations when user scrolls
window.addEventListener('scroll', checkScroll);

// Parallax effect for background
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const twinklingElement = document.querySelector('.twinkling');
    if (twinklingElement) {
        twinklingElement.style.transform = `translateY(${scrollPosition * 0.05}px)`;
    }
}); 