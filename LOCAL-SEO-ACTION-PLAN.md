# Stonnex Local SEO Action Plan — ranking #1 for "[city] roofer"

The site changes in this branch cover the **on-page** half of local SEO
(content, internal links, schema, speed, mobile, reviews). This document covers
the **off-page** half — the work that happens *outside* the website and that
Google weighs just as heavily, especially for the Map Pack and "near me"
searches. None of this can be done from the code repo; it's operational work.

Priorities are ordered by impact. Do them roughly top to bottom.

---

## 1. Google Business Profile (GBP) — highest impact

For "[city] roofer" and "roofer near me", GBP is the single biggest ranking
factor. Get this airtight:

- [ ] **Primary category:** `Roofing Contractor` (exact). Add secondary
      categories that apply (e.g. `Gutter cleaning service`).
- [ ] **Service areas:** list all 14 cities you serve (Vancouver, Burnaby,
      Surrey, North/West Vancouver, Coquitlam, Port Coquitlam, New Westminster,
      Richmond, Delta, Langley, Maple Ridge, Abbotsford, Chilliwack).
- [ ] **Services:** add each service with a short description (roof
      replacement, roof repair, flat/torch-on, inspections, gutters, skylights).
      Mirror the site's service names.
- [ ] **Business name:** use your real registered name only. Do **not** stuff
      keywords/cities into the name — that's against Google's guidelines and
      risks suspension.
- [ ] **Description:** 750 chars, natural, mentions services + Lower Mainland.
- [ ] **Hours, phone (604-935-6976), website (https://stonnex.com):** consistent
      with the site exactly.
- [ ] **Photos:** upload 15–20 real project photos (before/after, crew, aerial).
      Then add **new photos weekly** — GBP activity is a ranking signal.
- [ ] **Google Posts:** publish a short update/offer post weekly.
- [ ] **Q&A:** seed 5–8 common questions and answer them yourself.

## 2. Reviews — velocity and response

You already earn great reviews. What moves rankings is a *steady flow* plus
*engagement*:

- [ ] Ask **every** happy customer for a Google review — send the direct review
      link by text the day the job wraps. Aim for a consistent cadence.
- [ ] **Reply to every review** (positive and negative), ideally within 48h.
      Work the city name in naturally where true ("Thanks for having us out in
      Langley…") — this reinforces local relevance.
- [ ] Spread reviews across time — a burst then silence looks unnatural.
- [ ] As new standout reviews come in, swap them onto the site (homepage +
      city pages) to keep the on-page social proof fresh. (I can do this — just
      send screenshots.)

## 3. NAP citations — consistency everywhere

Your **N**ame, **A**ddress, **P**hone must be *identical* across every listing.
Inconsistency confuses Google and dilutes ranking.

- [ ] Core directories: **Bing Places, Apple Maps (Apple Business Connect),
      Yelp, BBB, HomeStars, Yellow Pages (yellowpages.ca), Facebook.**
- [ ] Roofing/trade directories: **TrustedPros, N49, Houzz, local BC trade
      associations, RCABC** (Roofing Contractors Association of BC) if a member.
- [ ] Use the exact same format everywhere: `Stonnex Roofing`, phone
      `604-935-6976`, `https://stonnex.com`.
- [ ] Audit existing listings for old/wrong info and fix duplicates.

## 4. Local backlinks — authority

Links from local, relevant sites lift the whole domain:

- [ ] **Supplier pages** — ask your suppliers (Beacon, IKO/GAF, VELUX, cedar
      suppliers) to list you as an installer/dealer, with a link.
- [ ] **Associations** — BBB profile link, RCABC/BC trade memberships, chamber
      of commerce for cities you serve.
- [ ] **Local sponsorships** — sponsor a Langley/Surrey sports team, community
      event, or charity; these usually come with a link from a local domain.
- [ ] **Local press / community blogs** — offer a "how to spot roof damage after
      a windstorm" tip piece to local outlets.
- [ ] **Supplier/manufacturer certifications** — GAF Master Elite, IKO Shield
      Pro, etc. carry authoritative "find a contractor" backlinks.

## 5. Content cadence (the /blog/ section)

The new blog exists to capture long-tail local searches and build topical
authority. Keep it going — but quality over volume:

- [ ] Publish **1–2 genuinely useful posts per week, max**, each targeting a
      real homeowner question with local specifics.
- [ ] Good next topics: "Cedar shake vs. asphalt in the Fraser Valley climate",
      "How to spot storm damage after a Lower Mainland windstorm", "Do I need a
      permit to replace my roof in [city]?", "Moss on your roof in BC: why it
      matters and what to do".
- [ ] Interlink every post to relevant service + city pages.
- [ ] **Human-review every post before it goes live** (see `blog/README.md`).
      If using an AI content tool, configure it to open pull requests, never to
      auto-publish to `main`.

## 6. Tracking — know if it's working

- [ ] **Google Search Console:** verify the domain, submit
      `https://stonnex.com/sitemap.xml`, and watch which "[city] roofer" queries
      you rank for and where.
- [ ] **GBP Insights:** track calls, direction requests, and searches.
- [ ] Check ranking monthly for your target terms per city.

---

### Where the website already helps (done in this branch)
- Faster load / better Core Web Vitals (hero preload, image cleanup)
- LocalBusiness + Service + FAQ + Review + Breadcrumb schema
- Homepage → city-page and city → service internal linking
- Real reviews with Review markup on homepage and all city pages
- Mobile tap-to-call bar on every page
- Consistent non-www canonical URLs
- A blog foundation for ongoing content

The site is now a strong foundation. Items 1–4 above are what will move you from
"ranking" to "#1" for organic and Map Pack results.
