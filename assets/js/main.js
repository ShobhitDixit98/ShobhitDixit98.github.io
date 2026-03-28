// ============================================
// Portfolio Application - Main JavaScript
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ============================================
// Initialize Application
// ============================================
async function initializeApp() {
    try {
        // Initialize core interactive features first so controls are always responsive
        initializeTheme();
        initializeNavigation();
        initializeScrollEffects();
        initializeScrollReveal();
        initializeBackToTop();

        // Initialize particles background
        initializeParticles();

        // Load all data sections
        await Promise.all([
            loadSiteConfig(),
            loadNavigation(),
            loadHero(),
            loadAbout(),
            loadExperience(),
            loadSkills(),
            loadProjects(),
            loadEducation(),
            loadContact(),
            loadFooter()
        ]);

        // Re-run navigation setup after dynamic menu links are rendered
        initializeNavigation();

        console.log('Portfolio loaded successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// ============================================
// Load Site Configuration
// ============================================
async function loadSiteConfig() {
    try {
        const response = await fetch('data/site-config.json');
        const data = await response.json();

        // Update meta tags
        document.title = data.title;
        document.querySelector('meta[name="description"]').setAttribute('content', data.description);
        document.querySelector('meta[name="keywords"]').setAttribute('content', data.keywords);
        document.querySelector('meta[name="author"]').setAttribute('content', data.author);
    } catch (error) {
        console.error('Error loading site config:', error);
    }
}

// ============================================
// Load Navigation
// ============================================
async function loadNavigation() {
    try {
        const response = await fetch('data/navigation.json');
        const data = await response.json();

        // Set brand name
        const brandElement = document.getElementById('nav-brand');
        if (brandElement) {
            brandElement.textContent = data.brand.name;
            brandElement.href = data.brand.href;
        }

        // Build navigation menu
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.innerHTML = data.menuItems.map(item => `
                <li>
                    <a href="${item.href}" class="nav-link">
                        <i class="${item.icon}"></i>
                        ${item.text}
                    </a>
                </li>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// ============================================
// Load Hero Section
// ============================================
async function loadHero() {
    try {
        const response = await fetch('data/hero.json');
        const data = await response.json();

        // Render headshot
        const headshotContainer = document.getElementById('hero-headshot');
        if (headshotContainer && data.headshot) {
            headshotContainer.innerHTML = `<img src="${data.headshot}" alt="${data.name}" loading="eager">`;
        }

        // Set text content
        document.getElementById('hero-greeting').textContent = data.greeting;
        document.getElementById('hero-name').innerHTML = `${data.name.split(' ')[0]} <span>${data.name.split(' ').slice(1).join(' ')}</span>`;
        document.getElementById('hero-title').textContent = data.title;
        document.getElementById('hero-tagline').textContent = data.tagline;
        document.getElementById('hero-summary').textContent = data.summary;

        // Render highlights
        const highlightsContainer = document.getElementById('hero-highlights');
        if (highlightsContainer && data.highlights) {
            highlightsContainer.innerHTML = data.highlights.map(highlight => `
                <div class="highlight-item">
                    <i class="${highlight.icon}" style="color: ${highlight.color}"></i>
                    <span>${highlight.text}</span>
                </div>
            `).join('');
        }

        // Render CTA buttons
        const ctaContainer = document.getElementById('hero-cta');
        if (ctaContainer && data.cta && data.cta.buttons) {
            ctaContainer.innerHTML = data.cta.buttons.map(button => `
                <a href="${button.href}" class="btn btn-${button.type}">
                    ${button.icon ? `<i class="${button.icon}"></i>` : ''}
                    ${button.text}
                </a>
            `).join('');
        }

        // Render social links
        const socialContainer = document.getElementById('hero-social');
        if (socialContainer && data.socialLinks) {
            socialContainer.innerHTML = data.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${link.platform}">
                    <i class="${link.icon}"></i>
                </a>
            `).join('');
        }

        // Render scroll indicator
        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator && data.scrollIndicator) {
            scrollIndicator.innerHTML = `
                <span>${data.scrollIndicator.text}</span>
                <i class="${data.scrollIndicator.icon}"></i>
            `;
        }
    } catch (error) {
        console.error('Error loading hero section:', error);
    }
}

// ============================================
// Load About Section
// ============================================
async function loadAbout() {
    try {
        const response = await fetch('data/about.json');
        const data = await response.json();

        // Set section title
        document.getElementById('about-title').textContent = data.sectionTitle;

        // Render paragraphs
        const textContainer = document.getElementById('about-text');
        if (textContainer && data.paragraphs) {
            textContainer.innerHTML = data.paragraphs.map(paragraph => `
                <p>${paragraph}</p>
            `).join('');
        }

        // Render statistics
        const statsContainer = document.getElementById('about-stats');
        if (statsContainer && data.statistics) {
            statsContainer.innerHTML = data.statistics.map(stat => `
                <div class="stat-card">
                    <i class="${stat.icon}" style="color: ${stat.color}"></i>
                    <span class="stat-value">${stat.value}</span>
                    <span class="stat-label">${stat.label}</span>
                </div>
            `).join('');
        }

        // Render download CV button
        const actionsContainer = document.getElementById('about-actions');
        if (actionsContainer && data.downloadCV) {
            actionsContainer.innerHTML = `
                <a href="${data.downloadCV.href}" download class="btn btn-primary">
                    <i class="${data.downloadCV.icon}"></i>
                    ${data.downloadCV.text}
                </a>
            `;
        }
    } catch (error) {
        console.error('Error loading about section:', error);
    }
}

// ============================================
// Load Experience Section
// ============================================
async function loadExperience() {
    try {
        const response = await fetch('data/experience.json');
        const data = await response.json();

        // Set section title
        document.getElementById('experience-title').textContent = data.sectionTitle;

        // Render experience cards
        const experienceGrid = document.getElementById('experience-grid');
        if (experienceGrid && data.experiences) {
            experienceGrid.innerHTML = data.experiences.map(exp => `
                <div class="experience-card">
                    ${exp.image ? `
                        <div class="experience-image">
                            <img src="${exp.image}" alt="${exp.company}" loading="lazy">
                            <div class="experience-image-overlay" style="background: linear-gradient(180deg, transparent 20%, ${exp.color || '#667eea'}44 100%)"></div>
                        </div>
                    ` : ''}
                    <div class="experience-body">
                        <div class="experience-header">
                            <h3 class="experience-title">${exp.title}</h3>
                            <p class="experience-company">
                                ${exp.company} ${exp.location ? `• ${exp.location}` : ''}
                            </p>
                            <p class="experience-period">
                                <i class="fas fa-calendar-alt"></i>
                                ${exp.period}
                                ${exp.type ? `<span class="experience-type">• ${exp.type}</span>` : ''}
                            </p>
                        </div>
                        <p class="experience-description">${exp.description}</p>
                        ${exp.responsibilities ? `
                            <ul class="experience-responsibilities">
                                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                            </ul>
                        ` : ''}
                        ${exp.technologies ? `
                            <div class="experience-tech">
                                ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading experience section:', error);
    }
}

// ============================================
// Load Skills Section
// ============================================
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();

        // Set section title
        document.getElementById('skills-title').textContent = data.sectionTitle;

        // Render skill categories
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid && data.categories) {
            skillsGrid.innerHTML = data.categories.map(category => `
                <div class="skill-category">
                    ${category.image ? `
                        <div class="skill-category-image">
                            <img src="${category.image}" alt="${category.category}" loading="lazy">
                            <div class="skill-category-image-overlay" style="background: linear-gradient(180deg, transparent 20%, ${category.color}33 100%)"></div>
                        </div>
                    ` : ''}
                    <div class="skill-category-body">
                        <div class="skill-category-header">
                            <div class="skill-category-icon" style="background: ${category.color}20; color: ${category.color}">
                                <i class="${category.icon}"></i>
                            </div>
                            <h3 class="skill-category-title">${category.category}</h3>
                        </div>
                        <div class="skill-list">
                            ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading skills section:', error);
    }
}

// ============================================
// Load Projects Section
// ============================================
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();

        // Set section title
        document.getElementById('projects-title').textContent = data.sectionTitle;

        // Render projects
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid && data.projects) {
            projectsGrid.innerHTML = data.projects.map(project => `
                <div class="project-card">
                    ${project.image ? `
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}" loading="lazy">
                            <div class="project-image-overlay"></div>
                        </div>
                    ` : ''}
                    <div class="project-icon" style="background: ${project.color}">
                        <i class="${project.icon}"></i>
                    </div>
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    <p class="project-description">${project.description}</p>
                    ${project.technologies ? `
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${project.links ? `
                        <div class="project-links">
                            ${project.links.github ? `
                                <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    <i class="fab fa-github"></i>
                                    Code
                                </a>
                            ` : ''}
                            ${project.links.demo ? `
                                <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                    Live Demo
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}
                    ${project.stats ? `
                        <div class="project-stats">
                            ${Object.entries(project.stats).map(([key, value]) => `
                                <div class="project-stat">
                                    <span class="project-stat-value">${value}</span>
                                    <span class="project-stat-label">${key}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading projects section:', error);
    }
}

// ============================================
// Load Education Section
// ============================================
async function loadEducation() {
    try {
        const response = await fetch('data/education.json');
        const data = await response.json();

        // Set section title
        document.getElementById('education-title').textContent = data.sectionTitle;

        // Render education items
        const educationGrid = document.getElementById('education-grid');
        if (educationGrid && data.education) {
            educationGrid.innerHTML = data.education.map(edu => `
                <div class="education-card">
                    ${edu.logo ? `
                        <div class="education-logo">
                            <img src="${edu.logo}" alt="${edu.institution}" loading="lazy">
                        </div>
                    ` : ''}
                    <div class="education-body">
                        <h3 class="education-degree">${edu.degree}</h3>
                        <p class="education-institution">${edu.institution}</p>
                        <p class="education-period">${edu.period}</p>
                        ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
                        ${edu.achievements ? `
                            <ul class="education-achievements">
                                ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }

    } catch (error) {
        console.error('Error loading education section:', error);
    }
}

// ============================================
// Load Contact Section
// ============================================
async function loadContact() {
    try {
        const response = await fetch('data/contact.json');
        const data = await response.json();

        // Set section title and subtitle
        document.getElementById('contact-title').textContent = data.sectionTitle;

        // Render section image
        const contactImageContainer = document.getElementById('contact-image');
        if (contactImageContainer && data.sectionImage) {
            contactImageContainer.innerHTML = `<img src="${data.sectionImage}" alt="Get In Touch" loading="lazy">`;
        }

        document.getElementById('contact-subtitle').textContent = data.subtitle;

        // Render contact info
        const contactInfoContainer = document.getElementById('contact-info');
        if (contactInfoContainer && data.contactInfo) {
            contactInfoContainer.innerHTML = data.contactInfo.map(info => `
                <a href="${info.href}" class="contact-info-item" ${info.type !== 'location' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    <div class="contact-icon" style="background: ${info.color}20; color: ${info.color}">
                        <i class="${info.icon}"></i>
                    </div>
                    <div class="contact-info-content">
                        <h4>${info.label}</h4>
                        <p>${info.value}</p>
                    </div>
                </a>
            `).join('');
        }

        // Render contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm && data.form) {
            contactForm.action = data.form.action;
            contactForm.method = data.form.method;

            contactForm.innerHTML = data.form.fields.map(field => `
                <div class="form-group">
                    <label for="${field.name}">
                        <i class="${field.icon}"></i>
                        ${field.label}
                    </label>
                    ${field.type === 'textarea' ? `
                        <textarea
                            id="${field.name}"
                            name="${field.name}"
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}
                            rows="${field.rows || 5}"
                        ></textarea>
                    ` : `
                        <input
                            type="${field.type}"
                            id="${field.name}"
                            name="${field.name}"
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}
                        />
                    `}
                </div>
            `).join('') + `
                <button type="submit" class="form-submit">
                    <i class="${data.form.submitIcon}"></i>
                    ${data.form.submitText}
                </button>
                <div class="form-message"></div>
            `;

            // Handle form submission
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formMessage = contactForm.querySelector('.form-message');
                const submitButton = contactForm.querySelector('.form-submit');

                try {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                    const formData = new FormData(contactForm);
                    const response = await fetch(contactForm.action, {
                        method: contactForm.method,
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        formMessage.textContent = data.form.successMessage;
                        formMessage.className = 'form-message success';
                        formMessage.style.display = 'block';
                        contactForm.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    formMessage.textContent = data.form.errorMessage;
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                } finally {
                    submitButton.disabled = false;
                    submitButton.innerHTML = `<i class="${data.form.submitIcon}"></i> ${data.form.submitText}`;
                }
            });
        }

        // Render social media links
        const contactSocial = document.getElementById('contact-social');
        if (contactSocial && data.socialMedia) {
            contactSocial.innerHTML = data.socialMedia.map(social => `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${social.platform}">
                    <i class="${social.icon}"></i>
                </a>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading contact section:', error);
    }
}

// ============================================
// Load Footer
// ============================================
async function loadFooter() {
    try {
        const response = await fetch('data/footer.json');
        const data = await response.json();

        // Set tagline
        const taglineElement = document.getElementById('footer-tagline');
        if (taglineElement) {
            taglineElement.textContent = data.tagline;
        }

        // Render social links
        const footerSocial = document.getElementById('footer-social');
        if (footerSocial && data.socialLinks) {
            footerSocial.innerHTML = data.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${link.platform}">
                    <i class="${link.icon}"></i>
                </a>
            `).join('');
        }

        // Set copyright
        const copyrightElement = document.getElementById('footer-copyright');
        if (copyrightElement) {
            copyrightElement.textContent = data.copyright.text;
        }

        // Render footer links
        const footerLinks = document.getElementById('footer-links');
        if (footerLinks && data.links) {
            footerLinks.innerHTML = data.links.map(link => `
                <a href="${link.href}">${link.text}</a>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// ============================================
// Initialize Navigation
// ============================================
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu && !navToggle.dataset.bound) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        navToggle.dataset.bound = 'true';
    }

    // Link interactions (bind once per rendered link)
    navLinks.forEach(link => {
        if (link.dataset.bound) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = targetId ? document.querySelector(targetId) : null;

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });

        link.dataset.bound = 'true';
    });
}

// ============================================
// Initialize Scroll Effects
// ============================================
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Initialize Scroll Reveal Animation
// ============================================
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.section, .experience-card, .skill-category, .project-card, .education-card');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('reveal', 'active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ============================================
// Initialize Back to Top Button
// ============================================
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// Initialize Particles Background
// ============================================
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#667eea', '#764ba2', '#f093fb']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#667eea',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}


// ============================================
// Theme Toggle (Day/Night Mode)
// ============================================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggleBtn = document.getElementById('theme-toggle');

    if (toggleBtn && !toggleBtn.dataset.bound) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            updateThemeIcon(newTheme);
        });

        toggleBtn.dataset.bound = 'true';
    }

    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    const toggleBtn = document.getElementById('theme-toggle');
    if (!icon) return;

    icon.className = theme === 'dark'
        ? 'fas fa-sun'
        : 'fas fa-moon';

    if (toggleBtn) {
        toggleBtn.setAttribute(
            'aria-label',
            theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
        );
    }
}
