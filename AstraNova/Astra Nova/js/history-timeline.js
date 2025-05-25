// History Timeline JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const timelineContainer = document.getElementById('timeline-container');
    const playTimelineBtn = document.getElementById('play-timeline');
    const scrollToModernBtn = document.getElementById('scroll-to-modern');
    const eraNavBtns = document.querySelectorAll('.era-nav-btn');
    const modal = document.getElementById('event-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Global variables
    let isAnimating = false;
    let currentEra = 'ancient';
    
    // Initialize the timeline
    function initTimeline() {
        // Check if timelineData is defined (imported from the HTML file)
        if (typeof timelineData === 'undefined') {
            console.error('Timeline data not found!');
            return;
        }
        
        // Create timeline elements for each era
        Object.keys(timelineData).forEach(eraKey => {
            const era = timelineData[eraKey];
            
            // Create era section
            const eraSection = document.createElement('div');
            eraSection.className = 'timeline-era';
            eraSection.id = `era-${eraKey}`;
            eraSection.dataset.era = eraKey;
            
            // Create era header
            const eraHeader = document.createElement('div');
            eraHeader.className = 'era-header';
            eraHeader.innerHTML = `<h2>${era.name} <span>(${era.period})</span></h2>`;
            eraSection.appendChild(eraHeader);
            
            // Create timeline items container
            const timelineItems = document.createElement('div');
            timelineItems.className = 'timeline-items';
            
            // Create timeline items
            era.events.forEach((event, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.dataset.event = `${eraKey}-${index}`;
                
                const timelineContent = document.createElement('div');
                timelineContent.className = 'timeline-content';
                timelineContent.dataset.date = event.date;
                timelineContent.dataset.title = event.title;
                timelineContent.dataset.image = event.image || '';
                timelineContent.dataset.details = event.details;
                timelineContent.dataset.source = event.source || '#';
                
                // Build timeline content
                let contentHTML = `
                    <div class="timeline-date">${event.date}</div>
                    <h3 class="timeline-title"><i class="fas ${event.icon || 'fa-landmark'} timeline-icon"></i>${event.title}</h3>
                `;
                
                // Add image if available
                if (event.image) {
                    contentHTML += `
                        <div class="timeline-image">
                            <img src="${event.image}" alt="${event.title}">
                        </div>
                    `;
                }
                
                contentHTML += `
                    <div class="timeline-text">${event.description}</div>
                    <div class="read-more">Read more <i class="fas fa-arrow-right"></i></div>
                `;
                
                timelineContent.innerHTML = contentHTML;
                timelineItem.appendChild(timelineContent);
                timelineItems.appendChild(timelineItem);
                
                // Add click event to show modal
                timelineContent.addEventListener('click', (e) => {
                    showEventModal(event);
                });
            });
            
            eraSection.appendChild(timelineItems);
            timelineContainer.appendChild(eraSection);
        });
        
        // Set up intersection observer to animate timeline items
        setupIntersectionObserver();
    }
    
    // Setup intersection observer for timeline animations
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Observer for timeline eras
        const eraObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    
                    // Update active era in navigation
                    const eraId = entry.target.dataset.era;
                    updateActiveEra(eraId);
                }
            });
        }, observerOptions);
        
        // Observer for timeline items
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Observe all timeline eras
        document.querySelectorAll('.timeline-era').forEach(era => {
            eraObserver.observe(era);
        });
        
        // Observe all timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            itemObserver.observe(item);
        });
    }
    
    // Update active era in navigation
    function updateActiveEra(eraId) {
        // Remove active class from all era buttons
        eraNavBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to current era button
        const activeBtn = document.querySelector(`.era-nav-btn[data-era="${eraId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update current era
        currentEra = eraId;
    }
    
    // Show event details in modal
    function showEventModal(event) {
        // Populate modal content
        document.getElementById('modal-date').textContent = event.date;
        document.getElementById('modal-title').textContent = event.title;
        document.getElementById('modal-description').innerHTML = event.details;
        document.getElementById('modal-source').href = event.source || '#';
        
        // Set modal image if available
        const modalImage = document.getElementById('modal-image');
        if (event.image) {
            modalImage.src = event.image;
            modalImage.style.display = 'block';
        } else {
            modalImage.style.display = 'none';
        }
        
        // Show modal
        modal.classList.add('show');
        
        // Prevent page scrolling while modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Close event modal
    function closeEventModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Animate the timeline
    function animateTimeline() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset all items
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.remove('appear');
        });
        
        // Animate items one by one with delay
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('appear');
                
                // Scroll to item
                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // End animation
                if (index === items.length - 1) {
                    isAnimating = false;
                }
            }, index * 800); // 800ms delay between items
        });
    }
    
    // Scroll to modern era
    function scrollToModernEra() {
        const modernEra = document.getElementById('era-modern');
        if (modernEra) {
            modernEra.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Era navigation
        eraNavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const eraId = btn.dataset.era;
                const eraElement = document.getElementById(`era-${eraId}`);
                
                if (eraElement) {
                    eraElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Play timeline animation
        if (playTimelineBtn) {
            playTimelineBtn.addEventListener('click', animateTimeline);
        }
        
        // Scroll to modern era
        if (scrollToModernBtn) {
            scrollToModernBtn.addEventListener('click', scrollToModernEra);
        }
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', closeEventModal);
        }
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeEventModal();
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeEventModal();
            }
        });
    }
    
    // Initialize the timeline
    initTimeline();
    setupEventListeners();
}); 