// Galaxy region data with details about the Milky Way
const galaxyData = {
    galacticCenter: {
        name: "Galactic Center",
        radius: 5,
        position: { x: 0, y: 0, z: 0 },
        color: 0xffdd88,  // Warmer yellow for center
        emissive: true,
        description: "The Galactic Center is the rotational center of the Milky Way galaxy. It's home to a supermassive black hole called Sagittarius A* and a dense concentration of stars and interstellar gas.",
        stats: {
            "Distance from Earth": "26,000 light-years",
            "Black Hole Mass": "4.3 million solar masses",
            "Star Density": "Millions of stars per cubic parsec",
            "Age of Stars": "Mixed, many old stars",
            "Notable Features": "Sagittarius A*, Nuclear Star Cluster, Circumnuclear Disk"
        }
    },
    innerCore: {
        name: "Inner Galactic Core",
        radius: 10,
        position: { x: 0, y: 0, z: 0 },
        color: 0xfff0a0, // Brighter yellow core
        description: "The Inner Core is a region around the galactic center that contains a high density of old stars forming a bulge. It's characterized by its yellow-red stars and lack of star formation.",
        stats: {
            "Radius": "~3,000 light-years",
            "Star Types": "Predominantly older, red and yellow stars",
            "Star Formation": "Very little ongoing formation",
            "Age": "Mostly stars >10 billion years old",
            "Notable Features": "X-shaped bulge structure, High metallicity stars"
        }
    },
    perseusSpiralArm: {
        name: "Perseus Arm",
        startAngle: 0.2,
        endAngle: 4.0,
        width: 3,
        distance: 20,
        color: 0x88aaff, // Blue tint for outer arms
        brightSpots: true,
        description: "The Perseus Arm is one of the major spiral arms of the Milky Way, located outside our own Orion Arm. It contains significant star-forming regions and numerous nebulae.",
        stats: {
            "Length": "~18,000 light-years",
            "Star Formation": "Active star-forming regions",
            "Notable Regions": "Heart and Soul Nebulae, NGC 1499 (California Nebula)",
            "Star Types": "Mix of young blue stars and older populations",
            "Distance from Sun": "6,400 to 10,000 light-years"
        }
    },
    sagittariusSpiralArm: {
        name: "Sagittarius Arm",
        startAngle: 1.2,
        endAngle: 5.0,
        width: 3,
        distance: 12,
        color: 0xaabbff, // Slightly brighter blue
        brightSpots: true,
        description: "The Sagittarius Arm is a spiral arm closer to the galactic center than our own. It's a major site of star formation and contains many young, hot stars and nebulae.",
        stats: {
            "Location": "Inner galaxy, between us and the center",
            "Star Formation": "Very active star-forming regions",
            "Notable Objects": "Lagoon Nebula, Trifid Nebula, Omega Nebula",
            "Composition": "Rich in gas and dust clouds",
            "Age": "Contains many young star clusters"
        }
    },
    orionSpiralArm: {
        name: "Orion-Cygnus Arm",
        startAngle: 2.0,
        endAngle: 5.4,
        width: 3.5,
        distance: 15,
        color: 0x99b0ff, // Light blue for our local arm
        brightSpots: true,
        description: "The Orion-Cygnus Arm (also called the Local Arm) is a minor spiral arm of the Milky Way where our Solar System is located. It's named after the Orion constellation, which is one of its bright features when viewed from Earth.",
        stats: {
            "Length": "~10,000 light-years",
            "Location": "Between Perseus and Sagittarius Arms",
            "Solar System Location": "Roughly halfway along its length",
            "Notable Features": "Orion Nebula, Cygnus X star-forming region",
            "Star Types": "Mix of young and old stars"
        }
    },
    outerArm: {
        name: "Outer Arm",
        startAngle: 0.1,
        endAngle: 3.5,
        width: 2,
        distance: 30,
        color: 0x7799ff, // Darker blue for outer arm
        brightSpots: true,
        description: "The Outer Arm is one of the most distant spiral arms from the galactic center. It contains fewer stars than inner arms but still has significant star formation and gas clouds.",
        stats: {
            "Distance from Center": "~50,000 light-years",
            "Star Density": "Lower than inner arms",
            "Composition": "Higher ratio of hydrogen gas to stars",
            "Metallicity": "Lower than inner galaxy regions",
            "Notable Features": "Sparse star clusters, extended gas regions"
        }
    },
    galacticHalo: {
        name: "Galactic Halo",
        radius: 40,
        position: { x: 0, y: 0, z: 0 },
        color: 0x4466aa,
        transparent: true,
        opacity: 0.08, // More subtle halo
        description: "The Galactic Halo is a roughly spherical component of the galaxy surrounding the main disk. It contains old stars, globular clusters, and a significant amount of dark matter.",
        stats: {
            "Diameter": "~200,000 light-years",
            "Composition": "Old stars, globular clusters, dark matter",
            "Star Types": "Predominantly old, metal-poor stars",
            "Globular Clusters": "~150 known clusters",
            "Dark Matter": "Contains most of the galaxy's dark matter"
        }
    }
};

// Initialize Three.js scene
let scene, camera, renderer, controls;
let galaxyRegions = {};
let raycaster, mouse;
let clock;
let currentIntersect = null;
let lastIntersect = null;
let activePart = null; // Track the currently active galaxy part
let highlightMaterial = null;
let originalMaterials = {};
let hoverHelpers = [];
let isMouseOverCanvas = false;
let hoverPulse = 0;
let isInitialLoad = true;
let linearMoveSpeed = 5; // Speed for linear movement with scroll
let distanceMarkers = []; // Store distance markers

// DOM elements
const galaxyInfoPanel = document.getElementById('galaxy-info');
const regionNameElement = document.getElementById('region-name');
const regionDescriptionElement = document.getElementById('region-description');
const regionStatsElement = document.getElementById('region-stats');

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
function initGalaxyViewer() {
    console.log("initGalaxyViewer function called");
    // Wait a moment for libraries to be fully initialized
    setTimeout(init, 100);
}

function init() {
    console.log("Initializing galaxy viewer...");
    
    // Make sure THREE.js is properly loaded
    if (!checkDependencies()) return;
    
    // Create clock
    clock = new THREE.Clock();
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000612); // Very dark blue background
    console.log("Scene created");
    
    // Create camera - positioned for top-down view
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 0;
    camera.position.y = 90; // Higher position for better top-down view
    camera.position.x = 0;
    camera.lookAt(0, 0, 0);
    console.log("Camera created");
    
    // Create renderer with enhanced settings
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        logarithmicDepthBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const galaxyViewerElement = document.getElementById('galaxy-viewer');
    if (!galaxyViewerElement) {
        console.error("Could not find #galaxy-viewer element!");
        return;
    }
    
    galaxyViewerElement.appendChild(renderer.domElement);
    console.log("Renderer added to DOM");
    
    // Add control instructions
    const message = document.createElement('div');
    message.className = 'hover-message';
    message.textContent = 'Drag to rotate, Scroll to zoom, Shift+Drag to pan. Double-click region to focus.';
    galaxyViewerElement.appendChild(message);
    setTimeout(() => message.classList.add('show'), 100);
    setTimeout(() => message.classList.remove('show'), 7000);
    
    // Add camera controls helper button
    const resetButton = document.createElement('button');
    resetButton.className = 'camera-reset-btn';
    resetButton.textContent = 'Reset View';
    galaxyViewerElement.appendChild(resetButton);
    resetButton.addEventListener('click', resetCamera);
    
    // Add NASA logo citation
    const nasaCredit = document.createElement('div');
    nasaCredit.className = 'nasa-credit';
    nasaCredit.innerHTML = 'Visualization inspired by <a href="https://www.jpl.nasa.gov" target="_blank">NASA/JPL</a>';
    galaxyViewerElement.appendChild(nasaCredit);
    
    // Add orbit controls with proper settings for free movement
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 150;
    controls.enablePan = true;
    controls.panSpeed = 1.0;
    controls.rotateSpeed = 0.7;
    controls.autoRotate = false;
    controls.screenSpacePanning = true; // This allows proper panning in screen space
    controls.target.set(0, 0, 0);
    
    // Limit vertical rotation to maintain a more top-down view
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minPolarAngle = Math.PI / 8; // Minimum angle to prevent fully horizontal view
    
    // Disable default zoom behavior on the controls
    controls.enableZoom = false;
    
    // Add custom scroll event listener for linear movement
    galaxyViewerElement.addEventListener('wheel', handleLinearScrollMovement);
    
    console.log("Controls created");
    
    // Initialize raycaster for region hover detection
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.1;
    raycaster.params.Line.threshold = 0.1;
    raycaster.linePrecision = 0.1;
    mouse = new THREE.Vector2();
    
    // Create stars background
    createStars();
    
    // Add a NASA-style measurement grid
    createMeasurementGrid();
    
    // Add softer ambient light for the visualization
    const ambientLight = new THREE.AmbientLight(0x445566, 0.6);
    scene.add(ambientLight);
    
    // Add center light with a warmer tone
    const centerLight = new THREE.PointLight(0xffffcc, 1.2, 100, 1.5);
    centerLight.position.set(0, 5, 0);
    scene.add(centerLight);
    
    // Add additional softer directional light from above
    const directionalLight = new THREE.DirectionalLight(0xccccff, 0.4);
    directionalLight.position.set(0, 50, 0);
    scene.add(directionalLight);

    // Create galaxy structure
    createGalaxy();
    console.log("Galaxy created");
    
    // No region labels - removed
    
    // Add solar system marker
    addSolarSystemMarker();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Mouse event listeners for galaxy viewer
    galaxyViewerElement.addEventListener('mousemove', onMouseMove);
    galaxyViewerElement.addEventListener('mouseenter', () => { isMouseOverCanvas = true; });
    galaxyViewerElement.addEventListener('mouseleave', () => { 
        isMouseOverCanvas = false; 
        
        // Clear current intersection when mouse leaves the canvas
        // but don't clear activePart or hide its visualization
        if (lastIntersect && lastIntersect !== activePart && !lastIntersect.data.emissive) {
            lastIntersect.mesh.material = originalMaterials[lastIntersect.data.name];
        }
        currentIntersect = null;
        lastIntersect = null;
        
        // Don't reset info panel or cursor if we have an active part
        if (!activePart) {
            updateRegionInfo(null);
            document.body.style.cursor = 'default';
        }
    });
    
    // Double-click to focus on a region
    galaxyViewerElement.addEventListener('dblclick', focusOnRegion);
    
    // Add click handler to reset when clicking empty space
    galaxyViewerElement.addEventListener('click', onMouseClick);
    
    // Start with top-down view
    resetCamera();
    
    // Start animation loop
    console.log("Starting animation loop");
    animate();
    
    // Start with a slight rotation to make it more dynamic
    setTimeout(() => {
        isInitialLoad = false;
    }, 2000);
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

// Create a star background that's more like the NASA visualization
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
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        
        starsVertices.push(x, y, z);
        
        // Vary star sizes - most are small, some are larger
        const size = Math.random() < 0.9 ? 
            0.3 + Math.random() * 0.7 : // 90% small stars
            1.0 + Math.random() * 1.5;  // 10% larger stars
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

// Create a NASA-style measurement grid
function createMeasurementGrid() {
    const gridSize = 100;
    const mainDivisions = 10; // 10 kpc divisions (NASA style)
    
    // Create main grid - circular with radial lines
    const gridColor = 0x3355aa;
    const gridOpacity = 0.2;
    
    // Create concentric circles
    for (let i = 1; i <= mainDivisions; i++) {
        const radius = (gridSize / mainDivisions) * i;
        const circleGeometry = new THREE.RingGeometry(radius - 0.1, radius, 64);
        const circleMaterial = new THREE.MeshBasicMaterial({
            color: gridColor,
            transparent: true,
            opacity: gridOpacity,
            side: THREE.DoubleSide
        });
        
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.rotation.x = Math.PI / 2; // Lay flat on the XZ plane
        circle.position.y = -0.1; // Slightly below the galaxy plane
        scene.add(circle);
        
        // Add distance marker for each circle
        if (i % 2 === 0) { // Every other circle gets a label
            addDistanceMarker(radius, `${i * 10} kly`);
        }
    }
    
    // Create radial lines
    const segments = 16;
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x1 = 0;
        const z1 = 0;
        const x2 = Math.cos(angle) * gridSize;
        const z2 = Math.sin(angle) * gridSize;
        
        const points = [];
        points.push(new THREE.Vector3(x1, -0.1, z1));
        points.push(new THREE.Vector3(x2, -0.1, z2));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: gridColor,
            transparent: true,
            opacity: gridOpacity * 0.8
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    }
    
    // Add cardinal direction markers (NASA style)
    const directions = [
        { angle: 0, label: "GALACTIC LONGITUDE 0°" },
        { angle: Math.PI/2, label: "90°" },
        { angle: Math.PI, label: "180°" },
        { angle: 3*Math.PI/2, label: "270°" }
    ];
    
    directions.forEach(dir => {
        const x = Math.cos(dir.angle) * (gridSize + 5);
        const z = Math.sin(dir.angle) * (gridSize + 5);
        
        // Create text sprite for direction
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        context.fillStyle = '#4477cc';
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(dir.label, 128, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.7
        });
        
        const sprite = new THREE.Sprite(material);
        sprite.position.set(x, 0, z);
        sprite.scale.set(10, 2.5, 1);
        scene.add(sprite);
    });
}

// Add distance markers at specific radii
function addDistanceMarker(radius, text) {
    // Create a canvas-based text sprite
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 64;
    
    context.fillStyle = '#6688cc';
    context.font = 'bold 20px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 64, 32);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.7
    });
    
    // Position marker at 45° angle (NASA-style)
    const sprite = new THREE.Sprite(material);
    const angle = Math.PI / 4; // 45 degrees
    sprite.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
    );
    sprite.scale.set(6, 3, 1);
    scene.add(sprite);
    
    // Store for later updates
    distanceMarkers.push(sprite);
}

// Create galaxy structure
function createGalaxy() {
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
    
    // Create galactic center and core
    createGalacticCoreAndBulge();
    
    // Create spiral arms (initially hidden)
    createSpiralArms();
    
    // Create galactic halo
    createGalacticHalo();
    
    // Add background galaxies
    createBackgroundGalaxies();
}

function createGalacticCoreAndBulge() {
    // Galactic Center (supermassive black hole and surrounding stars)
    const centerData = galaxyData.galacticCenter;
    const centerGeometry = new THREE.SphereGeometry(centerData.radius, 64, 64);
    const centerMaterial = new THREE.MeshBasicMaterial({
        color: centerData.color,
        emissive: 0xffaa00,
        emissiveIntensity: 1.0
    });
    
    const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerMesh);
    
    // Store in galaxyRegions
    galaxyRegions.galacticCenter = {
        mesh: centerMesh,
        data: centerData
    };
    
    // Add a glow effect
    const glowGeometry = new THREE.SphereGeometry(centerData.radius * 1.5, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "c": { value: 0.1 },
            "p": { value: 4.5 },
            glowColor: { value: new THREE.Color(0xffffaa) },
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
    
    const centerGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(centerGlow);
    
    // Store original materials
    originalMaterials[centerData.name] = centerMaterial;
    
    // Create the inner core bulge
    const innerCoreData = galaxyData.innerCore;
    const innerCoreGeometry = new THREE.SphereGeometry(innerCoreData.radius, 64, 64);
    const innerCoreMaterial = new THREE.MeshStandardMaterial({
        color: innerCoreData.color,
        metalness: 0.3,
        roughness: 0.7,
        transparent: true,
        opacity: 0.7
    });
    
    const innerCoreMesh = new THREE.Mesh(innerCoreGeometry, innerCoreMaterial);
    scene.add(innerCoreMesh);
    
    // Store in galaxyRegions
    galaxyRegions.innerCore = {
        mesh: innerCoreMesh,
        data: innerCoreData
    };
    
    // Store original materials
    originalMaterials[innerCoreData.name] = innerCoreMaterial;
    
    // Add hitbox for center
    addHitbox(centerMesh, 'galacticCenter', centerData.radius * 1.5);
    
    // Add hitbox for inner core
    addHitbox(innerCoreMesh, 'innerCore', innerCoreData.radius * 1.2);
}

function createSpiralArms() {
    // Create each spiral arm
    for (const [key, armData] of Object.entries(galaxyData)) {
        if (key.includes('SpiralArm')) {
            const arm = createSpiralArm(armData, key);
            
            // Hide arm initially - will show on hover
            arm.visible = false;
            
            galaxyRegions[key] = {
                mesh: arm,
                data: armData
            };
            scene.add(arm);
            
            // Store original materials
            originalMaterials[armData.name] = arm.material;
            
            // Add hitbox for arm - these remain visible for interaction
            addHitbox(arm, key, armData.width * 1.5, true);
            
            // Add star particles along the arm - these remain visible
            const path = createSpiralPath(armData);
            addStarParticles(path, armData.width * 1.5, armData.color);
        }
    }
}

function createSpiralArm(armData, key) {
    // Create a spiral arm using a custom shape
    const points = [];
    const segments = 100;
    const spiralTightness = 0.2;
    
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = THREE.MathUtils.lerp(armData.startAngle, armData.endAngle, t);
        const radius = armData.distance * (1 + t * spiralTightness);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        // Add some vertical variation
        const y = (Math.cos(t * Math.PI * 4) * 0.5) * (t * 2);
        
        points.push(new THREE.Vector3(x, y, z));
    }
    
    // Create a tube geometry along the spiral path
    const path = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(path, segments, armData.width, 8, false);
    
    // Create material with some noise texture to represent stars and dust
    const material = new THREE.MeshStandardMaterial({
        color: armData.color,
        roughness: 0.7,
        metalness: 0.2,
        transparent: true,
        opacity: 0.7
    });
    
    const arm = new THREE.Mesh(tubeGeometry, material);
    
    return arm;
}

function addStarParticles(path, radius, color) {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        // Get random position along the path
        const t = Math.random();
        const pathPoint = path.getPoint(t);
        
        // Add random offset from the path center
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * radius;
        const x = pathPoint.x + Math.cos(angle) * r;
        const y = pathPoint.y + (Math.random() - 0.5) * radius * 0.5;
        const z = pathPoint.z + Math.sin(angle) * r;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // Vary star sizes
        sizes[i] = Math.random() * 2;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(color).multiplyScalar(1.5),
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
}

function createGalacticHalo() {
    const haloData = galaxyData.galacticHalo;
    const haloGeometry = new THREE.SphereGeometry(haloData.radius, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
        color: haloData.color,
        transparent: true,
        opacity: haloData.opacity,
        side: THREE.DoubleSide,
        wireframe: true
    });
    
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(halo);
    
    // Store in galaxyRegions
    galaxyRegions.galacticHalo = {
        mesh: halo,
        data: haloData
    };
    
    // Store original materials
    originalMaterials[haloData.name] = haloMaterial;
    
    // Add hitbox for halo
    addHitbox(halo, 'galacticHalo', haloData.radius);
    
    // Add some globular clusters in the halo
    addGlobularClusters(haloData.radius);
}

function addGlobularClusters(haloRadius) {
    const clusterCount = 20;
    
    for (let i = 0; i < clusterCount; i++) {
        // Create a random position in the halo
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const r = (Math.random() * 0.5 + 0.5) * haloRadius; // Push clusters to outer halo
        
        const x = r * Math.sin(theta) * Math.cos(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(theta);
        
        // Create a small sphere for each cluster
        const clusterGeometry = new THREE.SphereGeometry(0.7, 16, 16);
        const clusterMaterial = new THREE.MeshBasicMaterial({
            color: 0xddddff,
            transparent: true,
            opacity: 0.7
        });
        
        const cluster = new THREE.Mesh(clusterGeometry, clusterMaterial);
        cluster.position.set(x, y, z);
        scene.add(cluster);
    }
}

function addHitbox(mesh, key, radius, isArm = false) {
    // Create a separate hitbox for interaction
    let hitboxGeometry;
    
    if (isArm) {
        // For spiral arms, use a simpler box hitbox around the arm's bounding box
        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox;
        const size = new THREE.Vector3();
        bbox.getSize(size);
        hitboxGeometry = new THREE.BoxGeometry(size.x, size.y + radius, size.z);
    } else {
        // For spherical regions, use a sphere hitbox
        hitboxGeometry = new THREE.SphereGeometry(radius, 16, 16);
    }
    
    const hitboxMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0,
        depthWrite: false
    });
    
    const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
    hitbox.userData.regionKey = key;
    
    // Add hitbox to mesh
    mesh.add(hitbox);
    
    // Add to hoverHelpers array for raycasting
    hoverHelpers.push(hitbox);
}

function updateRegionInfo(region) {
    if (!region) {
        regionNameElement.textContent = "Select a region";
        regionDescriptionElement.textContent = "Hover over a galactic region to see details";
        regionStatsElement.innerHTML = "";
        galaxyInfoPanel.style.opacity = "0.7";
        return;
    }
    
    // Update galaxy info panel content
    regionNameElement.textContent = region.data.name;
    regionDescriptionElement.textContent = region.data.description;
    
    // Update stats
    let statsHTML = "";
    for (const [key, value] of Object.entries(region.data.stats)) {
        statsHTML += `
            <div class="stat-item">
                <span class="stat-label">${key}</span>
                <span class="stat-value">${value}</span>
            </div>
        `;
    }
    regionStatsElement.innerHTML = statsHTML;
    
    // Make the panel more visible when a region is selected
    galaxyInfoPanel.style.opacity = "1";
}

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const galaxyViewerElement = document.getElementById('galaxy-viewer');
    const canvasElement = galaxyViewerElement.querySelector('canvas');
    const rect = canvasElement.getBoundingClientRect();
    
    // Calculate position relative to the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to normalized device coordinates
    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = -(y / rect.height) * 2 + 1;
}

function checkRegionIntersections() {
    // Only do raycasting if mouse is over the canvas
    if (!isMouseOverCanvas) return;
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Get ALL intersections with hover helpers
    const hoverIntersects = raycaster.intersectObjects(hoverHelpers);
    
    // Reset currentIntersect, but keep activePart
    currentIntersect = null;
    
    if (hoverIntersects.length > 0) {
        // Find the closest intersection
        const intersect = hoverIntersects[0];
        const regionKey = intersect.object.userData.regionKey;
        
        if (regionKey && galaxyRegions[regionKey]) {
            currentIntersect = galaxyRegions[regionKey];
        }
    }
    
    // Handle highlight and info panel if intersection changed
    if (currentIntersect !== lastIntersect) {
        // Restore previous hovered region's material if there was one
        if (lastIntersect && !lastIntersect.data.emissive) {
            // Only reset material if this isn't the active region
            if (lastIntersect !== activePart) {
                lastIntersect.mesh.material = originalMaterials[lastIntersect.data.name];
                lastIntersect.mesh.scale.set(1, 1, 1);
                
                // Hide the arm if it's a spiral arm region
                if (lastIntersect.data.name.includes('Arm')) {
                    lastIntersect.mesh.visible = false;
                }
            }
        }
        
        // If we're hovering a new region, it becomes the active region
        if (currentIntersect) {
            // Hide previous active region's highlight if it's different
            if (activePart && activePart !== currentIntersect && !activePart.data.emissive) {
                activePart.mesh.material = originalMaterials[activePart.data.name];
                activePart.mesh.scale.set(1, 1, 1);
                
                // Hide the arm if it's a spiral arm region
                if (activePart.data.name.includes('Arm')) {
                    activePart.mesh.visible = false;
                }
            }
            
            // Set new active region
            activePart = currentIntersect;
            
            // Update info panel for the new active region
            updateRegionInfo(activePart);
            
            // Highlight new region
            if (!activePart.data.emissive) {
                // Store original material if not already stored
                if (!originalMaterials[activePart.data.name]) {
                    originalMaterials[activePart.data.name] = activePart.mesh.material.clone();
                }
                
                // Apply highlight material with original color
                const highlightMat = highlightMaterial.clone();
                highlightMat.color.set(activePart.data.color);
                highlightMat.emissive.set(new THREE.Color(activePart.data.color).multiplyScalar(0.5));
                highlightMat.emissiveIntensity = 0.5;
                activePart.mesh.material = highlightMat;
                
                // Show the arm if it's a spiral arm region
                if (activePart.data.name.includes('Arm')) {
                    activePart.mesh.visible = true;
                }
            }
        }
        
        // Change cursor style
        document.body.style.cursor = currentIntersect ? 'pointer' : 'default';
        
        // Store last intersect for hover tracking
        lastIntersect = currentIntersect;
    }
}

// Modify onMouseClick to hide arm when clicking elsewhere
function onMouseClick(event) {
    // If we're not hovering a region and clicked in empty space, clear the active region
    if (!currentIntersect && activePart) {
        // Reset the material of the active region
        if (!activePart.data.emissive) {
            activePart.mesh.material = originalMaterials[activePart.data.name];
            activePart.mesh.scale.set(1, 1, 1);
            
            // Hide the arm if it's a spiral arm region
            if (activePart.data.name.includes('Arm')) {
                activePart.mesh.visible = false;
            }
        }
        
        // Clear active region
        activePart = null;
        updateRegionInfo(null);
    }
}

// Add solar system marker to the galaxy
function addSolarSystemMarker() {
    // Our approximate position in the Orion Arm
    const solarPosition = new THREE.Vector3(
        -8.5,  // X position (kpc)
        0.02,  // Y position (slightly above the galactic plane)
        -8.5   // Z position (kpc)
    );
    
    // Create a small marker for the solar system
    const geometry = new THREE.SphereGeometry(0.25, 16, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        emissive: 0x00aaaa,
        emissiveIntensity: 1.0
    });
    
    const solarMarker = new THREE.Mesh(geometry, material);
    solarMarker.position.copy(solarPosition);
    scene.add(solarMarker);
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "c": { value: 0.2 },
            "p": { value: 3.0 },
            glowColor: { value: new THREE.Color(0x00ffff) },
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
    
    const solarGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    solarGlow.position.copy(solarPosition);
    scene.add(solarGlow);
    
    // Add "Solar System" label
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.fillStyle = '#00ffff';
    context.font = 'bold 18px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Solar System', 128, 32);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(solarPosition.x, solarPosition.y + 1.5, solarPosition.z);
    sprite.scale.set(7, 2, 1);
    scene.add(sprite);
    
    // Add line from solar system to galactic plane (NASA style)
    const linePoints = [
        new THREE.Vector3(solarPosition.x, -0.1, solarPosition.z),  // Bottom point at galactic plane
        solarPosition.clone()  // Position of the solar system
    ];
    
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMaterial = new THREE.LineDashedMaterial({
        color: 0x00ffff,
        linewidth: 1,
        scale: 1,
        dashSize: 0.5,
        gapSize: 0.3,
        transparent: true,
        opacity: 0.5
    });
    
    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.computeLineDistances(); // Required for dashed lines
    scene.add(line);
}

// Function to reset camera to NASA style top-down view
function resetCamera() {
    // Animate the camera position back to default
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    const endPosition = new THREE.Vector3(0, 90, 0); // Directly above for top-down view
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

// Create distant background galaxies
function createBackgroundGalaxies() {
    const galaxyCount = 30;
    const minDistance = 300;
    const maxDistance = 800;
    
    // Define different galaxy types
    const galaxyTypes = [
        { // Spiral galaxy
            geometry: new THREE.CircleGeometry(15, 32),
            material: new THREE.MeshBasicMaterial({
                color: 0xaabbff,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            }),
            onAdd: (mesh) => {
                // Add spiral texture
                const spiralTexture = createSpiralTexture();
                mesh.material.map = spiralTexture;
                mesh.material.needsUpdate = true;
            }
        },
        { // Elliptical galaxy
            geometry: new THREE.CircleGeometry(12, 32),
            material: new THREE.MeshBasicMaterial({
                color: 0xffddaa,
                transparent: true,
                opacity: 0.25,
                side: THREE.DoubleSide
            }),
            onAdd: (mesh) => {
                // Make it slightly oval
                mesh.scale.x = 1.5;
            }
        },
        { // Irregular galaxy
            geometry: new THREE.CircleGeometry(10, 32),
            material: new THREE.MeshBasicMaterial({
                color: 0xaaffee,
                transparent: true,
                opacity: 0.2,
                side: THREE.DoubleSide
            }),
            onAdd: (mesh) => {
                // Distort the shape
                const positionAttribute = mesh.geometry.getAttribute('position');
                for (let i = 0; i < positionAttribute.count; i++) {
                    const x = positionAttribute.getX(i);
                    const y = positionAttribute.getY(i);
                    const z = positionAttribute.getZ(i);
                    
                    positionAttribute.setX(i, x + (Math.random() - 0.5) * 5);
                    positionAttribute.setY(i, y + (Math.random() - 0.5) * 5);
                }
                positionAttribute.needsUpdate = true;
            }
        }
    ];
    
    for (let i = 0; i < galaxyCount; i++) {
        // Random position in a sphere
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const r = minDistance + Math.random() * (maxDistance - minDistance);
        
        const x = r * Math.sin(theta) * Math.cos(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(theta);
        
        // Pick a random galaxy type
        const galaxyType = galaxyTypes[Math.floor(Math.random() * galaxyTypes.length)];
        
        // Create galaxy
        const galaxyMesh = new THREE.Mesh(galaxyType.geometry, galaxyType.material.clone());
        
        // Position and random rotation
        galaxyMesh.position.set(x, y, z);
        galaxyMesh.rotation.x = Math.random() * Math.PI;
        galaxyMesh.rotation.y = Math.random() * Math.PI;
        galaxyMesh.rotation.z = Math.random() * Math.PI;
        
        // Apply custom modifications
        if (galaxyType.onAdd) {
            galaxyType.onAdd(galaxyMesh);
        }
        
        // Add to scene
        scene.add(galaxyMesh);
    }
}

// Create a spiral texture for background galaxies
function createSpiralTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Center point
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw spiral arms
    const arms = 2 + Math.floor(Math.random() * 3); // 2-4 arms
    const maxRadius = canvas.width / 2;
    
    // Draw bright center
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius / 4
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius / 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw arms
    for (let arm = 0; arm < arms; arm++) {
        const angleOffset = (arm * Math.PI * 2) / arms;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        
        for (let r = 5; r < maxRadius; r += 3) {
            const angle = angleOffset + (r / 30);
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            const size = 1 + (r / maxRadius) * 3;
            
            ctx.globalAlpha = 0.8 - (r / maxRadius) * 0.7;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

    }
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Create a spiral path for a given arm data
function createSpiralPath(armData) {
    const points = [];
    const segments = 100;
    const spiralTightness = 0.2;
    
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = THREE.MathUtils.lerp(armData.startAngle, armData.endAngle, t);
        const radius = armData.distance * (1 + t * spiralTightness);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        // Add some vertical variation
        const y = (Math.cos(t * Math.PI * 4) * 0.5) * (t * 2);
        
        points.push(new THREE.Vector3(x, y, z));
    }
    
    return new THREE.CatmullRomCurve3(points);
}

// Modify the animate function to remove the label updates
function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    const time = clock.getElapsedTime();
    
    // Rotate galaxy elements
    for (const [key, region] of Object.entries(galaxyRegions)) {
        // Removed rotation logic for spiral arms since they're only visible on hover
        
        // If this is the active region, animate the pulse
        if (activePart === region && !region.data.emissive) {
            // Calculate pulse value (0 to 1)
            hoverPulse = (Math.sin(time * 4) + 1) / 2;
            
            // Apply pulse to scale (between 1.03 and 1.07)
            const pulseScale = 1.03 + hoverPulse * 0.04;
            region.mesh.scale.set(pulseScale, pulseScale, pulseScale);
            
            // Also animate the emissive intensity if using a highlight material
            if (region.mesh.material.emissive) {
                region.mesh.material.emissiveIntensity = 0.3 + hoverPulse * 0.4;
            }

        }

    }
    
    // Check for region intersections only if mouse is over canvas
    if (isMouseOverCanvas) {
        checkRegionIntersections();
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

// Function to focus camera on a region
function focusOnRegion(event) {
    if (!currentIntersect) return;
    
    const region = currentIntersect;
    const regionPos = new THREE.Vector3().copy(region.mesh.position);
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    
    // Calculate a good camera position based on region size
    let distance;
    if (region.data.radius) {
        distance = region.data.radius * 3;
    } else if (region.data.width) {
        distance = region.data.width * 10;
    } else {
        distance = 20;
    }
    
    const offset = new THREE.Vector3(distance, distance * 0.5, distance);
    const endPosition = new THREE.Vector3().copy(regionPos).add(offset);
    
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        
        // Interpolate position and target
        camera.position.lerpVectors(startPosition, endPosition, easeProgress);
        controls.target.lerpVectors(startTarget, regionPos, easeProgress);
        controls.update();
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

// Make initGalaxyViewer available globally
window.initGalaxyViewer = initGalaxyViewer;

// Initialize immediately if already loaded
if (document.readyState === 'complete' && typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
    console.log("Document already loaded and dependencies available, initializing immediately...");
    initGalaxyViewer();
}     initGalaxyViewer();
} } 

