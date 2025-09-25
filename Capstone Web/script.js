// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click handlers for all navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const buildings = document.querySelectorAll('.building');

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        buildings.forEach((building, index) => {
            building.style.transform = `translateY(${scrolled * (0.2 + index * 0.1)}px)`;
        });
    });

    // Animate progress bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFills = entry.target.querySelectorAll('.progress-fill');
                progressFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }
        });
    }, observerOptions);

    const progressSection = document.querySelector('.development-progress');
    if (progressSection) {
        progressObserver.observe(progressSection);
    }

    // Add destruction particle effect on button clicks
    function createParticles(event) {
        const button = event.target;
        const rect = button.getBoundingClientRect();
        const particles = [];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = '#ff4444';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 20;
            const velocity = Math.random() * 100 + 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let x = 0;
            let y = 0;
            let opacity = 1;

            const animate = () => {
                x += vx * 0.016;
                y += vy * 0.016 + 200 * 0.016 * 0.016; // gravity
                opacity -= 0.02;

                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(particle);
                }
            };

            requestAnimationFrame(animate);
        }
    }

    // Add particle effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', createParticles);
    });

    // Glitch effect enhancement
    function enhanceGlitch() {
        const glitchElement = document.querySelector('.glitch');
        if (!glitchElement) return;

        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                glitchElement.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0000,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0000ff,
                    0 0 20px #ff4444
                `;

                setTimeout(() => {
                    glitchElement.style.textShadow = `
                        0 0 5px #ff4444,
                        0 0 10px #ff4444,
                        0 0 20px #ff4444
                    `;
                }, 50);
            }
        }, 100);
    }

    enhanceGlitch();

    // Building destruction animation trigger
    function triggerBuildingDestruction() {
        const buildings = document.querySelectorAll('.building');
        buildings.forEach((building, index) => {
            setTimeout(() => {
                building.style.animation = 'none';
                building.style.transform = `translateY(100px) rotate(${Math.random() * 30 - 15}deg)`;
                building.style.opacity = '0.5';

                setTimeout(() => {
                    building.style.animation = 'shake 3s infinite';
                    building.style.transform = 'translateX(0) rotate(0deg)';
                    building.style.opacity = '1';
                }, 2000);
            }, index * 500);
        });
    }

    // Trigger building destruction every 10 seconds
    setInterval(triggerBuildingDestruction, 10000);

    // Add hover effects to feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers for demo buttons with alerts
    const demoButtons = document.querySelectorAll('.cta-button');
    demoButtons.forEach(button => {
        if (button.textContent.includes('DOWNLOAD') || button.textContent.includes('WISHLIST') || button.textContent.includes('PLAY NOW')) {
            button.addEventListener('click', function(e) {
                if (!this.getAttribute('onclick')) {
                    e.preventDefault();
                    alert('Coming Soon! The demo will be available when development reaches 100%.');
                }
            });
        }
    });
});