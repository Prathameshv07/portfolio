document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Filter variables
    const categoryFilter = document.getElementById('category-filter');
    const platformFilter = document.getElementById('platform-filter');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    // Update default option text to match design
    categoryFilter.options[0].textContent = "All Categories";
    platformFilter.options[0].textContent = "All Platforms";
    
    // Collect all unique categories and platforms
    const categories = new Set();
    const platforms = new Set();
    
    // Populate the sets with unique values from data attributes
    certificateCards.forEach(card => {
        const cardCategories = card.dataset.category ? card.dataset.category.split(',') : [];
        const cardPlatforms = card.dataset.platform ? card.dataset.platform.split(',') : [];
        
        cardCategories.forEach(category => categories.add(category));
        cardPlatforms.forEach(platform => platforms.add(platform));
    });
    
    // Clear existing options except the "All" option
    while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1);
    }
    
    while (platformFilter.options.length > 1) {
        platformFilter.remove(1);
    }
    
    // Add options for categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        categoryFilter.appendChild(option);
    });
    
    // Add options for platforms
    platforms.forEach(platform => {
        const option = document.createElement('option');
        option.value = platform;
        option.textContent = platform.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        platformFilter.appendChild(option);
    });
    
    // Function to filter certificates
    function filterCertificates() {
        const categoryValue = categoryFilter.value;
        const platformValue = platformFilter.value;
        
        certificateCards.forEach(card => {
            const categories = card.dataset.category ? card.dataset.category.split(',') : [];
            const platforms = card.dataset.platform ? card.dataset.platform.split(',') : [];
            
            let showCard = true;
            
            // Check if category filter is active
            if (categoryValue && !categories.includes(categoryValue)) {
                showCard = false;
            }
            
            // Check if platform filter is active
            if (platformValue && !platforms.includes(platformValue)) {
                showCard = false;
            }
            
            // Show or hide the card
            card.style.display = showCard ? 'block' : 'none';
        });
    }
    
    // Event listeners for filter changes
    categoryFilter.addEventListener('change', filterCertificates);
    platformFilter.addEventListener('change', filterCertificates);
    
    // Clear filters button
    clearFiltersBtn.addEventListener('click', function() {
        categoryFilter.value = '';
        platformFilter.value = '';
        certificateCards.forEach(card => {
            card.style.display = 'block';
        });
    });

    // Center all certificate images properly
    const certificateImages = document.querySelectorAll('.certificate-image img');
    certificateImages.forEach(img => {
        // Force proper centering of images
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        
        // Set parent container to flex for better centering
        const container = img.parentElement;
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
    });
    
    // Adjust all images with the responsive-image class
    adjustImagesByClass('responsive-image');
    
    // Adjust on window resize as well
    window.addEventListener('resize', function() {
        adjustImagesByClass('responsive-image');
        
        // Re-center images on resize
        certificateImages.forEach(img => {
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
        });
    });
});

/**
 * Adjusts all images with the specified class to ensure they're fully visible
 * with a blurred version of the same image as background
 * @param {string} imageClass - The class name of images to adjust
 */
function adjustImagesByClass(imageClass) {
    const images = document.getElementsByClassName(imageClass);
    
    if (images.length === 0) {
      console.warn(`No images with class "${imageClass}" found.`);
      return;
    }
    
    Array.from(images).forEach(img => {
      // Create a wrapper div if it doesn't exist
      let wrapper = img.parentElement;
      if (!wrapper.classList.contains('image-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.classList.add('image-wrapper');
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        // Set wrapper styles
        wrapper.style.overflow = 'hidden';
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
      }
  
      // Create blurred background if it doesn't exist yet
      let bgImage = wrapper.querySelector('.background-blur');
      if (!bgImage) {
        bgImage = document.createElement('div');
        bgImage.classList.add('background-blur');
        wrapper.insertBefore(bgImage, img);
        
        // Set background styles
        bgImage.style.position = 'absolute';
        bgImage.style.top = '0';
        bgImage.style.left = '0';
        bgImage.style.width = '100%';
        bgImage.style.height = '100%';
        bgImage.style.backgroundImage = `url(${img.src})`;
        bgImage.style.backgroundPosition = 'center';
        bgImage.style.backgroundSize = 'cover';
        bgImage.style.filter = 'blur(10px)';
        bgImage.style.opacity = '1';
        bgImage.style.zIndex = '1';
      }
  
      // Ensure the main image is above the blurred background
      img.style.position = 'relative';
      img.style.zIndex = '2';
      
      // Reset any previously applied styles for the main image
      img.style.width = '';
      img.style.height = '';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center';
  
      // Function to adjust image dimensions
      const adjustImage = function() {
        const containerWidth = wrapper.clientWidth;
        const containerHeight = wrapper.clientHeight;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
  
        // Calculate aspect ratios
        const containerRatio = containerWidth / containerHeight;
        const imgRatio = imgWidth / imgHeight;
  
        if (imgRatio > containerRatio) {
          // Image is wider (relative to its height) than the container
          // Adjust vertically to fit the width
          img.style.width = '100%';
          img.style.height = 'auto';
        } else {
          // Image is taller (relative to its width) than the container
          // Adjust horizontally to fit the height
          img.style.width = 'auto';
          img.style.height = '100%';
        }
      };
  
      // Wait for the image to load to get accurate dimensions
      img.onload = function() {
        adjustImage();
        // Update the background image when the main image loads
        bgImage.style.backgroundImage = `url(${img.src})`;
      };
  
      // Trigger onload even if the image is already loaded
      if (img.complete) {
        img.onload();
      }
    });
  }