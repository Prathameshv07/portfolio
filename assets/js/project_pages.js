// Project Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Close button functionality
    const closeButton = document.querySelector('.close-button');
    
    closeButton.addEventListener('click', function() {
        // Close the project detail page
        const projectDetailContainer = document.querySelector('.project-detail-container');
        projectDetailContainer.classList.remove('active');
        
        // After animation completes, navigate back if needed
        setTimeout(() => {
            window.history.back();
        }, 300);
    });
    
    // Make the project detail page active when loaded
    const projectDetailContainer = document.querySelector('.project-detail-container');
    projectDetailContainer.classList.add('active');
});