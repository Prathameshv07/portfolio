/**
 * Project Images Enhancement Script
 * 
 * This script handles responsive image display in project pages with:
 * - Blurred background version of the same image
 * - Proper sizing and containment
 * - Fallback handling for broken images
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Project images script loaded');
    
    // Initialize responsive images
    adjustImagesByClass('responsive-image');
    
    // Set up window resize handler
    window.addEventListener('resize', function() {
        adjustImagesByClass('responsive-image');
    });
});

/**
 * Adjusts all images with the specified class to ensure they display properly
 * with a blurred version of the same image as background
 * @param {string} imageClass - The class name of images to adjust
 */
function adjustImagesByClass(imageClass) {
    console.log(`Adjusting images with class: ${imageClass}`);
    const images = document.getElementsByClassName(imageClass);
    
    if (images.length === 0) {
      console.warn(`No images with class "${imageClass}" found.`);
      return;
    }
    
    console.log(`Found ${images.length} images with class ${imageClass}`);
    
    Array.from(images).forEach((img, index) => {
      console.log(`Processing image ${index + 1}: ${img.src}`);
      
      // Skip if image is already processed
      if (img.parentElement.classList.contains('image-wrapper') && 
          img.parentElement.querySelector('.background-blur')) {
        console.log(`Image ${index + 1} already processed - skipping`);
        return;
      }
      
      // Create a wrapper div if it doesn't exist
      let wrapper = img.parentElement;
      if (!wrapper.classList.contains('image-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.classList.add('image-wrapper');
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        // Set wrapper styles
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'center';
        wrapper.style.overflow = 'hidden';
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.borderRadius = '10px'; // Rounded corners
      }
  
      // Create blurred background div
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
        bgImage.style.filter = 'blur(8px)';
        bgImage.style.transform = 'scale(1.1)'; // Slightly larger to cover blur edges
        bgImage.style.opacity = '0.8';
        bgImage.style.zIndex = '1';
        bgImage.style.borderRadius = '10px';
      }
  
      // Ensure the main image is above the blurred background
      img.style.position = 'relative';
      img.style.zIndex = '2';
      
      // Reset previous styles
      img.style.maxWidth = '';
      img.style.maxHeight = '';
      img.style.width = '';
      img.style.height = '';
      
      // Function to adjust image dimensions based on natural size and container
      const adjustImage = function() {
        // Update the background image
        bgImage.style.backgroundImage = `url(${img.src})`;
        
        const containerWidth = wrapper.clientWidth;
        const containerHeight = wrapper.clientHeight;
        const imgNaturalWidth = img.naturalWidth;
        const imgNaturalHeight = img.naturalHeight;
        
        // Calculate aspect ratios
        const containerRatio = containerWidth / containerHeight;
        const imgRatio = imgNaturalWidth / imgNaturalHeight;
        
        if (imgRatio > containerRatio) {
          // Image is wider than container (relative to height)
          // Match the width to container width, let height adjust accordingly
          img.style.width = '100%';
          img.style.height = 'auto';
          
          // Center vertically if height doesn't fill container
          const calculatedHeight = containerWidth / imgRatio;
          if (calculatedHeight < containerHeight) {
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '0';
            img.style.transform = 'translateY(-50%)';
          }
        } else {
          // Image is taller than container (relative to width)
          // Match the height to container height, let width adjust accordingly
          img.style.height = '100%';
          img.style.width = 'auto';
          
          // Center horizontally if width doesn't fill container
          const calculatedWidth = containerHeight * imgRatio;
          if (calculatedWidth < containerWidth) {
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '50%';
            img.style.transform = 'translateX(-50%)';
          }
        }
        
        // Ensure the image is displayed as a block element
        img.style.display = 'block';
        img.style.objectFit = 'contain';
        img.style.objectPosition = 'center';
        img.style.transition = 'width 0.3s, height 0.3s';
      };
  
      // Add fallback for broken images
      img.onerror = function() {
        console.warn(`Image failed to load: ${img.src}`);
        
        // Set a fallback image or create a placeholder
        img.style.display = 'none';
        
        // Create placeholder text if not already there
        if (!wrapper.querySelector('.image-placeholder')) {
          const placeholder = document.createElement('div');
          placeholder.classList.add('image-placeholder');
          placeholder.textContent = 'Image not available';
          placeholder.style.position = 'relative';
          placeholder.style.zIndex = '2';
          placeholder.style.backgroundColor = 'rgba(0,0,0,0.1)';
          placeholder.style.color = '#666';
          placeholder.style.padding = '20px';
          placeholder.style.borderRadius = '5px';
          placeholder.style.fontStyle = 'italic';
          wrapper.appendChild(placeholder);
        }
      };
  
      // Wait for the image to load to get accurate dimensions
      img.onload = function() {
        img.style.display = 'block'; // Ensure image is visible
        adjustImage();
      };
  
      // Trigger onload even if the image is already loaded
      if (img.complete) {
        img.onload();
      }
      
      // Add window resize handler to readjust on viewport changes
      window.addEventListener('resize', function() {
        if (img.complete) {
          adjustImage();
        }
      });
    });
} 