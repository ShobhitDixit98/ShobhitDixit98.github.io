# Shobhit Dixit — Portfolio

Personal portfolio website for Shobhit Dixit, AI/ML Engineer and Data Scientist.

Live at: [ShobhitDixit98.github.io](https://ShobhitDixit98.github.io)

## Stack

- HTML, CSS, JavaScript (no frameworks, no build step)
- Google Fonts — Space Mono
- Font Awesome — icons

## Structure

```
├── index.html          # Home page
├── works.html          # Projects
├── about.html          # Background, experience, education, skills
├── contact.html        # Contact info
├── assets/
│   ├── css/styles.css  # All styles
│   ├── js/
│   │   ├── nav.js      # Mobile menu toggle
│   │   ├── works.js    # Renders project cards
│   │   └── about.js    # Renders experience, education, skills
│   ├── images/
│   │   ├── hero-bg.png # Hero section background
│   │   └── headshot.png
│   └── docs/
│       └── Shobhit_Dixit_Resume.pdf
└── data/               # Content JSON files (see below)
```

## Content Files (`data/`)

| File | What it controls |
|------|-----------------|
| `profile.json` | Name, title, bio, contact details |
| `hero.json` | Home page heading and CTA |
| `about.json` | About section paragraphs |
| `experience.json` | Work history |
| `education.json` | Degrees |
| `skills.json` | Skill categories and tags |
| `projects.json` | Project cards on the Works page |
| `contact.json` | Contact links |

> Note: `navigation.json`, `footer.json`, and `site-config.json` are legacy files kept for reference. The current site does not load them dynamically.

## Running Locally

Open any page directly in a browser, or use a local server to avoid CORS issues with the JSON files:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

Push to the `main` branch of this repo. GitHub Pages serves `index.html` automatically.
