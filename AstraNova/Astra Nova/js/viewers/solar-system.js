// Planet data with real-world proportions (not to exact scale but relatively accurate)
const planetData = {
    sun: {
        name: "Sun",
        radius: 20,
        orbitRadius: 0,
        orbitSpeed: 0,
        rotationSpeed: 0.001,
        color: 0xffdd00,
        layers: [
            { name: "Core", radius: 0.7, color: 0xffffcc },
            { name: "Radiative Zone", radius: 0.85, color: 0xffcc44 },
            { name: "Convective Zone", radius: 0.95, color: 0xff8800 },
            { name: "Photosphere", radius: 1.0, color: 0xffaa00 }
        ],
        description: "The Sun is the star at the center of our Solar System. It's a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
        stats: {
            "Diameter": "1,392,700 km",
            "Mass": "1.989 × 10^30 kg",
            "Surface Temp": "5,500°C",
            "Age": "4.6 billion years",
            "Type": "G-type main-sequence star",
            "Distance from Earth": "149.6 million km"
        },
        emissive: true
    },
    mercury: {
        name: "Mercury",
        radius: 0.38,
        orbitRadius: 28,
        orbitSpeed: 0.04,
        rotationSpeed: 0.004,
        color: 0xaaaaaa,
        texture: "mercury",
        layers: [
            { name: "Inner Core", radius: 0.4, color: 0x664422 },
            { name: "Outer Core", radius: 0.7, color: 0xaaaa22 },
            { name: "Mantle", radius: 0.95, color: 0xcc9988 },
            { name: "Crust", radius: 1.0, color: 0xa0a0a0 }
        ],
        description: "Mercury is the smallest and innermost planet in the Solar System. It has a rocky body like Earth, with a heavily cratered surface due to impacts from meteoroids and comets.",
        stats: {
            "Diameter": "4,879 km",
            "Mass": "3.3 × 10^23 kg",
            "Orbital Period": "88 days",
            "Day Length": "59 Earth days",
            "Surface Temp": "-173°C to 427°C",
            "Distance from Sun": "57.9 million km"
        }
    },
    venus: {
        name: "Venus",
        radius: 0.95,
        orbitRadius: 40,
        orbitSpeed: 0.015,
        rotationSpeed: 0.002,
        color: 0xe6e6e6,
        texture: "venus",
        layers: [
            { name: "Core", radius: 0.5, color: 0x664422 },
            { name: "Mantle", radius: 0.9, color: 0xccaa88 },
            { name: "Crust", radius: 1.0, color: 0xddccaa }
        ],
        description: "Venus is the second planet from the Sun and Earth's closest planetary neighbor. It has a thick atmosphere that traps heat, making it the hottest planet in our solar system.",
        stats: {
            "Diameter": "12,104 km",
            "Mass": "4.87 × 10^24 kg",
            "Orbital Period": "225 days",
            "Day Length": "243 Earth days",
            "Surface Temp": "462°C",
            "Distance from Sun": "108.2 million km"
        }
    },
    earth: {
        name: "Earth",
        radius: 1,
        orbitRadius: 55,
        orbitSpeed: 0.01,
        rotationSpeed: 0.01,
        color: 0x2277ff,
        texture: "earth",
        layers: [
            { name: "Inner Core", radius: 0.2, color: 0xffcc00 },
            { name: "Outer Core", radius: 0.35, color: 0xff8800 },
            { name: "Lower Mantle", radius: 0.6, color: 0xcc7766 },
            { name: "Upper Mantle", radius: 0.9, color: 0xaa6655 },
            { name: "Crust", radius: 1.0, color: 0x66aadd }
        ],
        description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is water-covered, with oceans constituting most of this coverage.",
        stats: {
            "Diameter": "12,742 km",
            "Mass": "5.97 × 10^24 kg",
            "Orbital Period": "365.25 days",
            "Day Length": "24 hours",
            "Surface Temp": "-88°C to 58°C",
            "Distance from Sun": "149.6 million km"
        }
    },
    mars: {
        name: "Mars",
        radius: 0.53,
        orbitRadius: 72,
        orbitSpeed: 0.008,
        rotationSpeed: 0.008,
        color: 0xcc3333,
        texture: "mars",
        layers: [
            { name: "Core", radius: 0.5, color: 0x884422 },
            { name: "Mantle", radius: 0.9, color: 0xaa5533 },
            { name: "Crust", radius: 1.0, color: 0xcc3333 }
        ],
        description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often called the 'Red Planet' due to its reddish appearance, caused by iron oxide on its surface.",
        stats: {
            "Diameter": "6,779 km",
            "Mass": "6.42 × 10^23 kg",
            "Orbital Period": "687 days",
            "Day Length": "24.6 hours",
            "Surface Temp": "-153°C to 20°C",
            "Distance from Sun": "227.9 million km"
        }
    },
    jupiter: {
        name: "Jupiter",
        radius: 11.2,
        orbitRadius: 100,
        orbitSpeed: 0.004,
        rotationSpeed: 0.04,
        color: 0xffbb99,
        texture: "jupiter",
        layers: [
            { name: "Core", radius: 0.15, color: 0xcccccc },
            { name: "Metallic Hydrogen", radius: 0.4, color: 0xddaa88 },
            { name: "Molecular Hydrogen", radius: 0.8, color: 0xeebb99 },
            { name: "Atmosphere", radius: 1.0, color: 0xffcc99 }
        ],
        description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant with a mass more than two and a half times that of all other planets in the Solar System combined.",
        stats: {
            "Diameter": "139,820 km",
            "Mass": "1.898 × 10^27 kg",
            "Orbital Period": "11.86 years",
            "Day Length": "9.93 hours",
            "Temperature": "-145°C",
            "Distance from Sun": "778.5 million km"
        }
    },
    saturn: {
        name: "Saturn",
        radius: 9.45,
        orbitRadius: 138,
        orbitSpeed: 0.002,
        rotationSpeed: 0.038,
        color: 0xeeeecc,
        texture: "saturn",
        layers: [
            { name: "Core", radius: 0.2, color: 0xcccccc },
            { name: "Metallic Hydrogen", radius: 0.4, color: 0xddddbb },
            { name: "Molecular Hydrogen", radius: 0.8, color: 0xeeeedd },
            { name: "Atmosphere", radius: 1.0, color: 0xffeecc }
        ],
        description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is known for its prominent ring system, which consists of ice particles, rocky debris and dust.",
        stats: {
            "Diameter": "116,460 km",
            "Mass": "5.68 × 10^26 kg",
            "Orbital Period": "29.45 years",
            "Day Length": "10.7 hours",
            "Temperature": "-178°C",
            "Distance from Sun": "1.434 billion km"
        },
        hasRings: true,
        ringColor: 0xaaaaaa
    },
    uranus: {
        name: "Uranus",
        radius: 4,
        orbitRadius: 176,
        orbitSpeed: 0.0011,
        rotationSpeed: 0.03,
        color: 0x99ffff,
        texture: "uranus",
        layers: [
            { name: "Core", radius: 0.2, color: 0x887766 },
            { name: "Mantle", radius: 0.8, color: 0x77bbbb },
            { name: "Atmosphere", radius: 1.0, color: 0x99ddee }
        ],
        description: "Uranus is the seventh planet from the Sun. Its atmosphere is similar to Jupiter and Saturn in its primary composition of hydrogen and helium, but it contains more 'ices' such as water, ammonia, and methane.",
        stats: {
            "Diameter": "50,724 km",
            "Mass": "8.68 × 10^25 kg",
            "Orbital Period": "84 years",
            "Day Length": "17.2 hours",
            "Temperature": "-224°C",
            "Distance from Sun": "2.871 billion km"
        },
        tilt: Math.PI/2 * 0.98 // Uranus has an axial tilt of about 98 degrees
    },
    neptune: {
        name: "Neptune",
        radius: 3.88,
        orbitRadius: 200,
        orbitSpeed: 0.0006,
        rotationSpeed: 0.032,
        color: 0x3333bb,
        texture: "neptune",
        layers: [
            { name: "Core", radius: 0.2, color: 0x776655 },
            { name: "Mantle", radius: 0.8, color: 0x4466aa },
            { name: "Atmosphere", radius: 1.0, color: 0x3355dd }
        ],
        description: "Neptune is the eighth and farthest-known Solar planet from the Sun. It is the densest giant planet and is 17 times the mass of Earth. Neptune's atmosphere, similar to Jupiter's and Saturn's, is composed primarily of hydrogen and helium.",
        stats: {
            "Diameter": "49,244 km",
            "Mass": "1.02 × 10^26 kg",
            "Orbital Period": "164.8 years",
            "Day Length": "16.1 hours",
            "Temperature": "-214°C",
            "Distance from Sun": "4.495 billion km"
        }
    }
};

// Initialize Three.js scene
let scene, camera, renderer, controls;
let planets = {};
let sunLight;
let raycaster, mouse;
let clock;
let currentIntersect = null;
let lastIntersect = null;
let activePlanet = null; // Track the currently active planet
let highlightMaterial = null;
let originalMaterials = {};
let hoverHelpers = [];
let isMouseOverCanvas = false;
let hoverPulse = 0;
let isInitialLoad = true;
let planetCutaways = {};
let solarFlares = [];
let linearMoveSpeed = 5; // Speed for linear movement with scroll

// DOM elements
const planetInfoPanel = document.getElementById('planet-info');
const planetNameElement = document.getElementById('planet-name');
const planetDescriptionElement = document.getElementById('planet-description');
const planetStatsElement = document.getElementById('planet-stats');

// Check if Three.js is loaded
function checkDependencies() {
    console.log("Checking dependencies...");
    if (typeof THREE === 'undefined') {
        console.error("THREE is not defined! Three.js library is not loaded properly.");
        alert("Error: Three.js library is not loaded. Please check your internet connection and refresh the page.");
        return false;
    }
    
    if (typeof THREE.OrbitControls === 'undefined') {
        console.error("THREE.OrbitControls is not defined! OrbitControls extension is not loaded properly.");
        alert("Error: OrbitControls is not loaded. Please check your internet connection and refresh the page.");
        return false;
    }
    
    console.log("All dependencies loaded successfully");
    return true;
}

// Main initialization function - exposed globally so it can be called after OrbitControls loads
function initSolarSystem() {
    console.log("initSolarSystem function called");
    // Wait a moment for libraries to be fully initialized
    setTimeout(init, 100);
}

function init() {
    console.log("Initializing solar system...");
    
    // Make sure THREE.js is properly loaded
    if (!checkDependencies()) return;
    
    // Create clock
    clock = new THREE.Clock();
    
    // Create scene
    scene = new THREE.Scene();
    console.log("Scene created");
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 120;
    camera.position.y = 80;
    camera.position.x = 120;
    console.log("Camera created");
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const solarSystemElement = document.getElementById('solar-system');
    if (!solarSystemElement) {
        console.error("Could not find #solar-system element!");
        return;
    }
    
    solarSystemElement.appendChild(renderer.domElement);
    console.log("Renderer added to DOM");
    
    // Add control instructions
    const message = document.createElement('div');
    message.className = 'hover-message';
    message.textContent = 'Drag to rotate, Scroll to zoom, Shift+Drag to pan. Double-click planet to focus.';
    solarSystemElement.appendChild(message);
    setTimeout(() => message.classList.add('show'), 100);
    setTimeout(() => message.classList.remove('show'), 7000);
    
    // Add camera controls helper button
    const resetButton = document.createElement('button');
    resetButton.className = 'camera-reset-btn';
    resetButton.textContent = 'Reset View';
    solarSystemElement.appendChild(resetButton);
    resetButton.addEventListener('click', resetCamera);
    
    // Add orbit controls with proper settings for free movement
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 1000;
    controls.enablePan = true;
    controls.panSpeed = 1.0;
    controls.rotateSpeed = 0.7;
    controls.autoRotate = false;
    controls.screenSpacePanning = true; // This allows proper panning in screen space
    controls.target.set(0, 0, 0);
    
    // Disable default zoom behavior on the controls
    controls.enableZoom = false;
    
    // Add custom scroll event listener for linear movement
    solarSystemElement.addEventListener('wheel', handleLinearScrollMovement);
    
    console.log("Controls created");
    
    // Initialize raycaster for planet hover detection
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.1;
    raycaster.params.Line.threshold = 0.1;
    raycaster.linePrecision = 0.1;
    mouse = new THREE.Vector2();
    
    // Create stars background
    createStars();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);
    
    // Add sun light
    sunLight = new THREE.PointLight(0xffffff, 1.5, 0, 2);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Create planets
    createPlanets();
    console.log("Planets created");
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Mouse event listeners for solar system
    solarSystemElement.addEventListener('mousemove', onMouseMove);
    solarSystemElement.addEventListener('mouseenter', () => { isMouseOverCanvas = true; });
    solarSystemElement.addEventListener('mouseleave', () => { 
        isMouseOverCanvas = false; 
        
        // Clear current intersection when mouse leaves the canvas
        // but don't clear activePlanet or hide its visualization
        if (lastIntersect && lastIntersect !== activePlanet && !lastIntersect.data.emissive) {
            lastIntersect.mesh.material = originalMaterials[lastIntersect.data.name];
        }
        currentIntersect = null;
        lastIntersect = null;
        
        // Don't reset info panel or cursor if we have an active planet
        if (!activePlanet) {
            updatePlanetInfo(null);
            document.body.style.cursor = 'default';
        }
    });
    
    // Double-click to focus on a planet
    solarSystemElement.addEventListener('dblclick', focusOnPlanet);
    
    // Add click handler to reset when clicking empty space
    solarSystemElement.addEventListener('click', onMouseClick);
    
    // Start animation loop
    console.log("Starting animation loop");
    animate();
    
    // Start with a slight rotation to make it more dynamic
    setTimeout(() => {
        isInitialLoad = false;
    }, 2000);
}

function createStars() {
    // Create a star field
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false
    });
    
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

function createPlanetTexture(type, size = 1024) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Fill with base color
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, size, size);
    
    if (type === 'mercury') {
        // Mercury: Cratered rocky surface
        const craterCount = 300;
        ctx.fillStyle = '#888';
        ctx.fillRect(0, 0, size, size);
        
        for (let i = 0; i < craterCount; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = 1 + Math.random() * 10;
            const opacity = 0.1 + Math.random() * 0.4;
            
            ctx.fillStyle = `rgba(70, 70, 70, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (type === 'venus') {
        // Venus: Yellowish cloudy surface
        ctx.fillStyle = '#e6cd9c';
        ctx.fillRect(0, 0, size, size);
        
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = 30 + Math.random() * 100;
            const opacity = 0.1 + Math.random() * 0.2;
            
            ctx.fillStyle = `rgba(255, 230, 180, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add swirling cloud patterns
        for (let i = 0; i < 10; i++) {
            const centerX = Math.random() * size;
            const centerY = Math.random() * size;
            const spiralArms = 3 + Math.floor(Math.random() * 3);
            const maxRadius = 100 + Math.random() * 150;
            
            ctx.fillStyle = 'rgba(255, 250, 220, 0.1)';
            
            for (let arm = 0; arm < spiralArms; arm++) {
                const angleOffset = (arm * 2 * Math.PI) / spiralArms;
                
                for (let r = 5; r < maxRadius; r += 5) {
                    const angle = angleOffset + (r / 10);
                    const x = centerX + r * Math.cos(angle);
                    const y = centerY + r * Math.sin(angle);
                    const dotSize = 5 + (r / maxRadius) * 15;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    } else if (type === 'earth') {
        // Earth: Blue oceans and green landmasses
        ctx.fillStyle = '#1a66ff'; // Ocean blue
        ctx.fillRect(0, 0, size, size);
        
        // Draw landmasses
        ctx.fillStyle = '#3d8c40'; // Land green
        for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = 30 + Math.random() * 80;
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw clouds
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = 20 + Math.random() * 50;
            const opacity = 0.2 + Math.random() * 0.3;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add ice caps
        ctx.fillStyle = 'rgba(240, 240, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(size/2, size/10, size/5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(size/2, size*0.9, size/5, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === 'mars') {
        // Mars: Red surface with darker features
        ctx.fillStyle = '#c1440e'; // Rusty red
        ctx.fillRect(0, 0, size, size);
        
        // Add darker regions
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = 20 + Math.random() * 60;
            ctx.fillStyle = `rgba(90, 30, 0, ${0.1 + Math.random() * 0.2})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add craters
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = 2 + Math.random() * 8;
            ctx.fillStyle = `rgba(150, 70, 40, ${0.3 + Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add polar ice cap
        ctx.fillStyle = 'rgba(240, 240, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(size/2, size/10, size/8, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === 'jupiter') {
        // Jupiter: Banded structure with Great Red Spot
        const bandColors = [
            'rgba(255, 200, 150, 0.8)',
            'rgba(200, 150, 100, 0.8)',
            'rgba(230, 180, 130, 0.8)',
            'rgba(180, 130, 80, 0.8)'
        ];
        
        // Draw horizontal bands
        const bandCount = 12;
        const bandHeight = size / bandCount;
        
        for (let i = 0; i < bandCount; i++) {
            ctx.fillStyle = bandColors[i % bandColors.length];
            ctx.fillRect(0, i * bandHeight, size, bandHeight);
        }
        
        // Add swirls and details to bands
        for (let i = 0; i < bandCount; i++) {
            const y = i * bandHeight + bandHeight / 2;
            
            ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            
            for (let j = 0; j < 15; j++) {
                const x = j * (size / 15) + Math.random() * 20;
                const width = 20 + Math.random() * 50;
                const height = bandHeight * 0.7;
                
                ctx.beginPath();
                ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Draw Great Red Spot
        ctx.fillStyle = 'rgba(180, 60, 40, 0.7)';
        ctx.beginPath();
        const spotX = size * 0.7;
        const spotY = size * 0.4;
        ctx.ellipse(spotX, spotY, size/6, size/10, Math.PI/4, 0, Math.PI * 2);
        ctx.fill();
        
        // Add highlight to the spot
        ctx.fillStyle = 'rgba(220, 100, 80, 0.5)';
        ctx.beginPath();
        ctx.ellipse(spotX - 10, spotY - 5, size/12, size/16, Math.PI/4, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === 'saturn') {
        // Saturn: Similar to Jupiter but with more muted colors
        const bandColors = [
            'rgba(240, 220, 170, 0.8)',
            'rgba(210, 190, 140, 0.8)',
            'rgba(230, 210, 160, 0.8)',
            'rgba(200, 180, 130, 0.8)'
        ];
        
        // Draw horizontal bands
        const bandCount = 10;
        const bandHeight = size / bandCount;
        
        for (let i = 0; i < bandCount; i++) {
            ctx.fillStyle = bandColors[i % bandColors.length];
            ctx.fillRect(0, i * bandHeight, size, bandHeight);
        }
        
        // Add swirls and details to bands
        for (let i = 0; i < bandCount; i++) {
            const y = i * bandHeight + bandHeight / 2;
            
            ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            
            for (let j = 0; j < 10; j++) {
                const x = j * (size / 10) + Math.random() * 20;
                const width = 30 + Math.random() * 60;
                const height = bandHeight * 0.6;
                
                ctx.beginPath();
                ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Add some subtle spots
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = 'rgba(180, 160, 100, 0.4)';
            ctx.beginPath();
            const spotX = Math.random() * size;
            const spotY = Math.random() * size;
            ctx.ellipse(spotX, spotY, size/15, size/20, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (type === 'uranus') {
        // Uranus: Cyan with subtle banding
        ctx.fillStyle = '#B1E4E3'; // Cyan base
        ctx.fillRect(0, 0, size, size);
        
        // Add subtle horizontal bands
        const bandCount = 5;
        const bandHeight = size / bandCount;
        
        for (let i = 0; i < bandCount; i++) {
            ctx.fillStyle = i % 2 === 0 ? 'rgba(150, 255, 255, 0.1)' : 'rgba(100, 200, 200, 0.1)';
            ctx.fillRect(0, i * bandHeight, size, bandHeight);
        }
        
        // Add very subtle cloud features
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const radius = 40 + Math.random() * 60;
            ctx.fillStyle = `rgba(180, 255, 255, ${0.05 + Math.random() * 0.05})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (type === 'neptune') {
        // Neptune: Deep blue with white streaks
        ctx.fillStyle = '#3457D5'; // Deep blue
        ctx.fillRect(0, 0, size, size);
        
        // Add horizontal bands
        const bandCount = 6;
        const bandHeight = size / bandCount;
        
        for (let i = 0; i < bandCount; i++) {
            ctx.fillStyle = i % 2 === 0 ? 'rgba(100, 130, 255, 0.1)' : 'rgba(40, 70, 180, 0.1)';
            ctx.fillRect(0, i * bandHeight, size, bandHeight);
        }
        
        // Add Great Dark Spot
        ctx.fillStyle = 'rgba(20, 40, 120, 0.7)';
        ctx.beginPath();
        const spotX = size * 0.6;
        const spotY = size * 0.4;
        ctx.ellipse(spotX, spotY, size/8, size/12, Math.PI/4, 0, Math.PI * 2);
        ctx.fill();
        
        // Add white cloud streaks
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const width = 50 + Math.random() * 100;
            const height = 5 + Math.random() * 15;
            const angle = Math.random() * Math.PI;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.ellipse(x, y, width, height, angle, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    return canvas.toDataURL();
}

function createPlanets() {
    console.log("Creating planets...");
    
    // Create highlight material for hovering
    highlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x555555,
        metalness: 0.8,
        roughness: 0.5,
        wireframe: false,
        transparent: true,
        opacity: 0.9
    });
    
    // Create each planet
    for (const [key, planet] of Object.entries(planetData)) {
        console.log(`Creating planet: ${planet.name}`);
        
        // Initialize planet object storage
        planets[key] = planets[key] || {};
        planets[key].data = planet;
        planets[key].angle = Math.random() * Math.PI * 2;
        
        // Create geometry
        const geometry = new THREE.SphereGeometry(planet.radius, 64, 64);
        let material;
        let mesh; // Define mesh variable here to fix the reference error
        
        // Special case for Sun (emissive)
        if (planet.emissive) {
            // Create a simpler sun model that will definitely work
            material = new THREE.MeshBasicMaterial({
                color: 0xffdd00,
                emissive: 0xffaa00,
                emissiveIntensity: 0.7
            });
            
            // Create main planet mesh
            mesh = new THREE.Mesh(geometry, material);
            planets[key].mesh = mesh;
            
            // Add a glow effect around the sun
            const glowGeometry = new THREE.SphereGeometry(planet.radius * 1.2, 64, 64);
            const glowMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    "c": { value: 0.1 },
                    "p": { value: 4.5 },
                    glowColor: { value: new THREE.Color(0xffdd44) },
                    viewVector: { value: camera.position }
                },
                vertexShader: `
                    uniform vec3 viewVector;
                    uniform float c;
                    uniform float p;
                    varying float intensity;
                    void main() {
                        vec3 vNormal = normalize(normalMatrix * normal);
                        vec3 vNormel = normalize(normalMatrix * viewVector);
                        intensity = pow(c - dot(vNormal, vNormel), p);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 glowColor;
                    varying float intensity;
                    void main() {
                        vec3 glow = glowColor * intensity;
                        gl_FragColor = vec4(glow, 1.0);
                    }
                `,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });
            
            const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
            scene.add(sunGlow);
            
            // Store original material for hover effect
            originalMaterials[planet.name] = material;
        } else {
            // Regular planets with procedural textures
            try {
                if (planet.texture) {
                    const textureDataUrl = createPlanetTexture(planet.texture);
                    const texture = new THREE.TextureLoader().load(textureDataUrl);
                    
                    material = new THREE.MeshStandardMaterial({
                        map: texture,
                        metalness: 0.2,
                        roughness: 0.8
                    });
                } else {
                    material = new THREE.MeshStandardMaterial({
                        color: planet.color,
                        metalness: 0.1,
                        roughness: 0.8
                    });
                }
            } catch (error) {
                console.error(`Failed to create material for ${key}:`, error);
                // Fallback to basic material
                material = new THREE.MeshStandardMaterial({
                    color: planet.color,
                    metalness: 0.1,
                    roughness: 0.8
                });
            }
            
            // Create main planet mesh
            mesh = new THREE.Mesh(geometry, material);
            planets[key].mesh = mesh;
            
            // Store original material for hover effect
            originalMaterials[planet.name] = material;
            
            // Create layer visualization for planet structure if planet has layers
            if (planet.layers && planet.layers.length > 0) {
                // Create a group to hold layer rings
                const layerVisualization = new THREE.Group();
                
                // Position the layer visualization next to the planet
                layerVisualization.position.set(planet.radius * 1.5, 0, 0);
                layerVisualization.scale.set(0.5, 0.5, 0.5); // Make it smaller than the planet
                
                // Create concentric rings for each layer
                for (let i = 0; i < planet.layers.length; i++) {
                    const layer = planet.layers[i];
                    const layerRadius = planet.radius * layer.radius;
                    
                    // Create a ring geometry for this layer
                    // If this is the innermost layer (core), create a disk instead of a ring
                    let ringGeometry;
                    if (i === 0) {
                        ringGeometry = new THREE.CircleGeometry(layerRadius, 64);
                    } else {
                        // For outer layers, create rings (with inner radius from previous layer)
                        const previousLayerRadius = planet.radius * planet.layers[i-1].radius;
                        ringGeometry = new THREE.RingGeometry(previousLayerRadius, layerRadius, 64);
                    }
                    
                    // Create material for the layer
                    const ringMaterial = new THREE.MeshBasicMaterial({
                        color: layer.color,
                        side: THREE.DoubleSide,
                        transparent: true,
                        opacity: 0.9
                    });
                    
                    // Create mesh and add to the visualization group
                    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                    
                    // Rotate to face the camera
                    ringMesh.rotation.x = -Math.PI / 2;
                    
                    // Add a small text label with the layer name
                    const labelDiv = document.createElement('div');
                    labelDiv.className = 'layer-label';
                    labelDiv.textContent = layer.name;
                    labelDiv.style.display = 'none'; // Initially hidden
                    
                    document.body.appendChild(labelDiv);
                    
                    layerVisualization.add(ringMesh);
                }
                
                // Hide visualization initially
                layerVisualization.visible = false;
                
                // Add to the planet's mesh
                mesh.add(layerVisualization);
                
                // Store a reference for later
                planets[key].layerVisualization = layerVisualization;
            }
        }
        
        // Add simple atmospheres to Earth and gas giants
        if (key === 'earth' || key === 'jupiter' || key === 'saturn' || 
            key === 'uranus' || key === 'neptune') {
            
            // Different atmosphere colors for different planets
            let atmosphereColor;
            if (key === 'earth') {
                atmosphereColor = 0x6ca6ff; // Blue for Earth
            } else if (key === 'jupiter') {
                atmosphereColor = 0xd4ca9a; // Cream for Jupiter
            } else if (key === 'saturn') {
                atmosphereColor = 0xe8d9a0; // Pale yellow for Saturn
            } else if (key === 'uranus') {
                atmosphereColor = 0xa6fff2; // Cyan for Uranus
            } else if (key === 'neptune') {
                atmosphereColor = 0x5565e8; // Deep blue for Neptune
            }
            
            // Create atmosphere
            const atmosphereGeometry = new THREE.SphereGeometry(planet.radius * 1.05, 32, 32);
            const atmosphereMaterial = new THREE.MeshBasicMaterial({
                color: atmosphereColor,
                transparent: true,
                opacity: 0.15,
                side: THREE.BackSide
            });
            
            const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
            scene.add(atmosphere);
            
            // Store atmosphere for animation
            planets[key].atmosphere = atmosphere;
        }
        
        // Create hitboxes
        let hitboxSize;
        if (key === 'sun') {
            hitboxSize = planet.radius * 1.0;
        } else if (key === 'mercury' || planet.radius < 1) {
            hitboxSize = planet.radius * 1.6;
        } else {
            hitboxSize = planet.radius * 1.2;
        }
        
        const hoverHelperGeometry = new THREE.SphereGeometry(hitboxSize, 16, 16);
        const hoverHelperMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.0,
            depthWrite: false
        });
        const hoverHelper = new THREE.Mesh(hoverHelperGeometry, hoverHelperMaterial);
        hoverHelper.userData.planetKey = key;
        hoverHelpers.push(hoverHelper);
        mesh.add(hoverHelper);
        
        // Create orbit path
        if (planet.orbitRadius > 0) {
            const orbitGeometry = new THREE.BufferGeometry();
            const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.3 });
            
            const orbitPoints = [];
            for (let i = 0; i <= 360; i++) {
                const angle = (i * Math.PI) / 180;
                orbitPoints.push(
                    Math.sin(angle) * planet.orbitRadius,
                    0,
                    Math.cos(angle) * planet.orbitRadius
                );
            }
            
            orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
            const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
            scene.add(orbit);
        }
        
        // Add rings for Saturn
        if (planet.hasRings) {
            const ringGeometry = new THREE.RingGeometry(planet.radius + 2, planet.radius + 7, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
                color: planet.ringColor || 0xaaaaaa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;
            mesh.add(rings);
        }
        
        // Apply tilt if specified
        if (planet.tilt) {
            mesh.rotation.z = planet.tilt;
        }
        
        // Position planet
        mesh.position.x = planet.orbitRadius;
        
        // Add to scene
        scene.add(mesh);
    }
}

function updatePlanetInfo(planet) {
    if (!planet) {
        planetNameElement.textContent = "Select a planet";
        planetDescriptionElement.textContent = "Hover over a planet to see details";
        planetStatsElement.innerHTML = "";
        planetInfoPanel.style.opacity = "0.7";
        return;
    }
    
    // Update planet info panel content
    planetNameElement.textContent = planet.data.name;
    planetDescriptionElement.textContent = planet.data.description;
    
    // Update stats
    let statsHTML = "";
    for (const [key, value] of Object.entries(planet.data.stats)) {
        statsHTML += `
            <div class="stat-item">
                <span class="stat-label">${key}</span>
                <span class="stat-value">${value}</span>
            </div>
        `;
    }
    planetStatsElement.innerHTML = statsHTML;
    
    // Make the panel more visible when a planet is selected
    planetInfoPanel.style.opacity = "1";
}

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    // This accounts for the scroll position by using clientX/Y and element's position
    const solarSystemElement = document.getElementById('solar-system');
    const canvasElement = solarSystemElement.querySelector('canvas');
    const rect = canvasElement.getBoundingClientRect();
    
    // Calculate position relative to the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to normalized device coordinates
    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = -(y / rect.height) * 2 + 1;
}

function checkPlanetIntersections() {
    // Only do raycasting if mouse is over the canvas
    if (!isMouseOverCanvas) return;
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Get ALL intersections with hover helpers
    const hoverIntersects = raycaster.intersectObjects(hoverHelpers);
    
    // Reset currentIntersect, but keep activePlanet
    currentIntersect = null;
    
    if (hoverIntersects.length > 0) {
        // When multiple planets are intersected, choose the smallest one (prioritize Mercury over Sun)
        let candidatePlanet = null;
        let smallestRadius = Infinity;
        
        for (let i = 0; i < hoverIntersects.length; i++) {
            const planetKey = hoverIntersects[i].object.userData.planetKey;
            if (planetKey && planets[planetKey]) {
                const planet = planets[planetKey];
                if (planet.data.radius < smallestRadius) {
                    smallestRadius = planet.data.radius;
                    candidatePlanet = planet;
                }
            }
        }
        
        if (candidatePlanet) {
            currentIntersect = candidatePlanet;
        }
    } else {
        // Fallback to checking all planet objects if no helper was hit
        const planetObjects = [];
        Object.values(planets).forEach(planet => {
            planetObjects.push(planet.mesh);
        });
        
        const intersects = raycaster.intersectObjects(planetObjects, true);
        
        if (intersects.length > 0) {
            // Find which planet was intersected
            const intersectedObject = intersects[0].object;
            
            // Find the parent planet of the intersected object
            for (const [key, planet] of Object.entries(planets)) {
                if (planet.mesh === intersectedObject || planet.mesh.isAncestorOf(intersectedObject)) {
                    currentIntersect = planet;
                    break;
                }
            }
        }
    }
    
    // Handle highlight and info panel if intersection changed
    if (currentIntersect !== lastIntersect) {
        // Restore previous hovered planet's material if there was one (but not active planet)
        if (lastIntersect && !lastIntersect.data.emissive) {
            // Only reset material if this isn't the active planet
            if (lastIntersect !== activePlanet) {
                lastIntersect.mesh.material = originalMaterials[lastIntersect.data.name];
                lastIntersect.mesh.scale.set(1, 1, 1);
            }
        }
        
        // If we're hovering a new planet, it becomes the active planet
        if (currentIntersect) {
            // Hide previous active planet's visualization if it's different
            if (activePlanet && activePlanet !== currentIntersect && activePlanet.layerVisualization) {
                activePlanet.layerVisualization.visible = false;
                
                // Reset the material of the previous active planet
                if (!activePlanet.data.emissive) {
                    activePlanet.mesh.material = originalMaterials[activePlanet.data.name];
                    activePlanet.mesh.scale.set(1, 1, 1);
                }
            }
            
            // Set new active planet
            activePlanet = currentIntersect;
            
            // Update info panel for the new active planet
            updatePlanetInfo(activePlanet);
            
            // Highlight new planet if it's not emissive
            if (!activePlanet.data.emissive) {
                // Store original material if not already stored
                if (!originalMaterials[activePlanet.data.name]) {
                    originalMaterials[activePlanet.data.name] = activePlanet.mesh.material.clone();
                }
                
                // Apply highlight material with original color
                const highlightMat = highlightMaterial.clone();
                highlightMat.color.set(activePlanet.data.color);
                highlightMat.emissive.set(new THREE.Color(activePlanet.data.color).multiplyScalar(0.5));
                highlightMat.emissiveIntensity = 0.5;
                activePlanet.mesh.material = highlightMat;
                
                // Show layer visualization for this planet if available
                if (activePlanet.layerVisualization) {
                    activePlanet.layerVisualization.visible = true;
                    
                    // Update orientation to always face the camera
                    const cameraPosition = camera.position.clone();
                    const lookAtPos = new THREE.Vector3();
                    lookAtPos.subVectors(cameraPosition, activePlanet.mesh.position);
                    lookAtPos.normalize();
                    
                    // Orient the layer visualization to face the camera
                    activePlanet.layerVisualization.lookAt(lookAtPos);
                }
            }
        }
        
        // Change cursor style
        document.body.style.cursor = currentIntersect ? 'pointer' : 'default';
        
        // Store last intersect for hover tracking
        lastIntersect = currentIntersect;
    } else if (activePlanet && activePlanet.layerVisualization && activePlanet.layerVisualization.visible) {
        // Keep the layer visualization facing the camera
        const cameraPosition = camera.position.clone();
        const lookAtPos = new THREE.Vector3();
        lookAtPos.subVectors(cameraPosition, activePlanet.mesh.position);
        lookAtPos.normalize();
        
        // Orient the layer visualization to face the camera
        activePlanet.layerVisualization.lookAt(lookAtPos);
    }
}

// Extend THREE.Object3D to check if an object is ancestor of another
THREE.Object3D.prototype.isAncestorOf = function(child) {
    let parent = child.parent;
    while (parent) {
        if (parent === this) return true;
        parent = parent.parent;
    }
    return false;
};

function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    const time = clock.getElapsedTime();
    
    // Update planet positions
    for (const [key, planet] of Object.entries(planets)) {
        if (planet.data.orbitRadius > 0) {
            // Update orbital position
            planet.angle += planet.data.orbitSpeed * deltaTime * 10;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.data.orbitRadius;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.data.orbitRadius;
            
            // Update atmosphere position if it exists
            if (planet.atmosphere) {
                planet.atmosphere.position.copy(planet.mesh.position);
            }
            
            // Update layer visualization orientation to always face the camera if visible
            if (planet.layerVisualization && planet.layerVisualization.visible) {
                const cameraPosition = camera.position.clone();
                const lookAtPos = new THREE.Vector3();
                lookAtPos.subVectors(cameraPosition, planet.mesh.position);
                lookAtPos.normalize();
                
                // Orient the layer visualization to face the camera
                planet.layerVisualization.lookAt(lookAtPos);
            }
        }
        
        // Rotate planet
        planet.mesh.rotation.y += planet.data.rotationSpeed * deltaTime * 10;
        
        // If this is the active planet, animate the pulse
        if (activePlanet === planet && !planet.data.emissive) {
            // Calculate pulse value (0 to 1)
            hoverPulse = (Math.sin(time * 4) + 1) / 2;
            
            // Apply pulse to scale (between 1.03 and 1.07)
            const pulseScale = 1.03 + hoverPulse * 0.04;
            planet.mesh.scale.set(pulseScale, pulseScale, pulseScale);
            
            // Also animate the emissive intensity if using a highlight material
            if (planet.mesh.material.emissive) {
                planet.mesh.material.emissiveIntensity = 0.3 + hoverPulse * 0.4;
            }
        }
    }
    
    // Check for planet intersections only if mouse is over canvas
    if (isMouseOverCanvas) {
        checkPlanetIntersections();
    }
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Function to reset camera to default view
function resetCamera() {
    // Animate the camera position back to default
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    const endPosition = new THREE.Vector3(120, 80, 120);
    const endTarget = new THREE.Vector3(0, 0, 0);
    
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateReset() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        
        // Interpolate position and target
        camera.position.lerpVectors(startPosition, endPosition, easeProgress);
        controls.target.lerpVectors(startTarget, endTarget, easeProgress);
        controls.update();
        
        if (progress < 1) {
            requestAnimationFrame(animateReset);
        }
    }
    
    animateReset();
}

// Function to focus camera on a planet
function focusOnPlanet(event) {
    if (!currentIntersect) return;
    
    const planet = currentIntersect;
    const planetPos = new THREE.Vector3().copy(planet.mesh.position);
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    
    // Calculate a good camera position based on planet size
    const distance = planet.data.radius * 8;
    const offset = new THREE.Vector3(distance, distance * 0.7, distance);
    const endPosition = new THREE.Vector3().copy(planetPos).add(offset);
    
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        
        // Interpolate position and target
        camera.position.lerpVectors(startPosition, endPosition, easeProgress);
        controls.target.lerpVectors(startTarget, planetPos, easeProgress);
        controls.update();
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

// Handle linear movement when scrolling
function handleLinearScrollMovement(event) {
    event.preventDefault();
    
    // Delta will be positive for scrolling up (moving forwards) and negative for scrolling down
    const delta = Math.sign(-event.deltaY);
    
    // Calculate the direction vector from camera to target
    const direction = new THREE.Vector3();
    direction.subVectors(controls.target, camera.position).normalize();
    
    // Scale by the movement speed
    direction.multiplyScalar(delta * linearMoveSpeed);
    
    // Move both the camera and the target point to maintain the same view direction
    camera.position.add(direction);
    controls.target.add(direction);
    
    // Update the controls
    controls.update();
}

// Add reset option by clicking in empty space
function onMouseClick(event) {
    // If we're not hovering a planet and clicked in empty space, clear the active planet
    if (!currentIntersect && activePlanet) {
        // Reset the material of the active planet
        if (!activePlanet.data.emissive) {
            activePlanet.mesh.material = originalMaterials[activePlanet.data.name];
            activePlanet.mesh.scale.set(1, 1, 1);
        }
        
        // Hide layer visualization
        if (activePlanet.layerVisualization) {
            activePlanet.layerVisualization.visible = false;
        }
        
        // Clear active planet
        activePlanet = null;
        updatePlanetInfo(null);
    }
}

// Make initSolarSystem available globally
window.initSolarSystem = initSolarSystem;

// Initialize immediately if already loaded
if (document.readyState === 'complete' && typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
    console.log("Document already loaded and dependencies available, initializing immediately...");
    initSolarSystem();
} 