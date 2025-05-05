function openModal(event) {
    // Ensure modal only opens if clicked outside buttons
    const modal = document.getElementById("project-modal");
    modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 35,
                "density": {
                    "enable": true,
                    "value_area": 400
                }
            },
            "color": {
                "value": "#ffffff"  /* Default color for nodes */
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.7,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.6,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 180,
                    "line_linked": {
                        "opacity": 1,
                        "color": "#e9b321" /* Nodes turn orange when cursor is near */
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 10,
                    "duration": 2
                },
                "repulse": {
                    "distance": 150,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
    
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 50,
        delay: 0,
        anchorPlacement: 'top-bottom',
        disable: 'mobile'
    });

    // Call adjust images for responsive images
    adjustImagesByClass('responsive-image');
    
    // Also run this when window loads to ensure images are properly handled
    window.addEventListener('load', function() {
        adjustImagesByClass('responsive-image');
    });
});

const words = [
    "Data Analysis",
    "Machine Learning",
    "Artificial Intelligence",
    "Vector Search",
    "Large Language Models",
    "Computer Vision",
    "NLP",
    "SQL & Database Engineering",
    "Python Development",
    "Web Development"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Speed of typing
const deleteSpeed = 50;  // Speed of deleting
const pauseTime = 1000;  // Time before deleting

function typeEffect() {
    const typingText = document.getElementById("typing-text");

    if (!isDeleting && charIndex <= words[wordIndex].length) {
        typingText.innerHTML = words[wordIndex].substring(0, charIndex);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } 
    else if (isDeleting && charIndex >= 0) {
        typingText.innerHTML = words[wordIndex].substring(0, charIndex);
        charIndex--;
        setTimeout(typeEffect, deleteSpeed);
    } 
    else {
        isDeleting = !isDeleting;

        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, pauseTime);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);


/* form validation */
function toggleSection(sectionType) {
    // Get all content divs and buttons
    const contents = document.querySelectorAll('.toggle-content');
    const buttons = document.querySelectorAll('.toggle-btn');
    
    // Hide all content sections
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected content
    document.getElementById(sectionType + '-content').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function toggleSectionFromDropdown(sectionType) {
    // Get all content divs
    const contents = document.querySelectorAll('.toggle-content');
    
    // Hide all content sections
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected content
    document.getElementById(sectionType + '-content').classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,30}$/,                                        // Letters and spaces, 2-30 chars
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,         // Standard email format validation
        subject: /^.{5,100}$/,                                             // Any characters, 5-100 chars
        message: /^[\s\S]{10,1000}$/                                       // Any characters (incl. newlines), 10-1000 chars
    };
    
    // Error messages
    const errorMessages = {
        name: 'Please enter a valid name (2-30 characters, letters only)',
        email: 'Please enter a valid email address',
        subject: 'Subject must be between 5-100 characters',
        message: 'Message must be between 10-1000 characters'
    };
    
    // Create error message elements
    const createErrorElement = (id) => {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.id = `${id}-error`;
        errorSpan.style.color = '#ff3838';
        errorSpan.style.fontSize = '0.8rem';
        errorSpan.style.marginTop = '0.25rem';
        errorSpan.style.display = 'none';
        return errorSpan;
    };
    
    // Add error elements after each input
    document.querySelectorAll('#contactForm .form-group').forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorElement = createErrorElement(input.id);
        errorElement.textContent = errorMessages[input.id];
        group.appendChild(errorElement);
    });
    
    // Validate single field
    const validateField = (field) => {
        const value = field.value.trim();
        const pattern = patterns[field.id];
        const errorElement = document.getElementById(`${field.id}-error`);
        
        if (pattern && !pattern.test(value)) {
            field.style.borderColor = '#ff3838';
            errorElement.style.display = 'block';
            return false;
        } else {
            field.style.borderColor = '#4CAF50';
            errorElement.style.display = 'none';
            return true;
        }
    };
    
    // Add input event listeners to each field for real-time validation
    document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });


    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Disable the submit button to prevent multiple submissions
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send to Formspree
            fetch('https://formspree.io/f/myzezgqr', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                // Success - Formspree accepted the submission
                console.log('Success:', data);
                
                // Create success notification
                const successNotification = document.createElement('div');
                successNotification.className = 'success-notification';
                successNotification.textContent = 'Thank you! Your message has been sent successfully.';
                successNotification.style.backgroundColor = '#4CAF50';
                successNotification.style.color = 'white';
                successNotification.style.padding = '10px';
                successNotification.style.borderRadius = '4px';
                successNotification.style.marginTop = '20px';
                
                // Insert the notification after the form
                contactForm.parentNode.insertBefore(successNotification, contactForm.nextSibling);
                
                // Reset the form
                contactForm.reset();
                document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
                    field.style.borderColor = '';
                });
                
                // Reset the submit button
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                
                // Remove the notification after 5 seconds
                setTimeout(() => {
                    successNotification.remove();
                }, 5000);
            })
            .catch(error => {
                // Handle errors from Formspree
                console.error('Error:', error);
                
                // Create error notification
                const errorNotification = document.createElement('div');
                errorNotification.className = 'error-notification';
                errorNotification.textContent = 'Sorry, there was a problem sending your message. Please try again later.';
                errorNotification.style.backgroundColor = '#ff3838';
                errorNotification.style.color = 'white';
                errorNotification.style.padding = '10px';
                errorNotification.style.borderRadius = '4px';
                errorNotification.style.marginTop = '20px';
                
                // Insert the notification after the form
                contactForm.parentNode.insertBefore(errorNotification, contactForm.nextSibling);
                
                // Reset the submit button
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                
                // Remove the notification after 5 seconds
                setTimeout(() => {
                    errorNotification.remove();
                }, 5000);
            });
        }
    });

});

/**
 * Adjusts all images with the specified class to ensure they're fully visible
 * with a blurred version of the same image as background
 * @param {string} imageClass - The class name of images to adjust
 */
function adjustImagesByClass(imageClass) {
    console.log(`adjustImagesByClass called for class: ${imageClass}`);
    const images = document.getElementsByClassName(imageClass);
    
    if (images.length === 0) {
      console.warn(`No images with class "${imageClass}" found.`);
      return;
    }
    
    console.log(`Found ${images.length} images with class ${imageClass}`);
    
    Array.from(images).forEach((img, index) => {
      console.log(`Processing image ${index + 1}: ${img.src}`);
      
      // Skip if image is already in a wrapper with background blur
      if (img.parentElement.classList.contains('image-wrapper') && 
          img.parentElement.querySelector('.background-blur')) {
        console.log(`Image ${index + 1} already has a wrapper and background blur - skipping`);
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
        bgImage.style.filter = 'blur(8px)';
        bgImage.style.opacity = '0.9';
        bgImage.style.zIndex = '1';
      }
  
      // Ensure the main image is above the blurred background
      img.style.position = 'relative';
      img.style.zIndex = '2';
      img.style.display = 'block';
      img.style.margin = '0 auto';
      
      // Function to adjust image dimensions based on container and natural image size
      const adjustImage = function() {
        // Update the background image
        bgImage.style.backgroundImage = `url(${img.src})`;
        
        // Get container and image dimensions
        const containerWidth = wrapper.clientWidth;
        const containerHeight = wrapper.clientHeight;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
  
        // Calculate aspect ratios
        const containerRatio = containerWidth / containerHeight;
        const imgRatio = imgWidth / imgHeight;
        
        // If in project-image container - use cover approach
        if (wrapper.closest('.project-image')) {
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.style.objectPosition = 'center';
          return;
        }
        
        // Handle project detail images in the detail pages
        if (wrapper.closest('.project-detail-image')) {
          img.style.maxWidth = '90%';
          img.style.maxHeight = '90%';
          img.style.objectFit = 'contain';
          img.style.objectPosition = 'center';
          return;
        }

        // For other images, determine which dimension constrains the image
        if (imgRatio > containerRatio) {
          // Image is wider than container (relative to height)
          // Set width to 100% and let height adjust
          img.style.width = '100%';
          img.style.height = 'auto';
          img.style.maxHeight = '100%';
          
          // Center the image vertically if it doesn't fill the height
          if ((containerWidth / imgRatio) < containerHeight) {
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
          }
        } else {
          // Image is taller than container (relative to width)
          // Set height to 100% and let width adjust
          img.style.height = '100%';
          img.style.width = 'auto';
          img.style.maxWidth = '100%';
          
          // Center the image horizontally if it doesn't fill the width
          if ((containerHeight * imgRatio) < containerWidth) {
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
          }
        }
      };
  
      // Wait for the image to load to get accurate dimensions
      img.onload = function() {
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