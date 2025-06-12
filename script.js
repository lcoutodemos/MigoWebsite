// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(14, 14, 14, 0.95)';
            header.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 8px 24px';
        }
    });
    
    // Beta signup form
    const betaForm = document.getElementById('beta-form');
    
    if (betaForm) {
        betaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;
                
                // Use fetch to submit the form without page redirect
                fetch('https://formsubmit.co/ajax/lucascouto.demos@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        _subject: 'New Migo Beta Signup'
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Show success message
                    const betaSection = document.querySelector('.beta-section');
                    const formContainer = document.getElementById('beta-form').parentElement;
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <h3>Thank you for joining!</h3>
                        <p>We'll let you know when Migo is ready for beta testing.</p>
                    `;
                    successMessage.style.textAlign = 'center';
                    successMessage.style.padding = '20px';
                    successMessage.style.backgroundColor = 'rgba(6, 214, 160, 0.1)';
                    successMessage.style.borderRadius = '8px';
                    successMessage.style.marginTop = '20px';
                    
                    // Replace form with success message
                    formContainer.innerHTML = '';
                    formContainer.appendChild(successMessage);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Sorry, there was an error. Please try again later.');
                    
                    // Reset form state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
