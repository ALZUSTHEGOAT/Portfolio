// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Create page transition element
const transitionElement = document.createElement('div');
transitionElement.className = 'page-transition';
document.body.appendChild(transitionElement);

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        updateThemeIcon(savedTheme === 'dark');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'bx bx-sun' : 'bx bx-moon';
    }

    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Initialize other features
    animateSkillBars();

    // CV Download Button Functionality
    const downloadBtn = document.getElementById('downloadCV');
    
    // Function to check if CV file exists
    async function checkCVExists() {
        try {
            const response = await fetch('assets/cv.pdf', { method: 'HEAD' });
            if (response.ok) {
                downloadBtn.removeAttribute('disabled');
            }
        } catch (error) {
            console.log('CV file not found');
        }
    }

    // Check for CV file when page loads
    checkCVExists();

    // Project Video Functionality
    function initializeProjectVideos() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const playBtn = card.querySelector('.play-btn');
            const thumbnail = card.querySelector('.thumbnail');
            const videoContainer = card.querySelector('.video-container');
            const video = card.querySelector('video');
            
            if (playBtn && thumbnail && videoContainer && video) {
                playBtn.addEventListener('click', () => {
                    thumbnail.classList.add('hidden');
                    videoContainer.classList.add('active');
                    video.play();
                });
                
                video.addEventListener('ended', () => {
                    thumbnail.classList.remove('hidden');
                    videoContainer.classList.remove('active');
                    video.currentTime = 0;
                });
                
                // Handle video error
                video.addEventListener('error', () => {
                    console.log('Error loading video');
                    thumbnail.classList.remove('hidden');
                    videoContainer.classList.remove('active');
                });
            }
        });
    }

    initializeProjectVideos();

    // Typing Animation
    function typeText(text, element, speed = 100) {
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    const typedText = document.getElementById('typed-text');
    if (typedText) {
        typeText('ALASSANE TRAORE', typedText, 150);
    }
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateBar = (bar) => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    };

    skillBars.forEach(bar => {
        animateBar(bar);
    });
}

// Project Navigation
const projectsContainer = document.querySelector('.projects-grid');
const prevButton = document.querySelector('.prev-project');
const nextButton = document.querySelector('.next-project');
let currentProject = 0;

function updateProjects() {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        if (index === currentProject) {
            project.style.display = 'block';
            project.style.opacity = '1';
        } else {
            project.style.display = 'none';
            project.style.opacity = '0';
        }
    });
}

if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        const projects = document.querySelectorAll('.project-card');
        currentProject = (currentProject - 1 + projects.length) % projects.length;
        updateProjects();
    });

    nextButton.addEventListener('click', () => {
        const projects = document.querySelectorAll('.project-card');
        currentProject = (currentProject + 1) % projects.length;
        updateProjects();
    });
}

// Smooth Scroll with Page Transition
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) return;

        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        targetSection.classList.add('active');
        
        // Scroll to target
        targetSection.scrollIntoView({ behavior: 'auto' });
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Here you would typically send the form data to your server
            // For now, we'll simulate a delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            submitBtn.innerHTML = '<i class="bx bx-check"></i> Sent Successfully';
            submitBtn.style.backgroundColor = '#00cc66';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Show error message
            submitBtn.innerHTML = '<i class="bx bx-error"></i> Failed to Send';
            submitBtn.style.backgroundColor = '#ff3333';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveSection() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const currentId = section.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
            
            // Add active class to current section
            sections.forEach(s => s.classList.remove('active'));
            section.classList.add('active');
        }
    });
}

// Update active section on scroll
window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// Text animation
const animateText = () => {
    const text = "Hello, I'm Alassane Traore";
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        typingText.textContent = text;
        // The CSS animation will handle the fade in/out
        // This will reset the animation every 10 seconds
        setInterval(() => {
            typingText.style.animation = 'none';
            typingText.offsetHeight; // Trigger reflow
            typingText.style.animation = 'fadeInOut 10s infinite';
        }, 10000);
    }
};

// Typing Animation
const text = document.querySelector('.hero-content h1 span');
if (text) {
    const originalText = text.textContent;
    text.textContent = '';

    let charIndex = 0;
    function type() {
        if (charIndex < originalText.length) {
            text.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }

    // Start typing animation when page loads
    setTimeout(type, 1000);
}

// Initialize first section
window.addEventListener('load', () => {
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
    
    // Initialize projects if they exist
    if (projectsContainer) {
        updateProjects();
    }
});
