// Shared JavaScript functionality for FitForce Club website

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeImageLazyLoading();
    initializeRaceResultsButton();
});

// Header scroll effect
function initializeHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    function handleScroll() {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(12px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.classList.remove('header-scrolled');
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            
            // Animate in
            setTimeout(() => {
                mobileMenu.style.transition = 'all 0.3s ease';
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateY(0)';
            }, 10);
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'x');
                lucide.createIcons();
            }
        } else {
            // Animate out
            mobileMenu.style.transition = 'all 0.3s ease';
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            
            // Update button icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.8s ease ${index * 0.1}s`;
        observer.observe(section);
    });

    // Observe images in gallery for staggered animation
    const galleryImages = document.querySelectorAll('.gallery-grid .group');
    galleryImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        img.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(img);
    });
}

// Image lazy loading and error handling
function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Handle successful load
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.style.opacity = '1';
        });
        
        // Handle error
        img.addEventListener('error', function() {
            this.classList.remove('loading');
            this.style.opacity = '0.5';
            this.alt = 'Image failed to load';
            console.warn('Failed to load image:', this.src);
        });
    });
}

// Race results button functionality
function initializeRaceResultsButton() {
    const raceResultsBtn = document.getElementById('race-results-btn');
    if (!raceResultsBtn) return;

    raceResultsBtn.addEventListener('click', function() {
        // Show alert for now - will be replaced with actual link in future
        showNotification('Race results will be available here soon!', 'info');
    });
}

// Utility functions

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-600', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-600', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-600', 'text-black');
            break;
        default:
            notification.classList.add('bg-orange-500', 'text-black');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }
}

// Format date function
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Validate email function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone function
function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Loading state management
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
        element.style.pointerEvents = 'none';
    }
}

function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
        element.style.pointerEvents = 'auto';
    }
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for use in other files
window.FitForceClub = {
    showNotification,
    scrollToElement,
    formatDate,
    validateEmail,
    validatePhone,
    showLoading,
    hideLoading,
    debounce,
    throttle
};