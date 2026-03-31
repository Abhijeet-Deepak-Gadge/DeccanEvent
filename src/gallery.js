// Gallery functionality for FitForce Club website

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1667781838690-5f32ea0ccea6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxtYXJhdGhvbiUyMHJ1bm5lcnN8ZW58MHx8fHwxNzU4Nzk5OTkzfDA&ixlib=rb-4.1.0&q=85",
        caption: "Central Park Marathon - Thousands of runners at the starting line",
        category: ["marathon", "charity"]
    },
    {
        src: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxtYXJhdGhvbiUyMHJ1bm5lcnN8ZW58MHx8fHwxNzU4Nzk5OTkzfDA&ixlib=rb-4.1.0&q=85",
        caption: "Brussels Marathon - Aerial view of the marathon route",
        category: ["marathon"]
    },
    {
        src: "https://images.unsplash.com/photo-1591078393633-eb8a3c88b83e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxtYXJhdGhvbiUyMHJ1bm5lcnN8ZW58MHx8fHwxNzU4Nzk5OTkzfDA&ixlib=rb-4.1.0&q=85",
        caption: "Charity Run for Education - Runners supporting meaningful causes",
        category: ["charity"]
    },
    {
        src: "https://images.unsplash.com/photo-1524646349956-1590eacfa324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxtYXJhdGhvbiUyMHJ1bm5lcnN8ZW58MHx8fHwxNzU4Nzk5OTkzfDA&ixlib=rb-4.1.0&q=85",
        caption: "Finish Line Celebration - The moment of triumph and achievement",
        category: ["finish"]
    },
    {
        src: "https://images.unsplash.com/photo-1753800487227-ea7582de9a9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBydW5uZXJzfGVufDB8fHx8MTc1ODgwMDAwNnww&ixlib=rb-4.1.0&q=85",
        caption: "Professional Runner - Elite athlete in action during training",
        category: ["marathon"]
    },
    {
        src: "https://images.pexels.com/photos/2285467/pexels-photo-2285467.jpeg",
        caption: "Training Session - Group preparation for upcoming marathon",
        category: ["training"]
    },
    {
        src: "https://images.pexels.com/photos/2424428/pexels-photo-2424428.jpeg",
        caption: "Victory Moment - Runners celebrating their achievement",
        category: ["finish"]
    },
    {
        src: "https://images.pexels.com/photos/3019696/pexels-photo-3019696.jpeg",
        caption: "Group Training - Community building through running",
        category: ["training", "marathon"]
    },
    {
        src: "https://images.unsplash.com/photo-1667781838690-5f32ea0ccea6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxtYXJhdGhvbiUyMHJ1bm5lcnN8ZW58MHx8fHwxNzU4Nzk5OTkzfDA&ixlib=rb-4.1.0&q=85",
        caption: "Marathon Action - Runners in motion during the race",
        category: ["marathon"]
    },
    {
        src: "https://images.unsplash.com/photo-1591078393633-eb8a3c88b83e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxtYXJhdGhvbiUyMHJ1bm5lcnN8ZW58MHx8fHwxNzU4Nzk5OTkzfDA&ixlib=rb-4.1.0&q=85",
        caption: "Community Impact - Running together for positive change",
        category: ["charity"]
    }
];

let currentImageIndex = 0;
let currentFilter = 'all';

// Initialize gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

function initializeGallery() {
    // Initialize filter functionality
    setupFilterButtons();
    
    // Initialize lightbox
    setupLightbox();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
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

function filterGallery(category) {
    currentFilter = category;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            // Add staggered animation
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // Show notification
    const categoryName = category === 'all' ? 'All Photos' : category.charAt(0).toUpperCase() + category.slice(1);
    if (window.FitForceClub) {
        window.FitForceClub.showNotification(`Showing ${categoryName}`, 'info');
    }
}

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    const imageData = galleryImages[index];
    
    lightboxImage.src = imageData.src;
    lightboxImage.alt = imageData.caption;
    lightboxCaption.textContent = imageData.caption;
    
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add fade in animation
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    lightbox.style.opacity = '0';
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

function nextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        openLightbox(currentImageIndex + 1);
    } else {
        openLightbox(0); // Loop to first image
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        openLightbox(currentImageIndex - 1);
    } else {
        openLightbox(galleryImages.length - 1); // Loop to last image
    }
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        
        if (!lightbox.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });
}

function loadMorePhotos() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Show loading state
    if (window.FitForceClub) {
        window.FitForceClub.showLoading(loadMoreBtn);
    }
    
    // Simulate loading delay
    setTimeout(() => {
        if (window.FitForceClub) {
            window.FitForceClub.hideLoading(loadMoreBtn);
            window.FitForceClub.showNotification('All photos are currently displayed!', 'info');
        }
        
        // In a real application, you would load more photos here
        // For now, we'll just show a message
        loadMoreBtn.textContent = 'All Photos Loaded';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
    }, 1500);
}

// Image loading error handler
function handleImageError(img) {
    img.style.opacity = '0.5';
    img.alt = 'Image failed to load';
    console.warn('Failed to load gallery image:', img.src);
}

// Add error handling to all gallery images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Export functions for global use
window.GalleryFunctions = {
    filterGallery,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
    loadMorePhotos
};