// Cosmic structure data with details about the universe
const cosmicData = {
    localGroup: {
        name: "Local Group",
        radius: 5,
        position: { x: 0, y: 0, z: 0 },
        color: 0xaabbff,
        description: "The Local Group is the galaxy group that includes the Milky Way and about 80 other galaxies, including the Andromeda Galaxy. It spans approximately 10 million light-years in diameter.",
        stats: {
            "Number of Galaxies": "~80",
            "Diameter": "~10 million light-years",
            "Age": "~13 billion years",
            "Mass": "~2×10^12 solar masses",
            "Major Members": "Milky Way, Andromeda, Triangulum"
        }
    },
    virgoCluster: {
        name: "Virgo Cluster",
        radius: 8,
        position: { x: 30, y: 5, z: 15 },
        color: 0xffddaa,
        description: "The Virgo Cluster is a massive collection of galaxies that forms the heart of the larger Virgo Supercluster. It contains approximately 1,500 galaxies and is the nearest major galaxy cluster to our Local Group.",
        stats: {
            "Number of Galaxies": "~1,500",
            "Diameter": "~15 million light-years",
            "Distance from Earth": "~54 million light-years",
            "Mass": "~1.2×10^15 solar masses",
            "Galaxy Types": "Spirals, ellipticals, lenticulars"
        }
    },
    comaCluster: {
        name: "Coma Cluster",
        radius: 7,
        position: { x: -35, y: -8, z: 20 },
        color: 0xddaaff,
        description: "The Coma Cluster is a large cluster of galaxies containing over 1,000 identified galaxies. It's one of the densest known galaxy clusters in the nearby universe and is dominated by elliptical and lenticular galaxies.",
        stats: {
            "Number of Galaxies": "1,000+",
            "Diameter": "~20 million light-years",
            "Distance from Earth": "~321 million light-years",
            "Mass": "~7×10^14 solar masses",
            "Notable Features": "Two supergiant elliptical galaxies near center"
        }
    },
    laniakaeSupercluster: {
        name: "Laniakea Supercluster",
        isFilament: true,
        points: [
            { x: 0, y: 0, z: 0 },     // Local Group
            { x: 30, y: 5, z: 15 },   // Virgo Cluster
            { x: 60, y: 8, z: 30 }    // Extended filament
        ],
        color: 0x88aaff,
        width: 4,
        description: "The Laniakea Supercluster is a massive structure containing about 100,000 galaxies, including our Milky Way. The name means 'immense heaven' in Hawaiian. It spans over 500 million light-years.",
        stats: {
            "Number of Galaxies": "~100,000",
            "Diameter": "~520 million light-years",
            "Age": "~13 billion years",
            "Mass": "~1×10^17 solar masses",
            "Sub-structures": "Virgo Supercluster, Hydra-Centaurus"
        }
    },
    perseusCluster: {
        name: "Perseus Cluster",
        radius: 6.5,
        position: { x: 45, y: -12, z: -25 },
        color: 0xffaaaa,
        description: "The Perseus Cluster is one of the most massive objects in the known universe, containing thousands of galaxies immersed in a vast cloud of superheated gas. It's part of the Perseus-Pisces Supercluster.",
        stats: {
            "Number of Galaxies": "~1,300",
            "Diameter": "~25 million light-years",
            "Distance from Earth": "~240 million light-years",
            "Mass": "~2×10^15 solar masses",
            "Notable Features": "Perseus A (NGC 1275), massive AGN"
        }
    },
    greatWall: {
        name: "Sloan Great Wall",
        isFilament: true,
        points: [
            { x: -35, y: -8, z: 20 },  // Coma Cluster
            { x: -60, y: -5, z: 35 },  // midpoint
            { x: -85, y: 0, z: 40 }    // endpoint
        ],
        color: 0xaaffee,
        width: 5,
        description: "The Sloan Great Wall is one of the largest known structures in the observable universe, consisting of a massive wall of galaxies. It's over a billion light-years long.",
        stats: {
            "Length": "~1.37 billion light-years",
            "Distance from Earth": "~1 billion light-years",
            "Discovery": "2003 via Sloan Digital Sky Survey",
            "Composition": "Galaxy clusters, filaments, and voids",
            "Significance": "Challenges cosmological principle at discovery"
        }
    },
    voidBootes: {
        name: "Boötes Void",
        radius: 25,
        position: { x: 20, y: 20, z: -50 },
        color: 0x112233,
        isVoid: true,
        transparent: true,
        opacity: 0.3,
        description: "The Boötes Void is an enormous, roughly spherical region of space that contains very few galaxies. It's one of the largest known voids in the universe, often called 'the Great Nothing'.",
        stats: {
            "Diameter": "~330 million light-years",
            "Distance from Earth": "~700 million light-years",
            "Number of Galaxies": "~60 in the entire void",
            "Galaxy Density": "~1/10th of typical density",
            "Discovery": "Robert Kirshner et al., 1981"
        }
    },
    perseusPiscesFilament: {
        name: "Perseus-Pisces Filament",
        isFilament: true,
        points: [
            { x: 45, y: -12, z: -25 },  // Perseus Cluster
            { x: 70, y: -10, z: -40 },  // midpoint
            { x: 90, y: -5, z: -45 }    // endpoint
        ],
        color: 0xffccaa,
        width: 4.5,
        description: "The Perseus-Pisces Supercluster is a massive, elongated collection of galaxy clusters and groups forming a filament structure over 300 million light-years long.",
        stats: {
            "Length": "~300 million light-years",
            "Number of Galaxies": "Thousands",
            "Distance from Earth": "~250 million light-years",
            "Notable Features": "Perseus Cluster, Pisces Cluster",
            "Structure Type": "Large-scale filament"
        }
    }
};

// Initialize Three.js scene
let scene, camera, renderer, controls;
let cosmicStructures = {};
let raycaster, mouse;
let clock;
let currentIntersect = null;
let lastIntersect = null;
let activeStructure = null; // Track the currently active cosmic structure
let highlightMaterial = null;
let originalMaterials = {};
let hoverHelpers = [];
let isMouseOverCanvas = false;
let hoverPulse = 0;
let isInitialLoad = true;
let linearMoveSpeed = 5; // Speed for linear movement with scroll

// DOM elements
const universeInfoPanel = document.getElementById('universe-info');
const structureNameElement = document.getElementById('structure-name');
const structureDescriptionElement = document.getElementById('structure-description');
const structureStatsElement = document.getElementById('structure-stats');

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
function initUniverseViewer() {
    console.log("initUniverseViewer function called");
    // Wait a moment for libraries to be fully initialized
    setTimeout(init, 100);
}

function init() {
    console.log("Initializing universe viewer...");
    
    // Make sure THREE.js is properly loaded
    if (!checkDependencies()) return;
    
    // Create clock
    clock = new THREE.Clock();
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000005); // Very dark background
    console.log("Scene created");
    
    // Create camera - positioned for a good initial view
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 100;
    camera.position.y = 50;
    camera.position.x = 50;
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
    message.textContent = 'Drag to rotate, Scroll to zoom, Shift+Drag to pan. Double-click structure to focus.';
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
    controls.minDistance = 10;
    controls.maxDistance = 500;
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
    
    // Initialize raycaster for structure hover detection
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.3;
    raycaster.params.Line.threshold = 0.3;
    raycaster.linePrecision = 0.3;
    mouse = new THREE.Vector2();
    
    // Create background stars
    createStars();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x222233, 0.8);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xccccff, 0.5);
    directionalLight.position.set(0, 100, 100);
    scene.add(directionalLight);

    // Create cosmic structures
    createCosmicStructures();
    console.log("Cosmic structures created");
    
    // Create cosmic web background (subtle filament web)
    createCosmicWebBackground();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Mouse event listeners for universe viewer
    universeViewerElement.addEventListener('mousemove', onMouseMove);
    universeViewerElement.addEventListener('mouseenter', () => { isMouseOverCanvas = true; });
    universeViewerElement.addEventListener('mouseleave', () => { 
        isMouseOverCanvas = false; 
        
        // Clear current intersection when mouse leaves the canvas
        // but don't clear activeStructure or hide its visualization
        if (lastIntersect && lastIntersect !== activeStructure) {
            lastIntersect.mesh.material = originalMaterials[lastIntersect.data.name];
            if (lastIntersect.data.isFilament) {
                lastIntersect.mesh.material.opacity = 0.6;
            }
        }
        currentIntersect = null;
        lastIntersect = null;
        
        // Don't reset info panel or cursor if we have an active structure
        if (!activeStructure) {
            updateStructureInfo(null);
            document.body.style.cursor = 'default';
        }
    });
    
    // Double-click to focus on a structure
    universeViewerElement.addEventListener('dblclick', focusOnStructure);
    
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
    
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(3000);
        const y = THREE.MathUtils.randFloatSpread(3000);
        const z = THREE.MathUtils.randFloatSpread(3000);
        
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

// Create a subtle cosmic web background
function createCosmicWebBackground() {
    // Create a subtle cosmic web background with thin filaments
    const webGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    // Create random filaments in 3D space
    const filamentCount = 100;
    
    for (let i = 0; i < filamentCount; i++) {
        // Create a random start point
        const startX = THREE.MathUtils.randFloatSpread(500);
        const startY = THREE.MathUtils.randFloatSpread(500);
        const startZ = THREE.MathUtils.randFloatSpread(500);
        
        // Decide the filament length and direction
        const length = 30 + Math.random() * 70;
        const dirX = Math.random() - 0.5;
        const dirY = Math.random() - 0.5;
        const dirZ = Math.random() - 0.5;
        
        // Normalize direction
        const dirLength = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
        const normalizedDirX = dirX / dirLength;
        const normalizedDirY = dirY / dirLength;
        const normalizedDirZ = dirZ / dirLength;
        
        // Create several points along the filament
        const segments = 5 + Math.floor(Math.random() * 5);
        
        for (let j = 0; j < segments; j++) {
            const t = j / (segments - 1);
            
            // Add some randomness to make filaments less straight
            const wobbleX = (Math.random() - 0.5) * 5;
            const wobbleY = (Math.random() - 0.5) * 5;
            const wobbleZ = (Math.random() - 0.5) * 5;
            
            const posX = startX + normalizedDirX * length * t + wobbleX;
            const posY = startY + normalizedDirY * length * t + wobbleY;
            const posZ = startZ + normalizedDirZ * length * t + wobbleZ;
            
            positions.push(posX, posY, posZ);
            
            // Add subtle blue/cyan color
            const blue = 0.4 + Math.random() * 0.2;
            colors.push(0.2, 0.3, blue);
        }
    }
    
    webGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    webGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const webMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.15,
        linewidth: 1
    });
    
    // Create line segments for each filament
    for (let i = 0; i < filamentCount; i++) {
        const startIdx = i * 5 * 3; // 5 points per filament, 3 values per point
        const endIdx = startIdx + 5 * 3;
        
        const segmentPositions = positions.slice(startIdx, endIdx);
        const segmentColors = colors.slice(startIdx, endIdx);
        
        const segmentGeometry = new THREE.BufferGeometry();
        segmentGeometry.setAttribute('position', new THREE.Float32BufferAttribute(segmentPositions, 3));
        segmentGeometry.setAttribute('color', new THREE.Float32BufferAttribute(segmentColors, 3));
        
        const line = new THREE.Line(segmentGeometry, webMaterial);
        scene.add(line);
    }
}

function createCosmicStructures() {
    console.log("Creating cosmic structures...");
    
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
    
    // Create each cosmic structure
    for (const [key, structureData] of Object.entries(cosmicData)) {
        console.log(`Creating structure: ${structureData.name}`);
        
        // Initialize structure object storage
        cosmicStructures[key] = cosmicStructures[key] || {};
        cosmicStructures[key].data = structureData;
        
        let mesh;
        
        if (structureData.isFilament) {
            // Create a filament structure (cosmic web strand)
            mesh = createFilament(structureData);
            
            // Add additional particles along the filament
            addFilamentGalaxies(structureData.points, structureData.width, structureData.color);
        } else if (structureData.isVoid) {
            // Create a cosmic void (large empty space)
            mesh = createVoid(structureData);
        } else {
            // Create a galaxy cluster
            mesh = createGalaxyCluster(structureData);
        }
        
        cosmicStructures[key].mesh = mesh;
        
        // Store original material for hover effect
        originalMaterials[structureData.name] = mesh.material.clone();
        
        // Add hitbox for structure
        if (structureData.isFilament) {
            addFilamentHitbox(mesh, key, structureData);
        } else {
            addHitbox(mesh, key, structureData.radius * 1.2);
        }
        
        // Add to scene
        scene.add(mesh);
    }
}

function createGalaxyCluster(clusterData) {
    // Create a galaxy cluster with a central concentration and surrounding galaxies
    const clusterGeometry = new THREE.SphereGeometry(clusterData.radius, 32, 32);
    const clusterMaterial = new THREE.MeshStandardMaterial({
        color: clusterData.color,
        transparent: true,
        opacity: 0.3,
        wireframe: false
    });
    
    const clusterMesh = new THREE.Mesh(clusterGeometry, clusterMaterial);
    
    // Position the cluster
    if (clusterData.position) {
        clusterMesh.position.set(
            clusterData.position.x,
            clusterData.position.y,
            clusterData.position.z
        );
    }
    
    // Add galaxy particles to the cluster
    const galaxyCount = Math.floor(clusterData.radius * 30);
    const galaxyGeometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];
    const colors = [];
    
    // Add a bright core concentration
    const coreConcentration = 0.3; // Higher values mean more concentration in the core
    
    for (let i = 0; i < galaxyCount; i++) {
        // Create a random position within the cluster
        // Use a probability distribution that concentrates more points in the center
        let radius = clusterData.radius * Math.pow(Math.random(), coreConcentration);
        
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);
        
        // Add position relative to the cluster center
        positions.push(x, y, z);
        
        // Vary galaxy sizes - most are small, some are larger
        const size = Math.random() < 0.9 ? 
            0.2 + Math.random() * 0.4 : // 90% small galaxies
            0.6 + Math.random() * 0.8;  // 10% larger galaxies
        sizes.push(size);
        
        // Vary colors from the cluster base color
        const baseColor = new THREE.Color(clusterData.color);
        // Slightly change hue and saturation
        const hue = baseColor.getHSL({}).h + (Math.random() - 0.5) * 0.1;
        const saturation = Math.min(1, Math.max(0, baseColor.getHSL({}).s + (Math.random() - 0.5) * 0.2));
        const lightness = Math.min(1, Math.max(0, baseColor.getHSL({}).l + (Math.random() - 0.5) * 0.2));
        
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
        opacity: 0.8
    });
    
    const galaxies = new THREE.Points(galaxyGeometry, galaxyMaterial);
    clusterMesh.add(galaxies);
    
    return clusterMesh;
}

function createFilament(filamentData) {
    // Create a curved path for the filament
    const points = [];
    
    for (const point of filamentData.points) {
        points.push(new THREE.Vector3(point.x, point.y, point.z));
    }
    
    // Create a tube geometry along the path
    const path = new THREE.CatmullRomCurve3(points);
    const segments = Math.max(points.length * 10, 20);
    const tubeGeometry = new THREE.TubeGeometry(path, segments, filamentData.width, 8, false);
    
    // Create material 
    const tubeMaterial = new THREE.MeshStandardMaterial({
        color: filamentData.color,
        transparent: true,
        opacity: 0.6,
        roughness: 0.7,
        metalness: 0.2,
    });
    
    // Create mesh
    const filamentMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    
    return filamentMesh;
}

function createVoid(voidData) {
    // Create a large sphere for the void with subtle effect
    const voidGeometry = new THREE.SphereGeometry(voidData.radius, 32, 32);
    const voidMaterial = new THREE.MeshBasicMaterial({
        color: voidData.color,
        transparent: true,
        opacity: voidData.opacity || 0.1,
        side: THREE.BackSide, // Render on interior
        wireframe: false
    });
    
    const voidMesh = new THREE.Mesh(voidGeometry, voidMaterial);
    
    // Position the void
    if (voidData.position) {
        voidMesh.position.set(
            voidData.position.x,
            voidData.position.y,
            voidData.position.z
        );
    }
    
    return voidMesh;
}

function addFilamentGalaxies(points, width, color) {
    // Create a path from the filament points
    const pathPoints = [];
    for (const point of points) {
        pathPoints.push(new THREE.Vector3(point.x, point.y, point.z));
    }
    const path = new THREE.CatmullRomCurve3(pathPoints);
    
    // Add galaxy particles along the filament
    const galaxyCount = Math.floor(width * 50);
    const galaxyGeometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];
    const galaxyColors = [];
    
    for (let i = 0; i < galaxyCount; i++) {
        // Get random position along the path
        const t = Math.random();
        const pathPoint = path.getPoint(t);
        
        // Add random offset perpendicular to the path
        const tangent = path.getTangent(t).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        let normal = new THREE.Vector3().crossVectors(tangent, up);
        
        // Handle case where tangent is parallel to up
        if (normal.length() < 0.1) {
            normal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(1, 0, 0));
        }
        
        normal.normalize();
        const binormal = new THREE.Vector3().crossVectors(normal, tangent).normalize();
        
        const r = Math.random() * width * 0.8;
        const angle = Math.random() * Math.PI * 2;
        
        const x = pathPoint.x + (Math.cos(angle) * normal.x + Math.sin(angle) * binormal.x) * r;
        const y = pathPoint.y + (Math.cos(angle) * normal.y + Math.sin(angle) * binormal.y) * r;
        const z = pathPoint.z + (Math.cos(angle) * normal.z + Math.sin(angle) * binormal.z) * r;
        
        positions.push(x, y, z);
        
        // Vary galaxy sizes
        const size = Math.random() < 0.9 ? 
            0.2 + Math.random() * 0.3 : // 90% small galaxies
            0.5 + Math.random() * 0.7;  // 10% larger galaxies
        sizes.push(size);
        
        // Vary colors with a base of the filament color
        const baseColor = new THREE.Color(color);
        const hue = baseColor.getHSL({}).h + (Math.random() - 0.5) * 0.1;
        const saturation = Math.min(1, Math.max(0, baseColor.getHSL({}).s + (Math.random() - 0.5) * 0.2));
        const lightness = Math.min(1, Math.max(0, baseColor.getHSL({}).l + (Math.random() - 0.5) * 0.3));
        
        const galaxyColor = new THREE.Color().setHSL(hue, saturation, lightness);
        galaxyColors.push(galaxyColor.r, galaxyColor.g, galaxyColor.b);
    }
    
    galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    galaxyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(galaxyColors, 3));
    
    const galaxyMaterial = new THREE.PointsMaterial({
        size: 1.0,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const galaxies = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxies);
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
    hitbox.userData.structureKey = key;
    
    // Add hitbox to mesh
    mesh.add(hitbox);
    
    // Add to hoverHelpers array for raycasting
    hoverHelpers.push(hitbox);
}

function addFilamentHitbox(mesh, key, filamentData) {
    // Create multiple hitboxes along the filament
    const points = filamentData.points;
    
    for (let i = 0; i < points.length; i++) {
        const hitboxGeometry = new THREE.SphereGeometry(filamentData.width * 2, 16, 16);
        const hitboxMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.0,
            depthWrite: false
        });
        
        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
        hitbox.position.set(points[i].x, points[i].y, points[i].z);
        hitbox.userData.structureKey = key;
        
        // Add hitbox to scene directly
        scene.add(hitbox);
        
        // Add to hoverHelpers array for raycasting
        hoverHelpers.push(hitbox);
    }
}

function updateStructureInfo(structure) {
    if (!structure) {
        structureNameElement.textContent = "Select a structure";
        structureDescriptionElement.textContent = "Hover over a cosmic structure to see details";
        structureStatsElement.innerHTML = "";
        universeInfoPanel.style.opacity = "0.7";
        return;
    }
    
    // Update universe info panel content
    structureNameElement.textContent = structure.data.name;
    structureDescriptionElement.textContent = structure.data.description;
    
    // Update stats
    let statsHTML = "";
    for (const [key, value] of Object.entries(structure.data.stats)) {
        statsHTML += `
            <div class="stat-item">
                <span class="stat-label">${key}</span>
                <span class="stat-value">${value}</span>
            </div>
        `;
    }
    structureStatsElement.innerHTML = statsHTML;
    
    // Make the panel more visible when a structure is selected
    universeInfoPanel.style.opacity = "1";
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

function checkStructureIntersections() {
    // Only do raycasting if mouse is over the canvas
    if (!isMouseOverCanvas) return;
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Get ALL intersections with hover helpers
    const hoverIntersects = raycaster.intersectObjects(hoverHelpers);
    
    // Reset currentIntersect, but keep activeStructure
    currentIntersect = null;
    
    if (hoverIntersects.length > 0) {
        // Find the closest intersection
        const intersect = hoverIntersects[0];
        const structureKey = intersect.object.userData.structureKey;
        
        if (structureKey && cosmicStructures[structureKey]) {
            currentIntersect = cosmicStructures[structureKey];
        }
    }
    
    // Handle highlight and info panel if intersection changed
    if (currentIntersect !== lastIntersect) {
        // Restore previous hovered structure's material if there was one
        if (lastIntersect) {
            // Only reset material if this isn't the active structure
            if (lastIntersect !== activeStructure) {
                lastIntersect.mesh.material = originalMaterials[lastIntersect.data.name];
                if (lastIntersect.data.isFilament) {
                    lastIntersect.mesh.material.opacity = 0.6;
                }
            }
        }
        
        // If we're hovering a new structure, it becomes the active structure
        if (currentIntersect) {
            // Hide previous active structure's highlight if it's different
            if (activeStructure && activeStructure !== currentIntersect) {
                activeStructure.mesh.material = originalMaterials[activeStructure.data.name];
                if (activeStructure.data.isFilament) {
                    activeStructure.mesh.material.opacity = 0.6;
                }
            }
            
            // Set new active structure
            activeStructure = currentIntersect;
            
            // Update info panel for the new active structure
            updateStructureInfo(activeStructure);
            
            // Highlight new structure
            const highlightMat = highlightMaterial.clone();
            highlightMat.color.set(activeStructure.data.color);
            
            // Adjust highlight based on structure type
            if (activeStructure.data.isFilament) {
                highlightMat.opacity = 0.9;
                highlightMat.emissive.set(new THREE.Color(activeStructure.data.color).multiplyScalar(0.3));
            } else if (activeStructure.data.isVoid) {
                highlightMat.opacity = 0.2;
                highlightMat.emissive.set(0x000000);
            } else {
                highlightMat.opacity = 0.6;
                highlightMat.emissive.set(new THREE.Color(activeStructure.data.color).multiplyScalar(0.3));
            }
            
            activeStructure.mesh.material = highlightMat;
        }
        
        // Change cursor style
        document.body.style.cursor = currentIntersect ? 'pointer' : 'default';
        
        // Store last intersect for hover tracking
        lastIntersect = currentIntersect;
    }
}

// Reset camera to default view
function resetCamera() {
    // Animate the camera position back to default
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    const endPosition = new THREE.Vector3(100, 50, 100);
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

// Function to focus camera on a cosmic structure
function focusOnStructure(event) {
    if (!currentIntersect) return;
    
    const structure = currentIntersect;
    let structurePos;
    
    if (structure.data.isFilament) {
        // For filaments, focus on the midpoint
        const midIndex = Math.floor(structure.data.points.length / 2);
        structurePos = new THREE.Vector3(
            structure.data.points[midIndex].x,
            structure.data.points[midIndex].y,
            structure.data.points[midIndex].z
        );
    } else {
        structurePos = new THREE.Vector3().copy(structure.mesh.position);
    }
    
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3().copy(controls.target);
    
    // Calculate a good camera position based on structure size
    let distance;
    if (structure.data.radius) {
        distance = structure.data.radius * 4;
    } else if (structure.data.width) {
        distance = structure.data.width * 20;
    } else {
        distance = 50;
    }
    
    const offset = new THREE.Vector3(distance, distance * 0.7, distance);
    const endPosition = new THREE.Vector3().copy(structurePos).add(offset);
    
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        
        // Interpolate position and target
        camera.position.lerpVectors(startPosition, endPosition, easeProgress);
        controls.target.lerpVectors(startTarget, structurePos, easeProgress);
        controls.update();
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

// Handle clicks on empty space
function onMouseClick(event) {
    // If we're not hovering a structure and clicked in empty space, clear the active structure
    if (!currentIntersect && activeStructure) {
        // Reset the material of the active structure
        activeStructure.mesh.material = originalMaterials[activeStructure.data.name];
        if (activeStructure.data.isFilament) {
            activeStructure.mesh.material.opacity = 0.6;
        }
        
        // Clear active structure
        activeStructure = null;
        updateStructureInfo(null);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Check for structure intersections only if mouse is over canvas
    if (isMouseOverCanvas) {
        checkStructureIntersections();
    }
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Make initUniverseViewer available globally
window.initUniverseViewer = initUniverseViewer;

// Initialize immediately if already loaded
if (document.readyState === 'complete' && typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined') {
    console.log("Document already loaded and dependencies available, initializing immediately...");
    initUniverseViewer();
} 