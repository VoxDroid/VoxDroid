# Editing the portfolio

The site renders the same content in three print editions (Two Inks, Photocopy, Sun Print).
Content lives in files; the design lives in `editions/`. You never need to touch both.

## Add or change a project

Create or edit `content/projects/<slug>.md`, where `<slug>` is the repository name in lower case:

```markdown
---
repo: "VoxDroid/krnr" # owner/name on GitHub
name: "krnr" # how the name is shown
category: "CLI Tool" # one of the categories in lib/content/schema.ts
featured: 5 # optional: rank on the home page (1 = headliner)
tagline: "..." # optional: one line under the name
summary: "..." # optional: overrides the GitHub description (required when private)
logo: "/project_images/krnr.png" # optional: square-ish image under public/
artwork: false # optional: never turn the logo into print artwork
demo: "https://..." # optional
private: true # optional: no source link, README or GitHub data
screenshots: # optional: images under public/
  - "/project_screenshots/krnr/1.png"
---

Anything written here is the project's own write-up, shown above its README.
```

Every field is checked when the site builds and in the tests; a typo stops the build with the
file and field named. Featured ranks must run 1, 2, 3… without gaps.

A public repository tagged with the `portfolio` topic on GitHub appears in the index on its own,
even without a file.

## Print artwork

`npm run art` (also run before every `dev` and `build`) turns each square-ish logo and the
portrait into the editions' artwork under `public/art/`: halftone screens, a photocopy, a
cyanotype photogram. Results are cached, so only changed images are redrawn. Wide screenshots
and banners are left typographic.

## GitHub data

`data/github.json` and `data/readme/` are a snapshot of GitHub, refreshed twice a day by the
Recent Activity workflow (`npm run snapshot` locally, with `GITHUB_TOKEN` set). Pages never call
GitHub at request time.

## Everything else

Profile, about, skills, education, services and FAQ text live in `content/site.ts`.

## Checks

`npm run verify` runs formatting, lint, types, unit tests, the production build and the
end-to-end tests (Chrome). The pre-commit hooks run the same steps.

## CV

`/cv` renders the CV in the visitor's edition and prints as an A4 document ("Save as PDF").
It is built from the same content as the site plus `content/cv.ts`, which holds the name, headline,
summary, how many featured projects to list, and an `experience` list. Roles added there appear
above the projects automatically:

```ts
experience: [
  { role: "Developer", org: "Company", period: "2025 – Present", points: ["What you did"] },
],
```
