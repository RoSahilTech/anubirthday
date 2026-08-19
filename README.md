# ANUSHKA — THE BIRTHDAY QUEST 👑🎂

A secret, interactive, cinematic birthday website and digital quest built specially for **Anushka Mehta's 22nd Birthday**.

---

## 🌟 Features

- **15 Interactive Stages**: Mystery Intro, Identity Verification, Memory Vault, 3x3 Photo Jigsaw Puzzle, Find the Hidden Heart, Memory Trivia Quiz, Evasive Button, Memory Constellation Star Map, Passcode Lock, Fake Ending, Real Birthday Reveal, Full Polaroid Photo Treasury, Story Timeline, Special Celebrations, and Final Message.
- **Dynamic Photo Discovery**: Automatically indexes and serves all 125+ photos in `/public/images/` without manual path hardcoding or crashing on missing assets.
- **Mobile-First Responsive Design**: Optimized for iPhone, Android, tablets, and desktop devices (320px to 1440px+).
- **Cinematic Audio & Synth Fallback**: Background music support with Web Audio API sound synthesis fallback so UI effects work even if audio files are missing or blocked by browser policies.
- **GitHub Pages Ready**: Configured with Vite relative paths (`base: './'`) and GitHub Actions for automated deployment.
- **Fully Customizable**: All text, questions, clues, messages, and traits can be updated from a single file: `src/config/birthdayConfig.js`.

---

## 🚀 Quick Start & Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Local Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your web browser.

---

## 📸 Managing Photos & Audio

### Photos Directory: `/public/images/`
- Place all of Anushka's photos inside `public/images/`.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.
- Images are automatically loaded and sorted by number (e.g. `1.jpg`, `2.JPG`, `100.jpg`).

### Audio Directory: `/public/audio/`
- Place background music at `public/audio/birthday.mp3`.
- If missing, the website will operate completely safely without errors and fallback to synthesized web audio for clicks and victory sounds!

---

## ⚙️ Customizing Content

You can personalize the entire website from a single configuration file:
`src/config/birthdayConfig.js`

In this file, you can edit:
- **Name & Age**: Change `name`, `shortName`, `age`.
- **Identity Check Questions**: Change verification options and funny wrong responses.
- **Quiz Questions**: Customize trivia questions and responses.
- **Passcode Clue & Answer**: Change `finalClue` and `correctAnswer` for the final vault lock (default: `ANUSHKA`).
- **Special Qualities**: Add or modify cards in `specialThings`.
- **Final Letter**: Update paragraphs in `finalMessage`.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

The output files will be generated in the `dist` directory.

---

## 🐙 Deploying to GitHub Pages

### Step 1: Initialize Git and Push to GitHub

Run the following commands in your project directory:

```bash
git init
git add .
git commit -m "Create Anushka birthday website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

*(Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub repository details)*

### Step 2: Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository on github.com.
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push to `main` — GitHub Actions will automatically build and deploy your site!

### 🌐 Expected GitHub Pages URL
Your website will be live at:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

---

## 🛠️ Project Architecture

```
d:/Birthday/
├── public/
│   ├── images/              # All 125 photos of Anushka
│   └── audio/               # birthday.mp3
├── src/
│   ├── components/          # 15 Interactive Stage Components & Modals
│   ├── config/
│   │   ├── birthdayConfig.js # Single file for all text/quiz/clue customization
│   │   └── photos.js         # Dynamic photo auto-discovery helper
│   ├── hooks/               # useProgress, useAudio, useReducedMotion
│   ├── utils/               # Audio synth & storage helpers
│   ├── App.jsx              # Main App Stage Controller
│   └── index.css            # Tailwind & Glassmorphism styling
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages Auto-Deploy Pipeline
├── vite.config.js           # Relative base path for GitHub Pages
└── package.json
```

---

## ❤️ Made with Love for Anushka Mehta
Happy 22nd Birthday, Anushka! 🎉
