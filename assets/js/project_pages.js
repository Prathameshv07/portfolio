// Project Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Close button functionality
    const closeButton = document.querySelector('.close-button');
    
    closeButton.addEventListener('click', function() {
        // Close the project detail page
        const projectDetailContainer = document.querySelector('.project-detail-container');
        projectDetailContainer.classList.remove('active');
        
        // After animation completes, navigate back if possible
        setTimeout(() => {
            if (window.history.length > 1) {
                window.history.back(); // Go back if history exists
            } else {
                // Check referrer and redirect accordingly
                if (document.referrer.includes("index.html")) {
                    window.location.href = "/index.html#projects";
                } else {
                    window.location.href = "beast_projects.html#projects";
                }
            }
        }, 300);
    });

    // Make the project detail page active when loaded
    const projectDetailContainer = document.querySelector('.project-detail-container');
    projectDetailContainer.classList.add('active');
    
    // Check if the adjustImagesByClass function exists (from project-images.js)
    if (typeof adjustImagesByClass === 'function') {
        console.log('Calling adjustImagesByClass from project_pages.js');
        // Apply the responsive image adjustments
        adjustImagesByClass('responsive-image');
    } else {
        console.warn('adjustImagesByClass function not found. Make sure project-images.js is loaded before project_pages.js');
    }
});
