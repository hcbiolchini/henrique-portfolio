// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactBtn = document.getElementById('contactBtn');
const projectsBtn = document.getElementById('projectsBtn');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero button functionality
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

if (projectsBtn) {
    projectsBtn.addEventListener('click', () => {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const offsetTop = projectsSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add fade-in class to elements
function addFadeInClass() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.project-card, .skill-category, .stat');
    
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    cards.forEach(card => {
        card.classList.add('fade-in');
    });
}

// Navbar background on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Active navigation link highlighting
function handleActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Project data
const projectData = {
    'Market Analysis Dashboard': {
        title: 'Market Analysis Dashboard',
        overview: 'A comprehensive market analysis tool developed using Excel and advanced data visualization techniques. This dashboard helps businesses understand market trends, analyze competitor performance, and make informed strategic decisions based on real-time data insights.',
        features: [
            'Interactive data visualization with dynamic charts and graphs',
            'Real-time market trend analysis and forecasting',
            'Competitor performance tracking and comparison',
            'Customizable reporting templates for different business needs',
            'Automated data collection from multiple sources',
            'Export functionality for presentations and reports'
        ],
        technologies: ['Excel Advanced', 'VBA Programming', 'Data Analysis', 'Chart Creation', 'Pivot Tables', 'Power Query'],
        challenges: 'The main challenge was handling large datasets efficiently while maintaining dashboard performance. I solved this by implementing data optimization techniques and creating modular VBA functions for better memory management.',
        results: 'The dashboard reduced market analysis time by 60% and improved decision-making accuracy by 40%. It was adopted by 3 different departments and became a standard tool for quarterly business reviews.',
        image: '',
        liveDemo: '',
        github: ''
    },
    'Business Innovation Proposal': {
        title: 'Business Innovation Proposal',
        overview: 'A detailed business proposal for a sustainable technology startup focused on renewable energy solutions. This comprehensive document includes market research, financial projections, implementation strategy, and risk assessment for launching an innovative green technology company.',
        features: [
            'Comprehensive market research and competitive analysis',
            'Detailed financial modeling with 5-year projections',
            'Sustainable technology solution design and implementation plan',
            'Risk assessment and mitigation strategies',
            'Go-to-market strategy and customer acquisition plan',
            'Partnership and funding proposal framework'
        ],
        technologies: ['Business Strategy', 'Financial Modeling', 'Market Research', 'PowerPoint', 'Excel', 'Presentation Design'],
        challenges: 'Balancing ambitious growth projections with realistic market constraints was challenging. I addressed this by conducting extensive market research and creating multiple scenario models to validate assumptions.',
        results: 'The proposal secured initial funding of $50,000 and led to partnerships with two renewable energy companies. It served as a template for future business proposals and was presented at 3 industry conferences.',
        image: '',
        liveDemo: '',
        github: ''
    },
    'Team Leadership Initiative': {
        title: 'Team Leadership Initiative',
        overview: 'Led a cross-functional team in developing and implementing a comprehensive process improvement initiative that significantly increased organizational efficiency. This project involved team management, process analysis, change management, and performance measurement.',
        features: [
            'Cross-functional team coordination and management',
            'Process mapping and bottleneck identification',
            'Change management strategy development and implementation',
            'Performance metrics design and tracking system',
            'Team training and development programs',
            'Continuous improvement framework establishment'
        ],
        technologies: ['Leadership', 'Project Management', 'Process Improvement', 'Team Management', 'Change Management', 'Performance Analytics'],
        challenges: 'Managing resistance to change across different departments was the biggest challenge. I overcame this by implementing a phased approach with clear communication, training programs, and demonstrating quick wins to build momentum.',
        results: 'Achieved 25% increase in overall efficiency, reduced process completion time by 40%, and improved team satisfaction scores by 35%. The initiative was recognized by senior management and implemented company-wide.',
        image: '',
        liveDemo: '',
        github: ''
    }
};

// Modal functionality
function openModal(projectTitle) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectTitle];
    
    if (!project) {
        showNotification('Project details not found', 'error');
        return;
    }
    
    // Populate modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalOverview').textContent = project.overview;
    document.getElementById('modalChallenges').textContent = project.challenges;
    document.getElementById('modalResults').textContent = project.results;
    
    // Populate features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Populate technologies
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        techContainer.appendChild(span);
    });
    
    // Handle project image
    const modalImage = document.getElementById('modalImage');
    if (project.image) {
        modalImage.src = project.image;
        modalImage.style.display = 'block';
    } else {
        modalImage.style.display = 'none';
    }
    
    // Handle action buttons
    const liveBtn = document.getElementById('modalLiveBtn');
    const githubBtn = document.getElementById('modalGithubBtn');
    
    if (project.liveDemo) {
        liveBtn.style.display = 'inline-block';
        liveBtn.onclick = () => window.open(project.liveDemo, '_blank');
    } else {
        liveBtn.style.display = 'none';
    }
    
    if (project.github) {
        githubBtn.style.display = 'inline-block';
        githubBtn.onclick = () => window.open(project.github, '_blank');
    } else {
        githubBtn.style.display = 'none';
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Project card interactions
function addProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.btn-outline');
        
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = card.querySelector('h3').textContent;
                openModal(projectTitle);
            });
        }
    });
}

// Add modal event listeners
function addModalEventListeners() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking the Close button
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside of it
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Initialize all functionality
function init() {
    addFadeInClass();
    setupIntersectionObserver();
    addProjectCardInteractions();
    addModalEventListeners();
    
    // Add event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        handleNavbarScroll();
        handleActiveNavLink();
    });
    
    // Initial calls
    handleScrollAnimations();
    handleNavbarScroll();
    handleActiveNavLink();
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);