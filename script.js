/* ============================================
   GLOWLUX — Premium Beauty Website Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ NAVBAR SCROLL EFFECT ============
    const navbar = document.getElementById('mainNavbar');
    const backToTop = document.getElementById('backToTop');
    
    const handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Navbar background on scroll
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ ACTIVE NAV LINK ON SCROLL ============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // ============ SMOOTH SCROLL FOR NAV LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // ============ SCROLL REVEAL ANIMATION ============
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============ HERO PARTICLES ============
    const particlesContainer = document.getElementById('heroParticles');
    
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 8 + 3;
        const colors = [
            'rgba(255, 153, 200, 0.4)',
            'rgba(255, 61, 138, 0.3)',
            'rgba(255, 105, 168, 0.35)',
            'rgba(233, 30, 109, 0.25)',
            'rgba(255, 194, 223, 0.5)',
            'rgba(201, 21, 98, 0.2)'
        ];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 8 + 8}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation ends
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 20000);
    };

    // Create initial particles
    for (let i = 0; i < 25; i++) {
        setTimeout(() => createParticle(), i * 300);
    }

    // Continuously create particles
    setInterval(createParticle, 2000);

    // ============ COUNTER ANIMATION ============
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };
        
        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ============ PRODUCT FILTER ============
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });

    // ============ WISHLIST TOGGLE ============
    document.querySelectorAll('.action-btn[title="Add to Wishlist"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('bi-heart')) {
                icon.classList.replace('bi-heart', 'bi-heart-fill');
                icon.style.color = '#f43f5e';
                showToast('Added to wishlist! ❤️');
            } else {
                icon.classList.replace('bi-heart-fill', 'bi-heart');
                icon.style.color = '';
                showToast('Removed from wishlist');
            }
            
            // Pulse animation
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => btn.style.transform = '', 200);
        });
    });

    // ============ ADD TO CART ============
    document.querySelectorAll('.action-btn[title="Add to Cart"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showToast('Added to cart! 🛒');
            
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => btn.style.transform = '', 200);
        });
    });

    // ============ TOAST NOTIFICATION ============
    const toastEl = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    let toastTimeout;

    function showToast(message) {
        if (toastTimeout) clearTimeout(toastTimeout);
        
        toastMsg.textContent = message;
        toastEl.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }

    // ============ CONTACT FORM HANDLER ============
    const contactForm = document.getElementById('contactFormElement');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('contactSubmitBtn');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showToast('Message sent successfully! We\'ll get back to you soon. ✉️');
                contactForm.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ============ CTA FORM HANDLER ============
    const ctaForm = document.getElementById('ctaForm');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed successfully! Welcome to GlowLux! 🎉');
            ctaForm.reset();
        });
    }

    // ============ FOOTER NEWSLETTER ============
    const footerNewsletter = document.getElementById('footerNewsletter');
    
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed! You\'ll receive our latest updates. 💌');
            footerNewsletter.reset();
        });
    }

    // ============ TILT EFFECT ON PRODUCT CARDS ============
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============ SERVICE CARD STAGGER ============
    const serviceCards = document.querySelectorAll('.service-card');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        serviceObserver.observe(card);
    });

    // ============ HERO IMAGE PARALLAX ============
    const heroImg = document.querySelector('.hero-image-wrapper');
    
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        });
    }

    // ============ TYPING EFFECT ON HERO BADGE ============
    const heroBadge = document.querySelector('.hero-badge');
    
    if (heroBadge) {
        const originalText = heroBadge.textContent;
        heroBadge.textContent = '';
        heroBadge.style.visibility = 'visible';
        
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                heroBadge.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // ============ MOUSE CURSOR GLOW (DESKTOP ONLY) ============
    if (window.matchMedia('(min-width: 992px)').matches) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 61, 138, 0.06) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transition: transform 0.15s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // ============ PRELOADER / INITIAL LOAD ============
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Fallback in case load already fired
    if (document.readyState === 'complete') {
        document.body.style.opacity = '1';
    }

});
