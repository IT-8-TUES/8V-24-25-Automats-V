// Multiverse data structure
const multiverseData = {
    prime: {
        name: "Prime Universe",
        radius: 30,
        position: { x: 0, y: 0, z: 0 },
        color: 0x3377ff,
        innerColor: 0x88aaff,
        starsDensity: 1.0,
        description: "Our home universe, containing the Milky Way galaxy and all observable cosmic structures. It's governed by our familiar laws of physics and contains billions of galaxies.",
        stats: {
            "Age": "13.8 billion years",
            "Size": "93 billion light-years (observable)",
            "Dark Energy": "68%",
            "Dark Matter": "27%",
            "Normal Matter": "5%",
            "Fundamental Forces": "Gravity, Electromagnetism, Strong, Weak"
        }
    },
    quantum: {
        name: "Quantum Universe",
        radius: 25,
        position: { x: 80, y: 20, z: 40 },
        color: 0x22ccdd,
        innerColor: 0x99eeff,
        starsDensity: 0.8,
        description: "A parallel universe where quantum effects manifest at macroscopic scales. Particles exist in multiple states simultaneously across the entire cosmos, creating unusual structures and physics.",
        stats: {
            "Age": "15.2 billion years",
            "Size": "Indeterminate (quantum superposition)",
            "Dark Energy": "42%",
            "Dark Matter": "35%",
            "Normal Matter": "23%",
            "Fundamental Forces": "Quantum gravity dominant"
        }
    },
    antimatter: {
        name: "Antimatter Universe",
        radius: 28,
        position: { x: -70, y: -30, z: 20 },
        color: 0xff5577,
        innerColor: 0xff99aa,
        starsDensity: 0.9,
        description: "A universe composed primarily of antimatter instead of normal matter. Galaxy formations and cosmic structures mirror our own universe, but with opposite particle charges.",
        stats: {
            "Age": "12.5 billion years",
            "Size": "88 billion light-years (observable)",
            "Anti-Dark Energy": "73%",
            "Anti-Dark Matter": "22%",
            "Antimatter": "5%",
            "Fundamental Forces": "Same as Prime but charge-reversed"
        }
    },
    darkMatter: {
        name: "Dark Matter Universe",
        radius: 32,
        position: { x: 50, y: -70, z: -40 },
        color: 0x553377,
        innerColor: 0x8855aa,
        starsDensity: 0.4,
        description: "A shadow universe where dark matter is the dominant visible form of matter. Unusual galaxy formations create web-like structures spanning vast cosmic distances.",
        stats: {
            "Age": "16.7 billion years",
            "Size": "120 billion light-years (observable)",
            "Dark Energy": "30%",
            "Dark Matter": "65%",
            "Normal Matter": "5%",
            "Fundamental Forces": "Fifth force present (dark force)"
        }
    },
    highGravity: {
        name: "High Gravity Universe",
        radius: 22,
        position: { x: -60, y: 60, z: -30 },
        color: 0xffaa22,
        innerColor: 0xffdd88,
        starsDensity: 1.5,
        description: "A universe with a gravitational constant 10 times stronger than our own. Stars are smaller but more numerous, and galaxy clusters form incredible dense agglomerations.",
        stats: {
            "Age": "8.3 billion years",
            "Size": "40 billion light-years (observable)",
            "Dark Energy": "20%",
            "Dark Matter": "30%",
            "Normal Matter": "50%",
            "Gravitational Constant": "10G (10x Prime Universe)"
        }
    },
    fastExpansion: {
        name: "Rapid Expansion Universe",
        radius: 40,
        position: { x: -20, y: -60, z: -90 },
        color: 0x22dd88,
        innerColor: 0x99ffcc,
        starsDensity: 0.2,
        description: "A universe expanding at an accelerated rate due to extreme dark energy presence. Galaxies are sparse and widely separated, creating vast empty regions of space.",
        stats: {
            "Age": "9.5 billion years",
            "Size": "250 billion light-years (observable)",
            "Dark Energy": "95%",
            "Dark Matter": "3%",
            "Normal Matter": "2%",
            "Expansion Rate": "350 km/s/Mpc (4.5x Prime)"
        }
    },
    microverse: {
        name: "Microverse",
        radius: 15,
        position: { x: 100, y: 80, z: 90 },
        color: 0xaaddff,
        innerColor: 0xccf0ff,
        starsDensity: 2.0,
        description: "A tiny universe existing within the fabric of space-time. Despite its small size, it contains millions of microscopic galaxies with complex stellar formations.",
        stats: {
            "Age": "3.2 billion years",
            "Size": "1.5 billion light-years (observable)",
            "Dark Energy": "40%",
            "Dark Matter": "30%",
            "Normal Matter": "30%",
            "Galaxy Count": "Millions (microscale)"
        }
    }
};

// Initialize Three.js scene
let scene, camera, renderer, controls;
let universes = {};
let raycaster, mouse;
let clock;
let currentIntersect = null;
let lastIntersect = null;
let activeUniverse = null; // Track the currently active universe
let highlightMaterial = null;
let originalMaterials = {};
let hoverHelpers = [];
let isMouseOverCanvas = false;
let hoverPulse = 0;
let isInitialLoad = true;
let linearMoveSpeed = 5; // Speed for linear movement with scroll
let multiverseBoundary;
let isMobile = false; // Flag for mobile devices

// DOM elements
const universeInfoPanel = document.getElementById('universe-info');
const structureNameElement = document.getElementById('structure-name');
const structureDescriptionElement = document.getElementById('structure-description');
const structureStatsElement = document.getElementById('structure-stats');

// Check if device is mobile
function checkMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

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
function initMultiverseViewer() {
    console.log("initMultiverseViewer function called");
    // Wait a moment for libraries to be fully initialized
    setTimeout(init, 100);
}

function init() {
    console.log("Initializing multiverse viewer...");
    
    // Make sure THREE.js is properly loaded
    if (!checkDependencies()) return;
    
    // Check if we're on mobile
    isMobile = checkMobile();
    console.log("Mobile device detected:", isMobile);
    
    // Create clock
    clock = new THREE.Clock();
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000005); // Very dark background
    console.log("Scene created");
    
    // Create camera - positioned for a good initial view
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    
    // Adjust camera position based on device
    if (isMobile) {
        camera.position.z = 200;
        camera.position.y = 100;
        camera.position.x = 200;
    } else {
        camera.position.z = 150;
        camera.position.y = 80;
        camera.position.x = 150;
    }
    
    camera.lookAt(0, 0, 0);
    console.log("Camera created");
    
    // Create renderer with enhanced settings
    renderer = new THREE.WebGLRenderer({ 
        antialias: !isMobile, // Disable antialiasing on mobile for better performance
        alpha: true,
        logarithmicDepthBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
    
    const universeViewerElement = document.getElementById('universe-viewer');
    if (!universeViewerElement) {
        console.error("Could not find #universe-viewer element!");
        return;
    }
    
    universeViewerElement.appendChild(renderer.domElement);
    console.log("Renderer added to DOM");
    
    // Add control instructions
    const message = document.createElement('div');
    message.className = 'hover-message';
    message.textContent = 'Drag to rotate, Scroll to zoom, Shift+Drag to pan. Double-click a universe to focus.';
    universeViewerElement.appendChild(message);
    setTimeout(() => message.classList.add('show'), 100);
    setTimeout(() => message.classList.remove('show'), 7000);
    
    // Add camera controls helper button
    const resetButton = document.createElement('button');
    resetButton.className = 'camera-reset-btn';
    resetButton.textContent = 'Reset View';
    universeViewerElement.appendChild(resetButton);
    resetButton.addEventListener('click', resetCamera);
    
    // Add orbit controls with proper settings for free movement
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 800;
    controls.enablePan = true;
    controls.panSpeed = 1.0;
    controls.rotateSpeed = 0.7;
    controls.autoRotate = false;
    controls.screenSpacePanning = true; // This allows proper panning in screen space
    controls.target.set(0, 0, 0);
    
    // Disable default zoom behavior on the controls
    controls.enableZoom = false;
    
    // Add custom scroll event listener for linear movement
    universeViewerElement.addEventListener('wheel', handleLinearScrollMovement);
    
    console.log("Controls created");
    
    // Initialize raycaster for universe hover detection
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.3;
    raycaster.params.Line.threshold = 0.3;
    raycaster.linePrecision = 0.3;
    mouse = new THREE.Vector2();
    
    // Create multiverse boundary
    createMultiverseBoundary();
    
    // Create background stars
    createStars();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x222233, 0.8);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xccccff, 0.5);
    directionalLight.position.set(0, 100, 100);
    scene.add(directionalLight);

    // Create universe bubbles
    createUniverses();
    console.log("Universe bubbles created");
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Mouse event listeners for universe viewer
    universeViewerElement.addEventListener('mousemove', onMouseMove);
    universeViewerElement.addEventListener('mouseenter', () => { isMouseOverCanvas = true; });
    universeViewerElement.addEventListener('mouseleave', () => { 
        isMouseOverCanvas = false; 
        
        // Clear current intersection when mouse leaves the canvas
        // but don't clear activeUniverse or hide its visualization
        if (lastIntersect && lastIntersect !== activeUniverse) {
            lastIntersect.outer.material = originalMaterials[lastIntersect.data.name + "_outer"];
        }
        currentIntersect = null;
        lastIntersect = null;
        
        // Don't reset info panel or cursor if we have an active universe
        if (!activeUniverse) {
            updateUniverseInfo(null);
            document.body.style.cursor = 'default';
        }
    });
    
    // Double-click to focus on a universe
    universeViewerElement.addEventListener('dblclick', focusOnUniverse);
    
    // Add click handler to reset when clicking empty space
    universeViewerElement.addEventListener('click', onMouseClick);
    
    // Start animation loop
    console.log("Starting animation loop");
    animate();
    
    // Start with a slight rotation to make it more dynamic
    setTimeout(() => {
        isInitialLoad = false;
    }, 2000);
}

function createMultiverseBoundary() {
    // Create a large spherical boundary for the multiverse
    const boundaryGeometry = new THREE.SphereGeometry(400, 64, 64);
    const boundaryMaterial = new THREE.MeshBasicMaterial({
        color: 0x112233,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        wireframe: true
    });
    
    multiverseBoundary = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
    scene.add(multiverseBoundary);
    
    // Add some subtle nebula-like effects to the boundary
    const nebulaParticleCount = 2000;
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaPositions = [];
    const nebulaSizes = [];
    const nebulaColors = [];
    
    // Create random particles along the boundary
    for (let i = 0; i < nebulaParticleCount; i++) {
        // Create positions on the sphere surface with some variance
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const radius = 380 + Math.random() * 40; // Slightly inside and outside the boundary
        
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);
        
        nebulaPositions.push(x, y, z);
        
        // Vary sizes for nebula effect
        const size = 3 + Math.random() * 7;
        nebulaSizes.push(size);
        
        // Create colors for the nebula effect (blue/purple hues)
        const h = 0.6 + (Math.random() * 0.15); // Blue to purple hue range
        const s = 0.4 + (Math.random() * 0.3); // Moderate to high saturation
        const l = 0.4 + (Math.random() * 0.3); // Medium to bright lightness
        
        const color = new THREE.Color().setHSL(h, s, l);
        nebulaColors.push(color.r, color.g, color.b);
    }
    
    nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('size', new THREE.Float32BufferAttribute(nebulaSizes, 1));
    nebulaGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nebulaColors, 3));
    
    const nebulaMaterial = new THREE.PointsMaterial({
        size: 5,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    const nebulaParticles = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebulaParticles);
}

function createStars() {
    // Create a star field with different star sizes
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    const starSizes = [];
    const starColors = [];
    
    // Create star colors
    const colors = [
        new THREE.Color(0xffffff), // White
        new THREE.Color(0xffffee), // Warm white
        new THREE.Color(0xeeeeff), // Cool white
        new THREE.Color(0xaaaaff), // Bluish
        new THREE.Color(0xffffaa)  // Yellowish
    ];
    
    for (let i = 0; i < 8000; i++) {
        const x = THREE.MathUtils.randFloatSpread(800);
        const y = THREE.MathUtils.randFloatSpread(800);
        const z = THREE.MathUtils.randFloatSpread(800);
        
        starsVertices.push(x, y, z);
        
        // Vary star sizes - most are small, some are larger
        const size = Math.random() < 0.95 ? 
            0.1 + Math.random() * 0.4 : // 95% small stars
            0.5 + Math.random() * 1.0;  // 5% larger stars
        starSizes.push(size);
        
        // Add color variation
        const color = colors[Math.floor(Math.random() * colors.length)];
        starColors.push(color.r, color.g, color.b);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        size: 1,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

function createUniverses() {
    console.log("Creating universe bubbles...");
    
    // Create highlight material for hovering
    highlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x555555,
        metalness: 0.8,
        roughness: 0.5,
        wireframe: false,
        transparent: true,
        opacity: 0.7
    });
    
    // Create each universe bubble
    for (const [key, universeData] of Object.entries(multiverseData)) {
        console.log(`Creating universe: ${universeData.name}`);
        
        // Initialize universe object storage
        universes[key] = universes[key] || {};
        universes[key].data = universeData;
        
        // Create a group to hold the universe components
        const universeGroup = new THREE.Group();
        
        // Create outer bubble (transparent sphere)
        const outerGeometry = new THREE.SphereGeometry(universeData.radius, 64, 64);
        const outerMaterial = new THREE.MeshPhysicalMaterial({
            color: universeData.color,
            transparent: true,
            opacity: 0.3,
            roughness: 0.2,
            metalness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            envMapIntensity: 1.5,
            refractionRatio: 0.98,
            ior: 1.5
        });
        
        const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
        universeGroup.add(outerSphere);
        universes[key].outer = outerSphere;
        
        // Create inner sphere (more opaque, represents universe contents)
        const innerGeometry = new THREE.SphereGeometry(universeData.radius * 0.85, 48, 48);
        const innerMaterial = new THREE.MeshStandardMaterial({
            color: universeData.innerColor,
            transparent: true,
            opacity: 0.7,
            roughness: 0.6,
            metalness: 0.2,
            emissive: universeData.innerColor,
            emissiveIntensity: 0.2
        });
        
        const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
        universeGroup.add(innerSphere);
        universes[key].inner = innerSphere;
        
        // Add stars/galaxies inside the universe
        addUniverseContents(universeGroup, universeData);
        
        // Position the universe group
        universeGroup.position.set(
            universeData.position.x,
            universeData.position.y,
            universeData.position.z
        );
        
        // Store rotation values for animation
        universes[key].rotationSpeed = 0.05 + Math.random() * 0.1;
        universes[key].rotationAxis = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
        
        // Store original materials for hover effects
        originalMaterials[universeData.name + "_outer"] = outerMaterial.clone();
        originalMaterials[universeData.name + "_inner"] = innerMaterial.clone();
        
        // Add hitbox for interaction
        addHitbox(universeGroup, key, universeData.radius * 1.2);
        
        // Add the complete universe group to the scene
        scene.add(universeGroup);
        universes[key].group = universeGroup;
    }
    
    // Add connecting "wormholes" or "bridges" between some universes
    createMultiverseConnections();
}

function addUniverseContents(universeGroup, universeData) {
    // Add stars and galaxies inside the universe
    const starCount = Math.floor(universeData.radius * universeData.radius * universeData.starsDensity);
    const galaxyGeometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];
    const colors = [];
    
    // Add stars/galaxies with concentration towards the center
    const coreConcentration = 0.7; // Higher values mean more concentration in the core
    
    for (let i = 0; i < starCount; i++) {
        // Create a random position within the universe
        // Use a probability distribution that concentrates more points in the center
        let radius = universeData.radius * 0.8 * Math.pow(Math.random(), coreConcentration);
        
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);
        
        positions.push(x, y, z);
        
        // Vary star/galaxy sizes
        const size = Math.random() < 0.98 ? 
            0.2 + Math.random() * 0.4 : // 98% small stars
            0.8 + Math.random() * 1.2;  // 2% larger galaxies
        sizes.push(size);
        
        // Create colors based on the universe's color theme
        const baseColor = new THREE.Color(universeData.innerColor);
        const hue = baseColor.getHSL({}).h + (Math.random() - 0.5) * 0.1;
        const saturation = Math.min(1, Math.max(0, baseColor.getHSL({}).s + (Math.random() - 0.5) * 0.3));
        const lightness = Math.min(1, Math.max(0, baseColor.getHSL({}).l + (Math.random() - 0.5) * 0.4));
        
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        colors.push(color.r, color.g, color.b);
    }
    
    galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    galaxyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const galaxyMaterial = new THREE.PointsMaterial({
        size: 1.0,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
    });
    
    const galaxies = new THREE.Points(galaxyGeometry, galaxyMaterial);
    universeGroup.add(galaxies);
}

function createMultiverseConnections() {
    // Create connections between some universes (like wormholes or bridges)
    const connections = [
        { from: 'prime', to: 'quantum' },
        { from: 'quantum', to: 'microverse' },
        { from: 'prime', to: 'antimatter' },
        { from: 'darkMatter', to: 'highGravity' },
        { from: 'fastExpansion', to: 'darkMatter' }
    ];
    
    for (const connection of connections) {
        if (universes[connection.from] && universes[connection.to]) {
            createWormhole(
                universes[connection.from].group.position,
                universes[connection.to].group.position,
                new THREE.Color(multiverseData[connection.from].color),
                new THREE.Color(multiverseData[connection.to].color)
            );
        }
    }
}

function createWormhole(startPos, endPos, startColor, endColor) {
    // Create a "wormhole" connection between universes
    const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
    
    // Add some random offset to the midpoint to make the curve more interesting
    const distance = startPos.distanceTo(endPos);
    const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * distance * 0.4,
        (Math.random() - 0.5) * distance * 0.4,
        (Math.random() - 0.5) * distance * 0.4
    );
    midPoint.add(randomOffset);
    
    // Create a curved path for the wormhole
    const curve = new THREE.QuadraticBezierCurve3(
        startPos.clone(),
        midPoint,
        endPos.clone()
    );
    
    // Create tube geometry along the path
    const tubeGeometry = new THREE.TubeGeometry(curve, 30, 1, 8, false);
    
    // Create gradient colors along the tube
    const colors = [];
    const positions = tubeGeometry.getAttribute('position');
    
    for (let i = 0; i < positions.count; i++) {
        const t = i / positions.count; // normalize from 0 to 1
        
        // Create gradient color
        const color = new THREE.Color().lerpColors(startColor, endColor, t);
        colors.push(color.r, color.g, color.b);
    }
    
    tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    // Create material with vertex colors
    const tubeMaterial = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    
    // Create mesh
    const wormholeTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(wormholeTube);
    
    // Add particles flowing along the wormhole
    addWormholeParticles(curve, startColor, endColor);
}

function addWormholeParticles(curve, startColor, endColor) {
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = [];
    const particleSizes = [];
    const particleColors = [];
    const particleOffsets = []; // To animate particles at different speeds
    
    for (let i = 0; i < particleCount; i++) {
        const t = Math.random(); // Random position along the curve
        const pos = curve.getPoint(t);
        particlePositions.push(pos.x, pos.y, pos.z);
        
        // Size variation
        const size = 0.5 + Math.random() * 1.5;
        particleSizes.push(size);
        
        // Color based on position
        const color = new THREE.Color().lerpColors(startColor, endColor, t);
        particleColors.push(color.r, color.g, color.b);
        
        // Random offset for animation
        particleOffsets.push(Math.random());
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.Float32BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('offset', new THREE.Float32BufferAttribute(particleOffsets, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 2.0,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData.curve = curve;
    particles.userData.startColor = startColor;
    particles.userData.endColor = endColor;
    scene.add(particles);
}

function addHitbox(mesh, key, radius) {
    // Create a separate hitbox for interaction
    const hitboxGeometry = new THREE.SphereGeometry(radius, 16, 16);
    const hitboxMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0,
        depthWrite: false
    });
    
    const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
    hitbox.userData.universeKey = key;
    
    // Add hitbox to mesh
    mesh.add(hitbox);
    
    // Add to hoverHelpers array for raycasting
    hoverHelpers.push(hitbox);
}

function updateUniverseInfo(universe) {
    if (!universe) {
        structureNameElement.textContent = "Select a universe";
        structureDescriptionElement.textContent = "Hover over a universe bubble to see details";
        structureStatsElement.innerHTML = "";
        universeInfoPanel.style.opacity = "0.7";
        return;
    }
    
    // Update universe info panel content
    structureNameElement.textContent = universe.data.name;
    structureDescriptionElement.textContent = universe.data.description;
    
    // Update stats
    let statsHTML = "";
    for (const [key, value] of Object.entries(universe.data.stats)) {
        statsHTML += `
            <div class="stat-item">
                <span class="stat-label">${key}</span>
                <span class="stat-value">${value}</span>
            </div>
        `;
    }
    structureStatsElement.innerHTML = statsHTML;
    
    // Make the panel more visible when a universe is selected
    universeInfoPanel.style.opacity = "1";
}

function resetCamera() {
    // Animate the camera position back to default
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    const endPosition = new THREE.Vector3(150, 80, 150);
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

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const universeViewerElement = document.getElementById('universe-viewer');
    const canvasElement = universeViewerElement.querySelector('canvas');
    const rect = canvasElement.getBoundingClientRect();
    
    // Calculate position relative to the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to normalized device coordinates
    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = -(y / rect.height) * 2 + 1;
}

function checkUniverseIntersections() {
    // Only do raycasting if mouse is over the canvas
    if (!isMouseOverCanvas) return;
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Get ALL intersections with hover helpers
    const hoverIntersects = raycaster.intersectObjects(hoverHelpers);
    
    // Reset currentIntersect, but keep activeUniverse
    currentIntersect = null;
    
    if (hoverIntersects.length > 0) {
        // Find the closest intersection
        const intersect = hoverIntersects[0];
        const universeKey = intersect.object.userData.universeKey;
        
        if (universeKey && universes[universeKey]) {
            currentIntersect = universes[universeKey];
        }
    }
    
    // Handle highlight and info panel if intersection changed
    if (currentIntersect !== lastIntersect) {
        // Restore previous hovered universe's material if there was one
        if (lastIntersect) {
            // Only reset material if this isn't the active universe
            if (lastIntersect !== activeUniverse) {
                lastIntersect.outer.material = originalMaterials[lastIntersect.data.name + "_outer"];
                lastIntersect.inner.material = originalMaterials[lastIntersect.data.name + "_inner"];
            }
        }
        
        // If we're hovering a new universe, it becomes the active universe
        if (currentIntersect) {
            // Hide previous active universe's highlight if it's different
            if (activeUniverse && activeUniverse !== currentIntersect) {
                activeUniverse.outer.material = originalMaterials[activeUniverse.data.name + "_outer"];
                activeUniverse.inner.material = originalMaterials[activeUniverse.data.name + "_inner"];
            }
            
            // Set new active universe
            activeUniverse = currentIntersect;
            
            // Update info panel for the new active universe
            updateUniverseInfo(activeUniverse);
            
            // Highlight new universe
            const highlightOuterMat = highlightMaterial.clone();
            highlightOuterMat.color.set(activeUniverse.data.color);
            highlightOuterMat.emissive.set(new THREE.Color(activeUniverse.data.color).multiplyScalar(0.3));
            highlightOuterMat.opacity = 0.5;
            
            const highlightInnerMat = highlightMaterial.clone();
            highlightInnerMat.color.set(activeUniverse.data.innerColor);
            highlightInnerMat.emissive.set(new THREE.Color(activeUniverse.data.innerColor).multiplyScalar(0.5));
            highlightInnerMat.opacity = 0.8;
            
            activeUniverse.outer.material = highlightOuterMat;
            activeUniverse.inner.material = highlightInnerMat;
        }
        
        // Change cursor style
        document.body.style.cursor = currentIntersect ? 'pointer' : 'default';
        
        // Store last intersect for hover tracking
        lastIntersect = currentIntersect;
    }
}

function focusOnUniverse(event) {
    if (!currentIntersect) return;
    
    const universe = currentIntersect;
    const universePos = universe.group.position;
    
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    
    // Calculate a good camera position based on universe size
    const distance = universe.data.radius * 3;
    const offset = new THREE.Vector3(distance, distance * 0.5, distance);
    const endPosition = new THREE.Vector3().copy(universePos).add(offset);
    
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        
        // Interpolate position and target
        camera.position.lerpVectors(startPosition, endPosition, easeProgress);
        controls.target.lerpVectors(startTarget, universePos, easeProgress);
        controls.update();
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

function onMouseClick(event) {
    // If we're not hovering a universe and clicked in empty space, clear the active universe
    if (!currentIntersect && activeUniverse) {
        // Reset the material of the active universe
        activeUniverse.outer.material = originalMaterials[activeUniverse.data.name + "_outer"];
        activeUniverse.inner.material = originalMaterials[activeUniverse.data.name + "_inner"];
        
        // Clear active universe
        activeUniverse = null;
        updateUniverseInfo(null);
    }
}

function updateWormholeParticles(particles, deltaTime) {
    // Animate particles flowing along the wormhole
    if (!particles.userData.curve) return;
    
    const positions = particles.geometry.attributes.position;
    const offsets = particles.geometry.attributes.offset;
    const colors = particles.geometry.attributes.color;
    
    for (let i = 0; i < positions.count; i++) {
        // Update position
        let t = offsets.getX(i) + deltaTime * 0.2; // Speed of flow
        if (t > 1) t = t - Math.floor(t); // Loop back to start
        
        offsets.setX(i, t);
        
        // Get new position
        const pos = particles.userData.curve.getPoint(t);
        positions.setXYZ(i, pos.x, pos.y, pos.z);
        
        // Update color based on position
        const color = new THREE.Color().lerpColors(
            particles.userData.startColor,
            particles.userData.endColor,
            t
        );
        colors.setXYZ(i, color.r, color.g, color.b);
    }
    
    // Update the buffers
    positions.needsUpdate = true;
    colors.needsUpdate = true;
}

function onWindowResize() {
    // Check if mobile state has changed
    const wasMobile = isMobile;
    isMobile = checkMobile();
    
    // Update camera and renderer
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Adjust pixel ratio for mobile
    if (isMobile !== wasMobile) {
        renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
    }
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    const time = clock.getElapsedTime();
    
    // Rotate universes slowly
    for (const [key, universe] of Object.entries(universes)) {
        if (universe.group) {
            // Rotate around custom axis
            universe.group.rotateOnAxis(universe.rotationAxis, universe.rotationSpeed * deltaTime);
            
            // If this is the active universe, apply subtle pulse effect
            if (activeUniverse === universe) {
                // Calculate pulse value (0 to 1)
                hoverPulse = (Math.sin(time * 2) + 1) / 2;
                
                // Apply pulse to opacity (between base value and slightly higher)
                if (universe.outer.material.opacity) {
                    universe.outer.material.opacity = 0.4 + hoverPulse * 0.2;
                }
                
                if (universe.outer.material.emissiveIntensity) {
                    universe.outer.material.emissiveIntensity = 0.3 + hoverPulse * 0.2;
                }
            }
        }
    }
    
    // Animate wormhole particles
    scene.children.forEach(child => {
        if (child.type === 'Points' && child.userData.curve) {
            updateWormholeParticles(child, deltaTime);
        }
    });
    
    // Rotate the multiverse boundary very slowly
    if (multiverseBoundary) {
        multiverseBoundary.rotation.y += deltaTime * 0.01;
        multiverseBoundary.rotation.x += deltaTime * 0.005;
    }
    
    // Check for universe intersections only if mouse is over canvas
    if (isMouseOverCanvas) {
        checkUniverseIntersections();
    }
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Make initMultiverseViewer available globally
window.initMultiverseViewer = initMultiverseViewer;

// Initialize immediately if already loaded
if (document.readyState === 'complete' && typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
    console.log("Document already loaded and dependencies available, initializing immediately...");
    initMultiverseViewer();
} 