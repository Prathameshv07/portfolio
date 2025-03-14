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
});

const words = [
    "Data Analyst",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Backend Dev"
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