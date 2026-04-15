# Syndicate — English Excellence

> A multilingual landing page for an English language learning platform, built
> with Vanilla JavaScript and Vite.

**Live demo:** https://larimar4you.github.io/semantic-syndicate/

---

## Tech Stack

| Layer      | Technology                                          | Purpose                                     |
| ---------- | --------------------------------------------------- | ------------------------------------------- |
| Build tool | [Vite 5](https://vitejs.dev/)                       | Dev server, bundling, HMR                   |
| JavaScript | Vanilla ES Modules                                  | No framework — pure JS                      |
| Carousel   | [Embla Carousel 8](https://www.embla-carousel.com/) | Touch-enabled sliders                       |
| CSS        | Vanilla CSS3 + PostCSS                              | No preprocessor                             |
| Templating | vite-plugin-html-inject                             | HTML partial inclusion                      |
| i18n       | Custom service                                      | `localStorage`-backed, DOM attribute-driven |
| Deployment | GitHub Pages                                        | Auto-deploy on push to `main`               |

---

## Prerequisites

| Tool        | Version                   | Check           |
| ----------- | ------------------------- | --------------- |
| **Node.js** | ≥ 18.x (LTS recommended)  | `node -v`       |
| **npm**     | ≥ 9.x (bundled with Node) | `npm -v`        |
| **Git**     | any modern                | `git --version` |

> Download Node.js: https://nodejs.org/en/download

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Larimar4you/semantic-syndicate.git
cd semantic-syndicate

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173/semantic-syndicate/** in your browser.

> **Important:** Use only the Vite dev server URL above. Do NOT use the VS Code
> Live Server extension — it will not work correctly.

### Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production → ./dist
npm run preview  # Locally preview the production build
```

---

## Project Structure

```
semantic-syndicate/
│
├── src/                          # All source code
│   ├── index.html                # Entry point — assembles partials via <load>
│   │
│   ├── partials/                 # HTML sections (injected at build time)
│   │   ├── header.html
│   │   ├── hero.html
│   │   ├── about.html
│   │   ├── lessons.html
│   │   ├── proposal.html
│   │   ├── teachers.html
│   │   ├── application.html
│   │   ├── reviews.html
│   │   └── footer.html
│   │
│   ├── js/
│   │   ├── main.js               # App bootstrap: i18n + header + carousels
│   │   ├── scroll.js             # Scroll utilities
│   │   ├── to-top.js             # Back-to-top button
│   │   │
│   │   ├── i18n/                 # Internationalization system
│   │   │   ├── bootstrap.js      # Service factory (dependency injection)
│   │   │   ├── service.js        # I18nService — core logic
│   │   │   ├── translator.js     # Dictionary lookup
│   │   │   ├── storage.js        # localStorage wrapper (Result pattern)
│   │   │   ├── dom-binder.js     # Applies translations via data-i18n attrs
│   │   │   ├── language-policy.js# Language normalisation & browser locale map
│   │   │   ├── translations.js   # UK / EN dictionaries
│   │   │   └── constants.js      # Language codes, storage keys
│   │   │
│   │   ├── carousel/             # Embla-based carousel system
│   │   │   ├── carousel.js       # Carousel class
│   │   │   ├── constants.js      # Breakpoints & options
│   │   │   ├── dot-navigation.js # Dot indicators
│   │   │   └── slide-settings.js # Responsive slide count logic
│   │   │
│   │   └── header/               # Sticky header & navigation
│   │       ├── header-controller.js
│   │       ├── section-spy-controller.js   # Active link on scroll
│   │       ├── language-dropdown-controller.js
│   │       └── mobile-menu-controller.js
│   │
│   ├── css/
│   │   ├── main.css              # Master stylesheet (imports all below)
│   │   ├── reset.css / base.css  # Custom reset & design tokens
│   │   ├── modern-normalize.css
│   │   └── [section].css         # One file per section/component
│   │
│   └── img/                      # Images, grouped by section
│       ├── hero/
│       ├── proposal/
│       ├── teachers/
│       ├── application/
│       ├── reviews/
│       └── sprite.svg            # SVG icon sprite
│
├── assets/
│   └── favicon.ico
│
├── .github/workflows/
│   ├── static.yml                # GitHub Pages deployment
│   └── validate-w3c.yml          # W3C HTML validation
│
├── vite.config.js                # Vite configuration
├── .prettierrc.json
├── .editorconfig
└── package.json
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     index.html                          │
│   <load src="partials/header.html" />                   │
│   <load src="partials/hero.html" />  ...                │
└────────────────────┬────────────────────────────────────┘
                     │ vite-plugin-html-inject
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      main.js                            │
│                                                         │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  i18n system  │  │    Header    │  │  Carousels  │  │
│  │               │  │              │  │             │  │
│  │ I18nService   │  │ SectionSpy   │  │   Embla     │  │
│  │ I18nTranslator│  │ MobileMenu   │  │  + Dots     │  │
│  │ I18nDomBinder │  │ LangDropdown │  │  + Slides   │  │
│  │ I18nStorage   │  │              │  │             │  │
│  └──────┬────────┘  └──────────────┘  └─────────────┘  │
│         │                                               │
│    localStorage                                         │
│    data-i18n attrs                                      │
└─────────────────────────────────────────────────────────┘
                     │ vite build
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   dist/                                 │
│          (deployed to GitHub Pages)                     │
└─────────────────────────────────────────────────────────┘
```

---

## Git Workflow

### Start a new feature

```bash
# Always branch from an up-to-date main
git switch main
git pull
git switch -c feature/FEATURE_NAME
```

### Save and push your work

```bash
git add .
git commit -m "feat(section): describe what you did"

# First push — set upstream
git push --set-upstream origin feature/FEATURE_NAME

# Subsequent pushes
git push
```

### Sync with main before creating a PR

```bash
git switch main
git pull
git switch feature/FEATURE_NAME
git merge main
# Resolve any conflicts, then:
git add .
git commit -m "fix: resolve merge conflicts"
git push
```

### After your PR is merged

```bash
git switch main
git pull
git branch -d feature/FEATURE_NAME
```

---

## Deployment

The project is automatically deployed to **GitHub Pages** on every push to
`main`.

```
Push to main
    └─► GitHub Actions (.github/workflows/static.yml)
            └─► npm run build
                    └─► Deployed to https://larimar4you.github.io/semantic-syndicate/
```

---

## Languages

The site ships with two languages, switchable at runtime:

| Code | Language  |
| ---- | --------- |
| `uk` | Ukrainian |
| `en` | English   |

Language preference is persisted in `localStorage`. Translations are defined in
`src/js/i18n/translations.js`.
