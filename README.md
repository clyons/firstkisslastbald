# 🕹️ First Kiss, Last Bald  
*A loving 90s-style fan tribute inspired by the “How Did This Get Made?” podcast.*

---

## 📖 Specify — What and Why

**What:**  
A deliberately ridiculous GeoCities-era fan site cataloguing two critical cinematic milestones:  
1. **First Kiss** — an actor’s or actress’s first on-screen kiss.  
2. **Last Bald** — their final appearance before they went bald on-screen.

**Why:**  
Born from a joke on the *How Did This Get Made?* podcast, this project celebrates fandom, nostalgia, and the internet’s golden age of bad design.  
It’s equal parts love letter and time capsule — an excuse to play with blinking text, MIDI music, and spinning GIFs while documenting an absurdly specific trivia niche.

**Who it’s for:**  
Film nerds, HDTGM listeners, meme historians, and anyone who remembers “Best viewed in Netscape 3.0.”  

**User experience goals:**  
- Instantly evoke the 1997 internet aesthetic.  
- Let visitors browse actors and see their “First Kiss” and “Last Bald” entries.  
- Encourage fan submissions via a hilariously earnest contact form.  
- Keep it fun, weird, and lightly informative.  

**What success looks like:**  
- Users laugh *and* learn something pointless.  
- Submissions start coming in.  
- Someone emails to say “this site looks like it was made in AOL Hometown.”  
- The *HDTGM* subreddit links to it.

---

## 🧠 Plan — How It’ll Work

**Tech stack:**  
- Static HTML/CSS/JS (no frameworks)  
- Hosted on GitHub Pages  
- Retro CSS + inline `<font>` and `<marquee>` for authentic chaos  
- Optional Netlify Forms or Cloudflare Worker for submissions  
- Lunr.js (or equivalent) for client-side search  

**Architecture:**  
/index.html
/about.html
/actors/
├── jason-statham.html
├── bruce-willis.html
└── index.html
/submit.html
/assets/
├── gifs/
├── backgrounds/
└── midi/


**Constraints:**  
- Must feel like 1999.  
- No modern libraries that break the illusion.  
- Lightweight, static-only hosting.  
- Avoid copyright violation — use low-res stills or public domain imagery.  

**Integrations:**  
- GitHub Issues used for feature tracking.  
- GitHub Actions (optional) for build checks or link validation.

---

## 🪜 Tasks — What to Build

Each item is a small, testable unit:

- [x] **Initialize repo structure** (`index.html`, `/assets/`, `/actors/`, `/submit.html`)
- [ ] **Add retro base styling** (tiled background, Comic Sans, `<marquee>`, `<blink>`)
- [ ] **Implement hit counter mock** (localStorage or static increment)
- [ ] **Seed actor pages** — Jason Statham and Bruce Willis
- [ ] **Create actor index page** with filters for “First Kiss” / “Last Bald”
- [ ] **Add submission form** with fields:
  - Name (actor/actress)
  - Movie or show
  - Category (First Kiss / Last Bald)
  - Comment box
- [ ] **Connect form to Netlify or mock endpoint**
- [ ] **Add About page and disclaimers**
- [ ] **Add footer linking to HDTGM**
- [ ] **Accessibility pass** (alt text, high contrast, pauseable marquees)
- [x] **Deploy to GitHub Pages**
- [x] **Configure custom domain** `firstkisslastbald.com`
- [ ] **Add README badges and contributor guidelines**

---

## ⚙️ Implement — How to Ship It

Development should follow the repo’s `issues` and `projects` boards:  
- Each task → new issue → short branch → pull request → review → merge.  
- Preview builds auto-deploy to a GitHub Pages staging branch.  
- Main branch publishes live at:
  `https://firstkisslastbald.com`

---

## 💾 Footer Requirement

Every page includes this footer:

```html
<footer>
  <hr>
  <p style="font-size:0.8em; text-align:center;">
    Inspired by <i>How Did This Get Made?</i> — created by fans, not affiliated.<br>
    concept by <a href="https://ciaranlyons.com" target="_blank" rel="noopener noreferrer">ciaranlyons.com</a>.  
    Listen to the original joke on the
    <a href="https://podcasts.apple.com/us/podcast/john-carpenters-ghosts-of-mars-live-w-nick-kroll/id409287913" target="_blank" rel="noopener noreferrer">
      How Did This Get Made? podcast
    </a>.
  </p>
</footer>
```

## 🧩 Contributing

Got an actor’s First Kiss or Last Bald moment to immortalize?
Open an issue or use the submission form on the site.
Pull requests with new GIFs, MIDI tracks, or 1990s web badges are especially welcome.

## 🏁 License

CC BY-NC-SA 4.0 — share it, remix it, but keep it free and funny.