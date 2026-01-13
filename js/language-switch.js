// Language switching functionality (shared across pages)
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const languageToggleMobile = document.getElementById('languageToggleMobile');
    const htmlElement = document.documentElement;

    // Function to handle language switch and persist
    function handleLanguageSwitch(isChecked) {
        const language = isChecked ? 'ar' : 'en';
        switchLanguage(language);
        try { localStorage.setItem('siteLang', language); } catch (e) {}
    }

    // Initialize from saved preference (default Arabic if none)
    let savedLanguage = 'ar';
    try {
        const stored = localStorage.getItem('siteLang');
        if (stored === 'en' || stored === 'ar') savedLanguage = stored;
    } catch (e) {}

    // Sync toggles to saved language (checked = Arabic)
    if (languageToggle) languageToggle.checked = (savedLanguage === 'ar');
    if (languageToggleMobile) languageToggleMobile.checked = (savedLanguage === 'ar');
    // Apply language immediately
    switchLanguage(savedLanguage);

    // Add event listeners for both toggles (keep them in sync)
    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
            handleLanguageSwitch(this.checked);
            if (languageToggleMobile) languageToggleMobile.checked = this.checked;
        });
    }

    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('change', function() {
            handleLanguageSwitch(this.checked);
            if (languageToggle) languageToggle.checked = this.checked;
        });
    }
    
    // Handle window resize for mobile RTL
    window.addEventListener('resize', function() {
        let currentLanguage = 'ar';
        try { currentLanguage = localStorage.getItem('siteLang') || 'ar'; } catch (e) {}
        
        // Re-apply styles when window is resized
        if (window.innerWidth <= 768) {
            // Mobile view
            const servicesSection = document.querySelector('.home-practice-areas');
            const testimonialsSection = document.querySelector('.testimonials');
            
            if (servicesSection) {
                const servicesElements = document.querySelectorAll('.home-practice-areas, .home-practice-areas *');
                servicesElements.forEach(element => {
                    if (currentLanguage === 'ar') {
                        element.style.direction = 'rtl';
                        element.style.textAlign = 'right';
                    } else {
                        element.style.direction = 'ltr';
                        element.style.textAlign = 'left';
                    }
                });
            }
            
            if (testimonialsSection) {
                const testimonialsElements = document.querySelectorAll('.testimonials, .testimonials *');
                testimonialsElements.forEach(element => {
                    if (currentLanguage === 'ar') {
                        element.style.direction = 'rtl';
                        element.style.textAlign = 'right';
                    } else {
                        element.style.direction = 'ltr';
                        element.style.textAlign = 'left';
                    }
                });
            }
        } else {
            // Desktop view - keep testimonials in LTR
            const testimonialsSection = document.querySelector('.testimonials');
            if (testimonialsSection) {
                const testimonialsElements = document.querySelectorAll('.testimonials, .testimonials *');
                testimonialsElements.forEach(element => {
                    element.style.direction = 'ltr';
                    element.style.textAlign = 'left';
                });
            }
        }
    });
    
    function switchLanguage(language) {
        // Set HTML lang attribute
        htmlElement.setAttribute('lang', language);
        htmlElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
        
        // Force header and all its contents to stay LTR
        const header = document.querySelector('.header');
        if (header) {
            // Set header and all its contents to LTR
            header.setAttribute('dir', 'ltr');
            header.querySelectorAll('*').forEach(element => {
                element.setAttribute('dir', 'ltr');
            });
            
            // Specifically target navigation menu items
            const navItems = header.querySelectorAll('.nav-item-wrapper, .nav-link, .header-navigation li');
            navItems.forEach(item => {
                item.style.direction = 'ltr';
                item.style.textAlign = 'left';
            });
        }

        // Keep home-about-us section in LTR
        const homeAboutSection = document.querySelector('.home-about-us');
        if (homeAboutSection) {
            homeAboutSection.setAttribute('dir', 'ltr');
            homeAboutSection.querySelectorAll('*').forEach(element => {
                element.setAttribute('dir', 'ltr');
            });
        }
        
        // Handle testimonials section based on screen size and language
        const testimonialsSection = document.querySelector('.testimonials');
        if (testimonialsSection) {
            if (window.innerWidth <= 768) {
                // On mobile, set direction based on language
                testimonialsSection.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
                testimonialsSection.style.textAlign = language === 'ar' ? 'right' : 'left';
                testimonialsSection.style.direction = language === 'ar' ? 'rtl' : 'ltr';
                
                // Handle testimonials content
                const testimonialElements = testimonialsSection.querySelectorAll('*');
                testimonialElements.forEach(element => {
                    element.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
                    element.style.textAlign = language === 'ar' ? 'right' : 'left';
                    element.style.direction = language === 'ar' ? 'rtl' : 'ltr';
                });
            } else {
                // On desktop, keep in LTR
                testimonialsSection.setAttribute('dir', 'ltr');
                testimonialsSection.style.textAlign = 'left';
                testimonialsSection.style.direction = 'ltr';
                
                const testimonialElements = testimonialsSection.querySelectorAll('*');
                testimonialElements.forEach(element => {
                    element.setAttribute('dir', 'ltr');
                    element.style.textAlign = 'left';
                    element.style.direction = 'ltr';
                });
            }
        }
        
        // Set direction and text alignment for the rest of the document
        document.querySelectorAll('body > *:not(.header):not(.home-about-us):not(.testimonials)').forEach(element => {
            element.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
            element.style.textAlign = language === 'ar' ? 'right' : 'left';
        });
        
        // Specifically handle the services section for proper RTL layout
        const servicesSection = document.querySelector('.home-practice-areas');
        if (servicesSection) {
            servicesSection.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
            servicesSection.style.textAlign = language === 'ar' ? 'right' : 'left';
            servicesSection.style.direction = language === 'ar' ? 'rtl' : 'ltr';
            
            // Handle the services grid
            const servicesGrid = servicesSection.querySelector('.home-practice-areas-grid');
            if (servicesGrid) {
                servicesGrid.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
                servicesGrid.style.textAlign = language === 'ar' ? 'right' : 'left';
                servicesGrid.style.direction = language === 'ar' ? 'rtl' : 'ltr';
            }
            
            // Handle individual service cards
            const serviceCards = servicesSection.querySelectorAll('.practice-area-card');
            serviceCards.forEach(card => {
                card.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
                card.style.textAlign = language === 'ar' ? 'right' : 'left';
                card.style.direction = language === 'ar' ? 'rtl' : 'ltr';
                
                // Handle card content
                const cardContent = card.querySelector('.practice-area-card-content');
                if (cardContent) {
                    cardContent.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
                    cardContent.style.textAlign = language === 'ar' ? 'right' : 'left';
                    cardContent.style.direction = language === 'ar' ? 'rtl' : 'ltr';
                }
                
                // Handle headings and paragraphs within cards
                const headings = card.querySelectorAll('h3');
                const paragraphs = card.querySelectorAll('p');
                
                headings.forEach(heading => {
                    heading.style.textAlign = language === 'ar' ? 'right' : 'left';
                });
                
                paragraphs.forEach(paragraph => {
                    paragraph.style.textAlign = language === 'ar' ? 'right' : 'left';
                });
            });
        }
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            const text = element.getAttribute(`data-${language}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Force a reflow to ensure styles are applied
        setTimeout(() => {
            if (servicesSection) {
                servicesSection.style.display = 'none';
                servicesSection.offsetHeight; // Force reflow
                servicesSection.style.display = '';
            }
        }, 10);
        
        // Additional mobile-specific RTL handling
        if (window.innerWidth <= 768) {
            // Force mobile RTL styles for services section
            const servicesElements = document.querySelectorAll('.home-practice-areas, .home-practice-areas *');
            servicesElements.forEach(element => {
                if (language === 'ar') {
                    element.style.direction = 'rtl';
                    element.style.textAlign = 'right';
                } else {
                    element.style.direction = 'ltr';
                    element.style.textAlign = 'left';
                }
            });
            
            // Force mobile RTL/LTR styles for testimonials section
            const testimonialsElements = document.querySelectorAll('.testimonials, .testimonials *');
            testimonialsElements.forEach(element => {
                if (language === 'ar') {
                    element.style.direction = 'rtl';
                    element.style.textAlign = 'right';
                } else {
                    element.style.direction = 'ltr';
                    element.style.textAlign = 'left';
                }
            });
        }
        }

        // Re-attach newsletter handlers in case DOM elements changed after language switch
        if (typeof attachNewsletterHandlers === 'function') {
            try { attachNewsletterHandlers(); } catch (err) { console.error('attachNewsletterHandlers error', err); }
        }

    // Newsletter form handler: show success UI and open WhatsApp with the submitted email
    function attachNewsletterHandlers() {
        const phone = '966557063869'; // target WhatsApp number (country code +966, no plus or spaces)
        const forms = document.querySelectorAll('form[id*="Newsletter"], form[name*="Newsletter"], .footer-newsletter-input-wrapper');
        forms.forEach(form => {
            // avoid binding twice
            if (form.__newsletterAttached) return;
            form.__newsletterAttached = true;

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Show success UI immediately (even if validation or send fails)
                try {
                    const containerImmediate = form.closest('.footer-form-block') || form.parentElement;
                    if (containerImmediate) {
                        const successImmediate = containerImmediate.querySelector('.w-form-done');
                        const errorImmediate = containerImmediate.querySelector('.w-form-fail');
                        // Hide form and hide error, show success
                        form.style.display = 'none';
                        if (errorImmediate) errorImmediate.style.display = 'none';
                        if (successImmediate) {
                            successImmediate.style.display = '';
                            let langImmediate = 'en';
                            try { langImmediate = localStorage.getItem('siteLang') || document.documentElement.getAttribute('lang') || 'en'; } catch (e) { langImmediate = document.documentElement.getAttribute('lang') || 'en'; }
                            const innerImmediate = successImmediate.querySelector('[data-en], [data-ar]');
                            if (innerImmediate) {
                                const textImmediate = innerImmediate.getAttribute(`data-${langImmediate}`);
                                if (textImmediate) innerImmediate.textContent = textImmediate;
                            }
                            // Add meta info
                            const pageUrlImmediate = window.location.href || '';
                            const pageTitleImmediate = document.title || '';
                            const labelsImmediate = { en: { page: 'Page', url: 'URL' }, ar: { page: 'الصفحة', url: 'الرابط' } };
                            const labelImmediate = labelsImmediate[langImmediate] || labelsImmediate.en;
                            let metaElImmediate = successImmediate.querySelector('.newsletter-meta');
                            if (!metaElImmediate) {
                                metaElImmediate = document.createElement('div');
                                metaElImmediate.className = 'newsletter-meta';
                                successImmediate.appendChild(metaElImmediate);
                            }
                            metaElImmediate.textContent = `${labelImmediate.page}: ${pageTitleImmediate} — ${labelImmediate.url}: ${pageUrlImmediate}`;
                        }
                    }
                } catch (err) {
                    console.error('newsletter immediate UI error', err);
                }

                // Continue to prepare the WhatsApp message (use email if provided)
                const emailInput = form.querySelector('input[type="email"], input[name="email"]');
                let email = '(no email provided)';
                if (emailInput) {
                    // Report validity to the user but proceed regardless
                    if (!emailInput.checkValidity()) {
                        try { emailInput.reportValidity(); } catch (err) { /* ignore */ }
                    }
                    email = (emailInput.value || '').trim() || email;
                }

                // Open WhatsApp chat with the provided email (opens in new tab)
                try {
                    const pageUrl = window.location.href || '';
                    const pageTitle = document.title || '';
                    let lang = 'en';
                    try { lang = localStorage.getItem('siteLang') || document.documentElement.getAttribute('lang') || 'en'; } catch (e) { lang = document.documentElement.getAttribute('lang') || 'en'; }
                    const message = `New newsletter signup:\nEmail: ${email}\nPage: ${pageTitle}\nURL: ${pageUrl}\nLanguage: ${lang}`;
                    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                    window.open(waUrl, '_blank');
                } catch (err) {
                    console.error('Failed to open WhatsApp URL', err);
                }
            });
        });
    }

    // Attach newsletter handlers once on initial load
    try { attachNewsletterHandlers(); } catch (err) { /* ignore */ }

});
