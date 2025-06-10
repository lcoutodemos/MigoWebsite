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
                
                // Send to Google Sheets through Netlify function
                fetch('/.netlify/functions/join-waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Success message
                        alert('Thank you for joining our beta program! We\'ll reach out to ' + email + ' when Migo is ready.');
                        this.reset();
                    } else {
                        alert('Error: ' + (data.message || 'Something went wrong'));
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                })
                .finally(() => {
                    // Reset button
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
