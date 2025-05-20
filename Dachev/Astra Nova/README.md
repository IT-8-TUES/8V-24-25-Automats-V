# Astra Nova

A space-themed interactive website for exploring the universe.

## Project Overview

Astra Nova is a visually stunning website that allows users to explore space-related content including:
- The Solar System
- Galaxies
- The theoretical Multiverse

The website features interactive 3D visualizations powered by Three.js, a responsive design that works on various devices, and a dark/light theme toggle.

## Project Structure

```
astra-nova/
├── css/                   # Modular CSS files
│   ├── base.css           # Variables, reset, and typography
│   ├── layout.css         # Layout components (header, footer, etc.)
│   ├── main.css           # Main CSS file that imports all others
│   ├── responsive.css     # Media queries for responsive design
│   ├── components/        # Reusable component styles
│   ├── pages/             # Page-specific styles
│   │   ├── home.css       # Home page styles
│   │   └── visualization.css # Styles for visualization pages
│   └── themes/            # Theme-specific styles
│       └── light.css      # Light theme overrides
├── js/                    # JavaScript files
│   ├── main.js            # Main JavaScript file
│   └── viewers/           # Visualization JavaScript files
│       ├── solar-system.js    # Solar System visualization logic
│       ├── galaxy-viewer.js   # Galaxy visualization logic
│       ├── universe-viewer.js # Universe visualization logic
│       └── multiverse-viewer.js # Multiverse visualization logic
├── images/                # Image assets
├── pages/                 # HTML pages (except index.html)
│   ├── planets.html       # Solar System visualization page
│   ├── galaxies.html      # Galaxies visualization page
│   └── universe.html      # Multiverse visualization page
└── index.html             # Home page
```

## CSS Structure

The CSS is organized in a modular structure:

- **main.css**: Imports all other CSS files
- **base.css**: Contains variables, reset styles, and typography
- **layout.css**: Layout components like header, navigation, and footer
- **pages/*.css**: Page-specific styles
- **themes/*.css**: Theme-specific styles
- **responsive.css**: Media queries for responsive design

## Features

- Interactive 3D visualizations of cosmic objects
- Dark/light theme toggle with smooth transitions
- Responsive design that works on mobile, tablet, and desktop
- Modern UI with animations and transitions
- Cosmic facts and educational content

## Technologies Used

- HTML5, CSS3, JavaScript
- Three.js for 3D visualizations
- Font Awesome for icons

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- Font Awesome for icons
- Three.js for 3D rendering
- NASA for space imagery references 