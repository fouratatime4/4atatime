# 4atatime — Lexie Yu's Web Garden

Personal portfolio and web garden. Built with vanilla HTML, CSS and JavaScript.  
Hosted on Netlify. Content managed via Decap CMS (no coding required to update).

---

## Project structure

```
4atatime/
├── index.html          Homepage
├── uiux.html           UI/UX section
├── grafix.html         Graphics section
├── ink.html            Tattoos & Illustration
├── music.html          Music
├── contact.html        Contact
├── wip.html            Work in progress placeholder
├── 404.html            Not found page
│
├── css/
│   ├── reset.css       Browser normalisation
│   ├── variables.css   Design tokens (colours, fonts, spacing)
│   ├── global.css      Nav, footer, grid, shared styles
│   ├── home.css        Homepage-only styles
│   └── section.css     Section pages + contact + wip
│
├── js/
│   ├── components.js   Injects shared nav + footer into every page
│   ├── nav.js          Mobile menu, scroll-aware nav
│   └── projects.js     Renders project cards from JSON data
│
├── data/               ← EDIT THESE to add/update projects
│   ├── uiux.json
│   ├── grafix.json
│   ├── ink.json
│   └── music.json
│
├── assets/
│   ├── fonts/          Berliner Grotesk — add .woff2 files here
│   └── images/
│       ├── logo.svg    Replace with your actual logo
│       ├── favicon.svg Replace with your actual favicon
│       └── projects/   Project thumbnails go here
│
├── admin/              Decap CMS — visit yoursite.com/admin
│   ├── index.html
│   └── config.yml
│
└── netlify.toml        Netlify deploy config + redirects
```

---

## Adding a new project (via CMS — no coding)

1. Go to `https://yourcustomdomain.art/admin`
2. Log in with your GitHub account
3. Select the section (UI/UX, Grafix, Ink!, mμsic)
4. Click **"Add projects +"** at the bottom of the list
5. Fill in all fields, upload your thumbnail image
6. Click **Publish** → the site updates in ~60 seconds ✓

---

## Adding a new project (manually, via VS Code)

If you prefer direct editing:

1. Open the relevant `data/xxx.json` file
2. Copy an existing project block and paste it at the top of the array
3. Edit the fields, place the image in `assets/images/projects/`
4. Save, then run:

```bash
git add .
git commit -m "add [project name]"
git push
```

---

## Adding Berliner Grotesk

Once you have the font files:

1. Place `.woff2` files in `/assets/fonts/`
   - `BerlinerGrotesk-Regular.woff2`
   - `BerlinerGrotesk-Medium.woff2`
   - `BerlinerGrotesk-Bold.woff2`
2. Open `css/variables.css`
3. Uncomment the `@font-face` block (lines 25–50)
4. Save and push

The site uses `Outfit` (Google Fonts) as a visual stand-in until then.

---

## Local preview

Open the project in VS Code, then click **Go Live** (bottom-right status bar)  
via the Live Server extension. Your site opens at `http://127.0.0.1:5500`.

---

## Deploy

Every `git push` to `main` automatically triggers a Netlify redeploy.  
Live in ~30–60 seconds.

---

## Tech stack

| Layer | Tool |
|---|---|
| Languages | HTML5, CSS3, vanilla JavaScript |
| Hosting | Netlify (free tier) |
| CMS | Decap CMS (self-hosted, free) |
| Version control | Git + GitHub |
| Fonts | Berliner Grotesk (display) + Roboto Serif (body) |
