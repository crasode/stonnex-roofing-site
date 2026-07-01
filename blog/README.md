# Stonnex Blog — authoring & publishing guide

This folder is the home for Stonnex Roofing articles. It is designed so that new
posts stay consistent, on-brand, and SEO-optimized — whether written by a person
or drafted by an AI tool.

## Structure

```
blog/
  blog.css                              ← shared styles (do NOT duplicate per post)
  index.html                            ← listing page (add a card per new post)
  <post-slug>/index.html                ← one folder per article → clean URL /blog/<slug>/
```

Each post lives at its own clean URL: `https://stonnex.com/blog/<post-slug>/`.

## How to add a post

1. **Copy the example** `roof-replacement-cost-metro-vancouver/index.html` into a new
   folder named with a short, keyword-rich slug (lowercase, hyphens).
2. **Update, in the `<head>`:** `<title>`, meta description, `<link rel="canonical">`,
   the Open Graph tags, and both JSON-LD blocks (`BlogPosting` headline/description/
   dates/URL and the `BreadcrumbList` last item). Keep `datePublished` accurate.
3. **Write the body** inside `<article class="post-body">`. Use `<h2>`/`<h3>`,
   short paragraphs, and at least 3–4 internal links to relevant service and city
   pages (e.g. `/roof-replacement`, `/roof-repairs`, `/langley-roofing.html`).
4. **Add a card** to `index.html` (copy an existing `.post-card` block) and a
   `blogPost` entry to the `Blog` JSON-LD there.
5. **Add two lines** to `/sitemap.xml` (the post URL; bump the blog index `lastmod`).

## Quality bar (this is what protects rankings)

Google's "scaled content abuse" policy penalizes mass-produced, low-value content.
To stay firmly on the safe side, every post must:

- Answer a **real question** a Lower Mainland homeowner would search.
- Contain **genuine local specifics** (climate, neighbourhoods, BC codes, real price
  ranges) — not generic filler that could apply to any city.
- Be **reviewed by a human** before it goes live. Never auto-publish unreviewed.
- Be **unique** — no near-duplicate posts spun per city.

## Publishing workflow (recommended)

Publish via **pull request**, never a direct commit to `main`:

1. Create/commit the post on a branch (e.g. `blog/<slug>`).
2. Open a PR. A human reviews the content and the checklist above.
3. Merge → GitHub Pages deploys automatically.

Any automated tool (e.g. an AI content agent) connected to this repo should be
configured to **open PRs for review**, not push to `main`. This keeps a human in
the loop on everything that reaches the live site.

## Facts to keep accurate

Only publish claims that are literally true. Reuse the site's established figures
(e.g. residential roof replacement ranges of ~$10.5k–$26k) and the real service
area. Do not invent review counts, project counts, or certifications.
