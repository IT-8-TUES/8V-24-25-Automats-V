// Cosmic Timeline - Major events in the history of the universe
const cosmicEvents = [
    {
        id: "big-bang",
        title: "The Big Bang",
        date: "13.8 billion years ago",
        era: "Beginning of Time",
        position: 0,
        content: `
            <p>The universe began with a rapid expansion from an extremely hot, dense state. This initial expansion set the stage for everything that followed.</p>
            <img src="../images/cosmic-history/big-bang.jpg" alt="Artist's conception of the Big Bang">
            <p>During the first moments after the Big Bang, the universe was filled with an incredibly hot, dense plasma of elementary particles. As the universe expanded and cooled, these particles began to combine to form the first atomic nuclei.</p>
        `,
        sceneConfig: {
            type: "big-bang",
            background: 0x000000
        }
    },
    {
        id: "inflation",
        title: "Cosmic Inflation",
        date: "13.8 billion years ago (10^-32 seconds after Big Bang)",
        era: "Beginning of Time",
        position: 0.01,
        content: `
            <p>A period of exponentially rapid expansion of space, increasing the size of the universe by a factor of at least 10^26 in just a fraction of a second.</p>
            <img src="../images/cosmic-history/inflation.jpg" alt="Cosmic Inflation visualization">
            <p>Inflation explains why the universe appears flat and homogeneous on large scales, and provides the seeds for structure formation from quantum fluctuations.</p>
        `,
        sceneConfig: {
            type: "expanding-grid",
            background: 0x000205
        }
    },
    {
        id: "particle-era",
        title: "Particle Era",
        date: "13.8 billion years ago (first few minutes)",
        era: "Primordial Universe",
        position: 0.05,
        content: `
            <p>As the universe cooled below 10^15 Kelvin, quarks combined to form protons and neutrons. A cosmic soup of elementary particles interacted with each other in the dense, energetic environment.</p>
            <img src="../images/cosmic-history/particle-era.jpg" alt="Visualization of the particle era">
            <p>During this era, particles and antiparticles were created and annihilated in pairs. A slight asymmetry led to matter dominating over antimatter, allowing our universe to exist.</p>
        `,
        sceneConfig: {
            type: "particle-soup",
            background: 0x120809
        }
    },
    {
        id: "nucleosynthesis",
        title: "Primordial Nucleosynthesis",
        date: "13.8 billion years ago (3-20 minutes after Big Bang)",
        era: "Primordial Universe",
        position: 0.1,
        content: `
            <p>The temperature dropped enough for protons and neutrons to combine into the first atomic nuclei, primarily hydrogen, deuterium, helium, and trace amounts of lithium.</p>
            <img src="../images/cosmic-history/nucleosynthesis.jpg" alt="Formation of first atomic nuclei">
            <p>This process, known as Big Bang nucleosynthesis, determined the initial chemical composition of the universe. Heavier elements would form much later in stars.</p>
        `,
        sceneConfig: {
            type: "nuclei-formation",
            background: 0x170a0d
        }
    },
    {
        id: "dark-ages",
        title: "Cosmic Dark Ages",
        date: "From 380,000 to 150 million years after Big Bang",
        era: "Pre-Stellar Universe",
        position: 0.2,
        content: `
            <p>After recombination (when electrons joined atomic nuclei), the universe entered a period where no stars had yet formed. It was filled with neutral hydrogen gas with no sources of light.</p>
            <img src="../images/cosmic-history/dark-ages.jpg" alt="The dark, starless early universe">
            <p>During this era, dark matter began to clump together due to gravity, creating the foundation for future cosmic structures.</p>
        `,
        sceneConfig: {
            type: "dark-clouds",
            background: 0x010102
        }
    },
    {
        id: "first-stars",
        title: "First Stars Form",
        date: "Around 200 million years after Big Bang",
        era: "First Light",
        position: 0.3,
        content: `
            <p>The first stars, known as Population III stars, ignited from concentrated clouds of hydrogen and helium. They were massive (hundreds of times the mass of our Sun) and burned hot and bright.</p>
            <img src="../images/cosmic-history/first-stars.jpg" alt="Artist's conception of the first stars">
            <p>These first stars produced the first heavy elements in the universe through nuclear fusion and their supernovae. Without these stars, life as we know it would be impossible.</p>
        `,
        sceneConfig: {
            type: "first-stars",
            background: 0x020318
        }
    },
    {
        id: "reionization",
        title: "Cosmic Reionization",
        date: "Between 150 million and 1 billion years after Big Bang",
        era: "First Light",
        position: 0.4,
        content: `
            <p>Radiation from the first stars and quasars ionized the neutral hydrogen that filled the universe, making it transparent to ultraviolet light.</p>
            <img src="../images/cosmic-history/reionization.jpg" alt="Visualization of the cosmic reionization">
            <p>This marks the end of the cosmic dark ages, as the universe became bathed in ultraviolet light from the first luminous objects.</p>
        `,
        sceneConfig: {
            type: "reionization",
            background: 0x081018
        }
    },
    {
        id: "first-galaxies",
        title: "First Galaxies Form",
        date: "About 400-700 million years after Big Bang",
        era: "Galaxy Formation",
        position: 0.5,
        content: `
            <p>The first galaxies began to take shape as gas collapsed into the wells of dark matter that had been forming since the dark ages.</p>
            <img src="../images/cosmic-history/first-galaxies.jpg" alt="Early galaxy formation">
            <p>These early galaxies were small, irregular, and full of active star formation. They would eventually merge to form the larger galaxies we see today.</p>
        `,
        sceneConfig: {
            type: "proto-galaxies",
            background: 0x05101d
        }
    },
    {
        id: "galaxy-evolution",
        title: "Galaxy Evolution and Heavy Elements",
        date: "1-3 billion years after Big Bang",
        era: "Galaxy Formation",
        position: 0.6,
        content: `
            <p>Galaxies grew through mergers and continued star formation. Multiple generations of stars lived and died, creating and dispersing heavier elements into the interstellar medium.</p>
            <img src="../images/cosmic-history/galaxy-evolution.jpg" alt="Galaxies growing and evolving">
            <p>By this time, stars were producing elements like carbon, oxygen, silicon, and iron - the building blocks needed for rocky planets and eventually life.</p>
        `,
        sceneConfig: {
            type: "galaxy-clusters",
            background: 0x070f20
        }
    },
    {
        id: "solar-system",
        title: "Formation of Our Solar System",
        date: "4.6 billion years ago (9.2 billion years after Big Bang)",
        era: "Modern Universe",
        position: 0.8,
        content: `
            <p>Our Sun and solar system formed from a molecular cloud of gas and dust enriched with heavier elements from previous generations of stars.</p>
            <img src="../images/cosmic-history/solar-system.jpg" alt="Formation of our solar system">
            <p>The Sun ignited as a star, while the planets formed from the disk of material orbiting around it. Earth formed in the habitable zone, where liquid water could exist.</p>
        `,
        sceneConfig: {
            type: "solar-birth",
            background: 0x0a1020
        }
    },
    {
        id: "life-on-earth",
        title: "First Life on Earth",
        date: "3.5-4 billion years ago",
        era: "Modern Universe",
        position: 0.9,
        content: `
            <p>Simple single-celled organisms appeared in Earth's oceans, beginning the long evolutionary journey of life on our planet.</p>
            <img src="../images/cosmic-history/early-life.jpg" alt="Artist's conception of early Earth with primitive life">
            <p>These first microorganisms were likely similar to modern bacteria and archaea, using chemical energy rather than photosynthesis. Life would eventually diversify into the incredible variety of organisms we see today.</p>
        `,
        sceneConfig: {
            type: "earth-life",
            background: 0x081020
        }
    },
    {
        id: "present-day",
        title: "Present Day Universe",
        date: "13.8 billion years after Big Bang",
        era: "Modern Universe",
        position: 1.0,
        content: `
            <p>The universe today contains hundreds of billions of galaxies, each with hundreds of billions of stars, and is still expanding at an accelerating rate due to dark energy.</p>
            <img src="../images/cosmic-history/present-universe.jpg" alt="Modern view of the universe">
            <p>We now know that our universe is dominated by dark energy (68%), with dark matter (27%) and ordinary matter (5%) making up the rest. Humans have just begun to understand this vast cosmos we inhabit.</p>
        `,
        sceneConfig: {
            type: "cosmic-web",
            background: 0x050b18
        }
    }
];

// Initialize Three.js scene and variables
let scene, camera, renderer, controls;
let currentEventIndex = 0;
let isPlaying = false;
let autoplayEnabled = true;
let eventTransitionInProgress = false;
let animationObjects = [];
let clock = new THREE.Clock();
let animationFrameId;

// DOM elements
const timelineMarkers = document.getElementById('timeline-markers');
const progressBar = document.getElementById('timeline-progress-bar');
const eventInfoPanel = document.getElementById('event-info-panel');
const eventTitle = document.getElementById('event-title');
const eventDate = document.getElementById('event-date');
const eventContent = document.getElementById('event-content');
const eraLabel = document.getElementById('era-label');
const loadingScreen = document.getElementById('loading-screen');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

// Add event listeners for timeline controls
document.getElementById('prev-event-btn').addEventListener('click', showPreviousEvent);
document.getElementById('next-event-btn').addEventListener('click', showNextEvent);
playPauseBtn.addEventListener('click', togglePlayPause);
document.getElementById('autoplay-toggle').addEventListener('click', toggleAutoplay);

// Initialize the timeline
document.addEventListener('DOMContentLoaded', initTimeline);

function initTimeline() {
    initThreeJS();
    createTimelineMarkers();
    
    // Show the first event
    showEvent(0);
    
    // Reveal info panel after a brief delay
    setTimeout(() => {
        eventInfoPanel.classList.add('visible');
    }, 1000);
    
    // Hide loading screen after everything is ready
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
    }, 2000);
}

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(cosmicEvents[0].sceneConfig.background);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('timeline-viewer').appendChild(renderer.domElement);
    
    // Add controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 5;
    controls.maxDistance = 80;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333344, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add window resize handler
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    
    // Get elapsed time since last frame
    const delta = clock.getDelta();
    
    // Update controls
    controls.update();
    
    // Update animation objects
    animationObjects.forEach(obj => {
        if (obj.update) obj.update(delta);
    });
    
    // Render scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createTimelineMarkers() {
    // Create markers for each event
    cosmicEvents.forEach((event, index) => {
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.dataset.index = index;
        
        // Position marker based on its position value (0-1)
        const position = `${event.position * 100}%`;
        marker.style.left = position;
        
        // Add label
        const label = document.createElement('div');
        label.className = 'marker-label';
        label.textContent = event.title;
        marker.appendChild(label);
        
        // Add click handler
        marker.addEventListener('click', () => {
            showEvent(index);
        });
        
        // Add to timeline
        timelineMarkers.appendChild(marker);
        
        // Make first marker active
        if (index === 0) {
            marker.classList.add('active');
        }
    });
}

function showEvent(index) {
    if (eventTransitionInProgress) return;
    
    eventTransitionInProgress = true;
    
    // Update current index
    currentEventIndex = index;
    
    // Hide info panel during transition
    eventInfoPanel.classList.remove('visible');
    
    // Update active marker
    const markers = timelineMarkers.querySelectorAll('.timeline-marker');
    markers.forEach(marker => marker.classList.remove('active'));
    markers[index].classList.add('active');
    
    // Update progress bar
    progressBar.style.width = `${cosmicEvents[index].position * 100}%`;
    
    // Update era label
    eraLabel.textContent = cosmicEvents[index].era;
    
    // Transition to new scene
    transitionScene(cosmicEvents[index]);
    
    // Update info panel content
    setTimeout(() => {
        eventTitle.textContent = cosmicEvents[index].title;
        eventDate.textContent = cosmicEvents[index].date;
        eventContent.innerHTML = cosmicEvents[index].content;
        
        // Show info panel
        eventInfoPanel.classList.add('visible');
        
        eventTransitionInProgress = false;
    }, 1000);
}

function showNextEvent() {
    if (currentEventIndex < cosmicEvents.length - 1) {
        showEvent(currentEventIndex + 1);
    } else if (autoplayEnabled) {
        // Restart from beginning if in autoplay
        showEvent(0);
    }
}

function showPreviousEvent() {
    if (currentEventIndex > 0) {
        showEvent(currentEventIndex - 1);
    }
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        playPauseBtn.textContent = ' Pause';
        playPauseBtn.appendChild(pauseIcon);
        
        // Start auto-advance
        startAutoAdvance();
    } else {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'inline';
        playPauseBtn.textContent = ' Play';
        playPauseBtn.appendChild(playIcon);
        
        // Stop auto-advance
        stopAutoAdvance();
    }
}

function toggleAutoplay() {
    const autoplayToggle = document.getElementById('autoplay-toggle');
    autoplayEnabled = !autoplayEnabled;
    
    if (autoplayEnabled) {
        autoplayToggle.classList.add('active');
    } else {
        autoplayToggle.classList.remove('active');
    }
}

let autoAdvanceTimeout;

function startAutoAdvance() {
    // Clear any existing timeout
    if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
    }
    
    // Set timeout to advance to next event
    autoAdvanceTimeout = setTimeout(() => {
        if (isPlaying) {
            showNextEvent();
            startAutoAdvance();
        }
    }, 12000); // 12 seconds per event
}

function stopAutoAdvance() {
    if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
    }
}

function transitionScene(event) {
    // Fade out current scene
    const targetColor = new THREE.Color(event.sceneConfig.background);
    const startColor = scene.background.clone();
    
    // Animation duration
    const duration = 1.0; // seconds
    let startTime = null;
    
    // Clear previous animation objects
    clearScene();
    
    function fadeAnimation(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000; // convert to seconds
        
        if (elapsed < duration) {
            // Calculate interpolation factor
            const t = elapsed / duration;
            
            // Interpolate background color
            const currentColor = new THREE.Color().lerpColors(startColor, targetColor, t);
            scene.background = currentColor;
            
            // Continue animation
            requestAnimationFrame(fadeAnimation);
        } else {
            // Animation complete
            scene.background = targetColor;
            
            // Create new scene based on event type
            createSceneForEvent(event);
        }
    }
    
    // Start fade animation
    requestAnimationFrame(fadeAnimation);
}

function clearScene() {
    // Remove all objects except lights
    while (scene.children.length > 0) {
        const object = scene.children[0];
        if (object.type === 'AmbientLight' || object.type === 'DirectionalLight') {
            scene.children.shift(); // Move to end
            scene.add(object);
        } else {
            scene.remove(object);
        }
    }
    
    // Clear animation objects array
    animationObjects = [];
}

function createSceneForEvent(event) {
    // Create different scenes based on event type
    switch (event.sceneConfig.type) {
        case 'big-bang':
            createBigBangScene();
            break;
        case 'expanding-grid':
            createExpandingGridScene();
            break;
        case 'particle-soup':
            createParticleSoupScene();
            break;
        case 'nuclei-formation':
            createNucleiFormationScene();
            break;
        case 'dark-clouds':
            createDarkCloudsScene();
            break;
        case 'first-stars':
            createFirstStarsScene();
            break;
        case 'reionization':
            createReionizationScene();
            break;
        case 'proto-galaxies':
            createProtoGalaxiesScene();
            break;
        case 'galaxy-clusters':
            createGalaxyClustersScene();
            break;
        case 'solar-birth':
            createSolarBirthScene();
            break;
        case 'earth-life':
            createEarthLifeScene();
            break;
        case 'cosmic-web':
            createCosmicWebScene();
            break;
        default:
            createDefaultScene();
            break;
    }
} 