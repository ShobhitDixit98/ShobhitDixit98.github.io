<div align="center">

# 🚀 Shobhit Dixit — Personal Portfolio

[![Deploy Status](https://img.shields.io/badge/Deployed_on-GitHub_Pages-blue?style=for-the-badge&logo=github)](https://ShobhitDixit98.github.io)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML_|_CSS_|_JS-yellow?style=for-the-badge)]()
[![Three.js](https://img.shields.io/badge/3D-Three.js-black?style=for-the-badge&logo=three.js)]()
[![Build Status](https://img.shields.io/badge/Build-Zero_Dependency-brightgreen?style=for-the-badge)]()

**A highly customized, performance-focused personal portfolio built for an AI/ML Engineer with interactive 3D elements and a premium UI aesthetic.**  

[Live Demo](https://ShobhitDixit98.github.io) 

</div>

---

## ✨ Features

- **Interactive 3D Background**: Features an interactive, deep-space neural network visualization built purely with *Three.js*, running efficiently natively on the GPU.
- **Premium Glassmorphism UI**: Inspired by cutting-edge design studios, utilizing frosted-glass overlays (`backdrop-filter`) and deep contrasting panels for project cards.
- **Custom Hardware-Accelerated Cursor**: Implements an inverted, square custom cursor spanning the entire application using optimized CSS transforms and `mix-blend-mode`.
- **Zero-Dependency Architecture**: No `npm`, no Webpack, no React. Pure Vanilla JavaScript, HTML5, and CSS3 for lightning-fast page loading and total control.
- **Automatic Typewriter Subtitles**: Implements a native, HTML-aware DOM typewriter effect ensuring dynamic and fluid loading sequences for text sections.
- **"Click-to-Copy" Contacts**: Streamlines user experience by converting `mailto:` and `tel:` links to a secure copy-to-clipboard functionality accompanied by a sleek toast-notification.

---

## 🛠 Tech Stack

- **Core**: HTML5, CSS3, Vanilla ES6 JavaScript
- **Graphics Framework**: Three.js (`v0.148.0`) via CDN
- **Typography**: Space Mono (Google Fonts), Inter
- **Iconography**: FontAwesome

---

## 🎨 Customizing & Forking

If you'd like to use this template for your own portfolio, it is designed to be easily configurable without diving into complex HTML trees. All textual and portfolio data is isolated into specific files.

### 1. Where to update content

| Domain | File Location | Editable Elements |
|--------|---------------|-------------------|
| **Global Meta** | `index.html` (Hero) | Hero titles, `<head>` SEO tags, role monograms, and footer links. |
| **Contact Info** | `contact.html` | Phone, Email, Location formatting. |
| **Identity** | `about.html` | The "About" description paragraphs. |
| **Experience / Skills** | `assets/js/about.js` | Arrays storing your work experience, education timelines, and skill tags. |
| **Projects (Works)** | `assets/js/works.js` | The `projects` array storing card imagery, tags, titles, and GitHub links. |

<details>
<summary><b>Viewing an example config snippet</b></summary>
<br>
Inside `assets/js/works.js`, simply modify the array:

```javascript
const projects = [
  {
    title: "Project Name",
    description: "Brief summary of your project.",
    category: "Machine Learning",
    technologies: ["Python", "AWS", "Docker"],
    image: "https://your-image-url.com",
    github: "https://github.com/YourName/Repo",
    featured: true
  }
];
```
</details>

---

## 📂 Project Structure

```text
├── index.html          # Hero page, 3D Canvas, Quick Stats
├── works.html          # Project display grid
├── about.html          # Background, experience, education, skills
├── contact.html        # Contact info & social links
├── assets/
│   ├── css/styles.css  # Unified design system & custom animations
│   ├── js/             # UI behavior & content rendering
│   │   ├── about.js    # Renders experience, education, skills
│   │   ├── cursor.js   # Custom 'blend mode' cursor logic
│   │   ├── hero-bg.js  # Three.js 3D background animation
│   │   ├── nav.js      # Mobile menu toggle & global scripts (Toast, Typewriter)
│   │   └── works.js    # Data array and rendering for Works page
│   ├── images/         # Favicon and local static images
│   └── docs/           # Hosted resumes (PDFs)
```

---

## 💻 Running Locally

Because this project relies exclusively on Vanilla JS and simple file-links, no heavy `node_modules` installations are needed. However, due to browser security restrictions involving local ES modules or Three.js textures, it's recommended to serve the site via a local HTTP server.

**Option 1: Python (Recommended)**
```bash
python -m http.server 8000
```
**Option 2: Node / npx**
```bash
npx serve .
```

Then visit `http://localhost:8000` or `http://localhost:3000`.

---

## 🚀 Deploying

Simply push your updates to the `main` branch. 
Navigate to your repository's **Settings > Pages** and set the source branch to **main**, targeting the root `/` folder. GitHub Pages will serve `index.html` automatically immediately upon pushing.

---

<div align="center">
  <sub>Developed by <a href="https://github.com/ShobhitDixit98">Shobhit Dixit</a></sub>
</div>
