# The Midnight Cabinet

A standalone spooky trivia slideshow with **500 sourced questions and 1,000 alternating question/answer screens**. Each reveal retains the full question. Designed for landscape Chrome, with responsive mobile layouts and locally bundled original SVG illustrations. No backend, login, audio, tracking, remote fonts or image hotlinks.

## Development

Requires Node.js 20+ and installed Google Chrome for browser QA.

```sh
npm ci
npm run dev
# http://127.0.0.1:4173
npm test
npm run build
node scripts/qa-integrated.mjs
```

The integrated browser test serves dist on port 4174 and tests the complete 1,000-screen loop, four viewport sizes, long text, paired imagery, controls, timing and fullscreen. Reports are generated in ignored test-results/. Build before running QA.

## Controls

Questions default to 18 seconds; answers to 10. Space/K toggles playback, arrows navigate, F requests fullscreen, T opens timing and I opens sources. Escape closes panels. Space retains normal activation behavior when a button has focus; K always toggles playback outside form fields/dialogs. Timings accept 5–120 seconds and persist locally when available.

The archives support search, pagination and jump-to-tale. Only six nearby navigation dots render and one upcoming illustration preloads.

## Content and editorial policy

The collection contains 133 cinema, 128 folklore, 135 Gothic literature and 104 seasonal/history questions. All 500 records have citations; 1,000 paired illustrations total approximately 1.3 MB uncompressed. Original art is bundled in assets/.

- content.js preserves the original three and assembles the final sequence.
- content-extra.js holds the initial 97 additions; content-expanded.js holds the 400 additions.
- drafts/phase-two/batch-01.js through batch-04.js retain editable expansion source records and evidence locators.
- editorial/ records review rules, director replacements and pre-1978 casting replacements.
- player.js owns deterministic elapsed-time state; app.js owns the rendering loop.

No director-identification questions are allowed. Actor/casting/voice/narration identity questions require a film released in 1978 or later. Older-film story and setting questions remain eligible. Source passages must support the answer, and question artwork must not reveal it. Folklore and living traditions are presented as traditions, not supernatural fact. Source links may change independently.

## Vercel deployment

Production URL: https://midnight-cabinet-one.vercel.app/

Use the existing Hahn Enterprises project midnight-cabinet. Configure the Git repository edhahn/midnight-cabinet with production branch main, project root repository root, framework Other, build command npm run build, and output directory dist. The repository configuration is in vercel.json. Do not create a second project or change the domain. Git auto-deployment setup is verified separately; this README does not claim it is already connected.

After a READY deployment, run node scripts/release-smoke.mjs against the production URL and set DEPLOYMENT_ID to the actual new ID when running node scripts/verify-deploy.mjs. Verification compares every dist file to production by SHA-256.

## Scope

Chrome checks cover 1920×1080, 1280×720, 390×844 and 320×568. Narrow screens may scroll vertically and long names wrap. Reduced motion is supported. Fullscreen remains browser-controlled. Physical Samsung TV, Safari and AirPlay behavior has not been verified.
