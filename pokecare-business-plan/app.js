// PokeCare Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links - Fixed version
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .hero-buttons .btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let targetId;
            const href = this.getAttribute('href');
            const buttonText = this.textContent.trim();
            
            // Handle different types of buttons/links
            if (href && href.startsWith('#')) {
                targetId = href.substring(1);
            } else if (buttonText.includes('창업')) {
                targetId = 'education';
            } else if (buttonText.includes('서비스')) {
                targetId = 'services';
            }
            
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    });

    // Animated Counter Function
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Animate counters when market section is visible
                if (entry.target.id === 'market') {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.dataset.target);
                        if (!stat.classList.contains('animated')) {
                            stat.classList.add('animated');
                            animateCounter(stat, target);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Market Analysis Chart
    const marketChartCanvas = document.getElementById('marketChart');
    if (marketChartCanvas) {
        const ctx = marketChartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2022', '2023', '2024', '2025', '2026', '2027', '2028'],
                datasets: [{
                    label: '시장 규모 (억원)',
                    data: [800, 900, 1000, 1100, 1200, 1350, 1500],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: '정기 세척률 (%)',
                    data: [15, 18, 22, 26, 30, 35, 42],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0ea5e9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#2563eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11,
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11,
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    // Growth Projections Chart
    const growthChartCanvas = document.getElementById('growthChart');
    if (growthChartCanvas) {
        const ctx = growthChartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['2026', '2027', '2028'],
                datasets: [{
                    label: '매출 (억원)',
                    data: [100, 300, 1000],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }, {
                    label: '매장 수 (천개)',
                    data: [10, 30, 80],
                    backgroundColor: ['rgba(31, 184, 205, 0.3)', 'rgba(255, 193, 133, 0.3)', 'rgba(180, 65, 60, 0.3)'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    type: 'line',
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 8,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#2563eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataset.label === '매출 (억원)') {
                                    label += context.parsed.y + '억원';
                                } else {
                                    label += context.parsed.y + '천개';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12,
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            }
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11,
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            },
                            callback: function(value) {
                                return value + '억원';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11,
                                family: 'FKGroteskNeue, Inter, sans-serif'
                            },
                            callback: function(value) {
                                return value + '천개';
                            }
                        }
                    }
                }
            }
        });
    }

    // Pricing Card Interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const cardType = card.querySelector('h3').textContent;
                showServiceModal(cardType);
            });
        }
    });

    // Membership button interaction
    const membershipButton = document.querySelector('.membership-card .btn');
    if (membershipButton) {
        membershipButton.addEventListener('click', function(e) {
            e.preventDefault();
            showServiceModal('멤버십 서비스');
        });
    }

    // Simple modal function for service inquiries
    function showServiceModal(serviceType) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-phone"></i> ${serviceType} 문의</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>${serviceType}</strong>에 관심을 가져주셔서 감사합니다.</p>
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>전화: 1588-0000</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>이메일: info@pokecare.co.kr</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-clock"></i>
                            <span>상담시간: 평일 09:00-18:00</span>
                        </div>
                    </div>
                    <p class="modal-note">전문 상담사가 자세한 안내를 도와드리겠습니다.</p>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: var(--color-surface);
                    border-radius: var(--radius-lg);
                    max-width: 500px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                    animation: slideUp 0.3s ease;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-24);
                    border-bottom: 1px solid var(--color-border);
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: var(--color-text);
                    display: flex;
                    align-items: center;
                    gap: var(--space-8);
                }
                
                .modal-header i {
                    color: var(--color-primary-blue);
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-2xl);
                    cursor: pointer;
                    color: var(--color-text-secondary);
                    transition: color var(--duration-fast);
                }
                
                .modal-close:hover {
                    color: var(--color-text);
                }
                
                .modal-body {
                    padding: var(--space-24);
                }
                
                .contact-info {
                    margin: var(--space-20) 0;
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: var(--space-12);
                    margin-bottom: var(--space-12);
                    padding: var(--space-12);
                    background: var(--color-bg-1);
                    border-radius: var(--radius-base);
                }
                
                .contact-item i {
                    color: var(--color-accent-orange);
                    font-size: var(--font-size-lg);
                    width: 20px;
                }
                
                .modal-note {
                    font-style: italic;
                    color: var(--color-text-secondary);
                    text-align: center;
                    margin-top: var(--space-16);
                    margin-bottom: 0;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;

        // Add styles to head if not already added
        if (!document.querySelector('#modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'modal-styles';
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(modal);

        // Close modal functionality
        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Close on escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape' && document.body.contains(modal)) {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.pricing-card, .feature-card, .market-stat, .projection-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize page
    console.log('PokeCare 웹사이트가 로드되었습니다.');
    
    // Make showServiceModal available globally
    window.showServiceModal = showServiceModal;
});

// Utility function for formatting numbers
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Export functions for potential external use
window.PokeCare = {
    formatNumber: formatNumber
};