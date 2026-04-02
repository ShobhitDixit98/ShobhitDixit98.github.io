# Shobhit Dixit — Portfolio

Personal portfolio website for Shobhit Dixit, AI/ML Engineer and Data Scientist.

Live at: [ShobhitDixit98.github.io](https://ShobhitDixit98.github.io)

## Stack

- HTML, CSS, JavaScript (no frameworks, no build step)
- Three.js — Interactive 3D Neural Network background
- Google Fonts — Space Mono, Inter
- Font Awesome — Icons

## Structure

```text
├── index.html          # Home page
├── works.html          # Projects
├── about.html          # Background, experience, education, skills
├── contact.html        # Contact info
├── assets/
│   ├── css/styles.css  # All styles
│   ├── js/             # UI behavior & content rendering
│   │   ├── about.js    # Renders experience, education, skills
│   │   ├── cursor.js   # Custom 'blend mode' cursor logic
│   │   ├── hero-bg.js  # Three.js 3D background animation
│   │   ├── nav.js      # Mobile menu toggle
│   │   └── works.js    # Renders project cards
│   ├── images/         # Icons, headshots, and fallbacks
│   └── docs/
│       └── Shobhit_Dixit_Resume.pdf
```

## Content Management

Previously, the site relied on external JSON files in a `data/` directory. To avoid CORS issues and simplify the structure, content is now defined directly inside the corresponding Javascript files.
- To update your projects, edit the `projects` array inside `assets/js/works.js`.
- To update your experience, education, or skills, edit the arrays at the top of `assets/js/about.js`.

## Running Locally

You can open `index.html` directly in a browser. For the best experience (especially for allowing Three.js to load local texture assets if any are added later), use a local development server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

Push your updates to the `main` branch. GitHub Pages will serve `index.html` automatically.
