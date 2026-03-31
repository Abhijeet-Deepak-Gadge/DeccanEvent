// Race Results functionality for FitForce Club website

document.addEventListener('DOMContentLoaded', function() {
    initializeRaceResults();
});

function initializeRaceResults() {
    setupYearFilters();
    setupPerformanceOptimizations();
}

// Year filter functionality
function setupYearFilters() {
    const filterButtons = document.querySelectorAll('.year-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-orange-500', 'text-black');
                btn.classList.add('bg-gray-700', 'text-white');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-gray-700', 'text-white');
            this.classList.add('active', 'bg-orange-500', 'text-black');
        });
    });
}

function filterByYear(year) {
    const yearResults = document.querySelectorAll('.year-results');
    
    // Hide all year sections first
    yearResults.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (year === 'all' || section.dataset.year === year) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50 + index * 100);
            } else {
                section.style.display = 'none';
            }
        }, 300);
    });
    
    // Show notification
    let message;
    switch(year) {
        case 'all':
            message = 'Showing all years';
            break;
        case '2024':
            message = 'Showing 2024 events';
            break;
        case '2023':
            message = 'Showing 2023 events';
            break;
        case '2022':
            message = 'Showing 2022 events';
            break;
        default:
            message = 'Filter applied';
    }
    
    if (window.FitForceClub) {
        window.FitForceClub.showNotification(message, 'info');
    }
}

// External results links
function openExternalResults(eventId) {
    // External race results URLs (placeholder - would link to actual timing company results)
    const resultsUrls = {
        'mumbai-2024': 'https://results.raceresults.com/mumbai-city-marathon-2024',
        'pune-2024': 'https://results.raceresults.com/pune-winter-run-2024',
        'nashik-2024': 'https://results.raceresults.com/nashik-heritage-run-2024',
        'sinhagad-2023': 'https://results.raceresults.com/sinhagad-challenge-2023',
        'mumbai-monsoon-2023': 'https://results.raceresults.com/mumbai-monsoon-marathon-2023',
        'kolhapur-2023': 'https://results.raceresults.com/kolhapur-royal-run-2023',
        'pune-2022': 'https://results.raceresults.com/pune-city-marathon-2022',
        'vrukshathon-2022': 'https://results.raceresults.com/vrukshathon-marathon-2022'
    };
    
    const url = resultsUrls[eventId];
    
    if (url) {
        // In a real application, this would open the actual results page
        window.open(url, '_blank');
        
        if (window.FitForceClub) {
            window.FitForceClub.showNotification('Opening external race results...', 'info');
        }
    } else {
        // Fallback for demo
        if (window.FitForceClub) {
            window.FitForceClub.showNotification('Race results will be available on external timing website', 'info');
        }
    }
}

// Performance optimizations
function setupPerformanceOptimizations() {
    // Lazy load sections that are not immediately visible
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all result cards
    const resultCards = document.querySelectorAll('.year-results > div > div');
    resultCards.forEach(card => {
        observer.observe(card);
    });
}

// Search functionality (future enhancement)
function searchResults(query) {
    if (!query) {
        filterByYear('all');
        return;
    }
    
    const resultCards = document.querySelectorAll('.year-results > div > div');
    let visibleCount = 0;
    
    resultCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const isVisible = text.includes(query.toLowerCase());
        
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });
    
    if (window.FitForceClub) {
        const message = visibleCount > 0 
            ? `Found ${visibleCount} matching events`
            : 'No events found matching your search';
        window.FitForceClub.showNotification(message, visibleCount > 0 ? 'success' : 'warning');
    }
}

// Statistics animation
function animateStatistics() {
    const statElements = document.querySelectorAll('.text-3xl.font-bold.text-orange-400');
    
    statElements.forEach(element => {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        if (target) {
            animateCounter(element, target);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // 50 steps
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = originalText; // Restore original formatting
            clearInterval(timer);
        } else {
            const suffix = originalText.includes('+') ? '+' : 
                          originalText.includes('%') ? '%' : 
                          originalText.includes('₹') ? '' : '';
            const prefix = originalText.includes('₹') ? '₹' : '';
            element.textContent = prefix + Math.floor(current) + suffix;
        }
    }, 40);
}

// Initialize statistics animation when section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatistics();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe statistics section
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-4');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Export functions for global use
window.RaceResultsFunctions = {
    filterByYear,
    openExternalResults,
    searchResults,
    animateStatistics
};

// Make functions globally available for onclick handlers
window.filterByYear = filterByYear;
window.openExternalResults = openExternalResults;