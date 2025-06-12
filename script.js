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
                
                // Use FormSubmit.co service - super simple, no backend needed
                const formSubmitEmail = 'lucascouto.demos@gmail.com'; // Change this to your email
                
                const hiddenForm = document.createElement('form');
                hiddenForm.style.display = 'none';
                hiddenForm.method = 'POST';
                hiddenForm.action = `https://formsubmit.co/${formSubmitEmail}`;
                
                // Email field
                const emailField = document.createElement('input');
                emailField.type = 'email';
                emailField.name = 'email';
                emailField.value = email;
                
                // Subject field
                const subjectField = document.createElement('input');
                subjectField.type = 'hidden';
                subjectField.name = '_subject';
                subjectField.value = 'New Migo Beta Signup';
                
                // Redirect field
                const redirectField = document.createElement('input');
                redirectField.type = 'hidden';
                redirectField.name = '_next';
                redirectField.value = window.location.href;
                
                // Add fields to form
                hiddenForm.appendChild(emailField);
                hiddenForm.appendChild(subjectField);
                hiddenForm.appendChild(redirectField);
                
                // Add form to document and submit
                document.body.appendChild(hiddenForm);
                hiddenForm.submit();
                
                // Reset form state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
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
