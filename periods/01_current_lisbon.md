# August 2025 – Present · Customer Support & Ads Specialist (Lisbon) — WOMmedia / Powerframe

> **Period Metadata**
> - **Period ID:** `period-01-current-lisbon`
> - **Location:** Lisbon, Portugal
> - **Focus:** Commercial lead qualification and Meta cross-platform insights.
> - **Copilot Directive:** Use the Meta Ad Library to uncover advertisers who lack a Google Ads presence and turn that gap into a prospecting pipeline.
> - **Mapped Google Competency:** `COMP-1`, `COMP-4`, `COMP-5`
> - **Answers Interview Question:** `1`, `2`, `3`

---

## Role Context (Support + Ads Operations)

- Ran a customer-facing support motion with a commercial lens: **diagnose**, **de-risk**, and **convert** ambiguous conversations into decision-ready next steps.
- Operated as the “signal translator” between what customers *say* (objections, constraints, urgency) and what the data *shows* (offer clarity, funnel friction, technical readiness).
- Built repeatable qualification mechanics that prioritize outcomes over opinions: evidence, scoring, and clear actions per prospect.

---

## Operational Mandate (Lisbon)

- Engineered a repeatable workflow that converts **Meta-side demand signals** into **Google Ads-ready opportunities** without relying on gut-feel.
- Triaged landing pages with a data-first rubric (message match, friction, speed, mobile UX) to determine whether Search/Shopping capture can scale.
- Standardized consultative output: every lead ends with a measurable “next action” (fix, test, or launch) and a recommended Google surface (Search / Shopping / Display).

---

## Core Stack (What I Operate With)

**Ads Platforms**
- Meta Ads Manager
- Meta Ad Library

**Web Stack**
- React
- React Router
- Vite
- Tailwind CSS

**Cloud Services**
- Firebase

**Google Web Tools**
- Chrome DevTools
- Google Lighthouse

**Workflows**
- Lead qualification
- Competitor signal analysis
- Landing page auditing
- Support-to-sales handoff discipline

---

## Meta Ad Library → Google Ads Prospecting Pipeline (Cross-Platform Arbitrage)

> **Project:** Meta Ad Library → Google Ads Prospecting Pipeline · `project-meta-library-prospecting`  
> **Type:** workflow  
> **Mapped Google Competency:** `COMP-1`, `COMP-2`, `COMP-4`  
> **Answers Interview Question:** `1`, `3`, `7`

### Why this works (Commercial logic)

- Meta is a high-signal environment for **creative velocity** and **offer positioning** (who is actively spending to generate demand).
- Google Search/Shopping are high-signal environments for **intent capture** (who is harvesting demand).
- The highest-value prospect wedge is the gap: advertisers investing in Meta (demand gen) while underinvesting in Google (demand capture).

### Step-by-step workflow (How leads are sourced and qualified)

1. **Identify active advertisers on Meta**
   - Use Meta Ad Library to find advertisers with consistent creative volume, fresh variants, and clear CTAs.
   - Extract stable identifiers: advertiser name, landing page domain(s), offer hooks, and geo/language targeting context.
2. **Score Meta-side commercial urgency**
   - Treat creative patterns as operational signals:
     - New variants → active testing loop
     - Multiple formats → distribution maturity
     - Repeated offers → repeatability and unit-economics confidence
3. **Cross-reference Google Ads presence (the arbitrage check)**
   - Run a structured check for “Google capture” signals:
     - Brand and category queries in Google Search (are there sponsored placements?)
     - Ads Transparency Center checks where applicable (confirming if they publish ads on Google surfaces)
     - Landing page tracking footprints (e.g., whether Google tag patterns appear in network requests)
   - Prioritize accounts with **strong Meta activity + weak/absent Google presence** as high-upside targets.
4. **Validate website and tracking readiness**
   - Use Chrome DevTools to inspect network/console behavior, script loads, and obvious measurement gaps.
   - Use Lighthouse to benchmark mobile UX constraints that would cap ROI if Search traffic were scaled.
5. **Create a consultative “next action” package**
   - Output a 1-page summary per lead: evidence, risks, and the recommended Ads surface sequencing (what to launch first and why).

### Signal scoring rubric (Inputs → decision)

- **Creative velocity:** frequent refresh cadence implies budget appetite and optimization discipline.
- **Offer clarity:** a crisp value prop + CTA implies scalable acquisition mechanics.
- **Funnel integrity:** message match, trust cues, and conversion-path simplicity reduce wasted clicks.
- **Capture gap:** weak/absent Google presence implies untapped high-intent demand.
- **Performance baseline:** speed and mobile UX determine whether traffic scaling will compound or collapse.

---

## Website Readiness Audits (Chrome DevTools + Lighthouse)

- Audited “conversion friction” like an engineer: isolate bottlenecks, quantify impact proxies (speed/UX), then prescribe fixes in order-of-operations.
- Validated whether a site can *sustain* paid traffic:
  - Above-the-fold clarity and intent alignment
  - Form/checkout complexity and trust barriers
  - Mobile layout stability and performance budget issues
- Translated technical findings into commercial language: “what breaks ROI”, “what unlocks scale”, and “what to ship first”.

---

## Powerframe (Dashboard & CRM Engine) — Firebase-Backed Lead Operations

> **Project:** Powerframe (Dashboard & CRM Engine) · `project-powerframe-dashboard`  
> **Type:** product  
> **Mapped Google Competency:** `COMP-1`, `COMP-3`, `COMP-4`  
> **Answers Interview Question:** `1`, `3`, `6`

### What Powerframe operationalizes (From signal → pipeline)

- Ran Powerframe as an operational control center: one surface to store evidence, enforce qualification structure, and keep pipeline decisions consistent.
- Turned prospecting into a data workflow:
  - **Inputs:** Meta signals, Google presence checks, website audit outputs
  - **Process:** scoring + stage transitions + next actions
  - **Outputs:** prioritized pipeline with measurable follow-ups

### Firebase Auth integration (Governed access, faster execution)

- Used **Firebase Authentication** to enforce identity and access control so pipeline data remains accurate and auditable across internal workflows.
- Structured roles around operational needs (e.g., who can create/edit leads, who can move stages, who can export evidence).

### Firestore integration (Lead status + deal pipelines as real-time data)

- Used **Firestore** as the canonical CRM state store: leads, deals, stage history, and qualification artifacts.
- Modeled pipeline state as first-class data (not spreadsheet notes), enabling:
  - real-time status views (pipeline / kanban)
  - stage conversion visibility (where leads stall)
  - “staleness” detection (who needs a next action)

Example Firestore shape (conceptual):

```json
{
  "leads/{leadId}": {
    "source": "meta_ad_library",
    "company": { "name": "…", "domain": "…" },
    "signals": {
      "meta": { "creativeVelocity": "high", "offerClarity": "clear" },
      "google": { "adsPresenceDetected": false },
      "site": { "mobileUXRisk": "medium", "trackingGaps": ["…"] }
    },
    "pipeline": { "stage": "qualified", "nextAction": "…" },
    "ownerUid": "…",
    "timestamps": { "createdAt": "…", "updatedAt": "…" }
  }
}
```

### Pipeline discipline (Commercial rigor)

- Standardized stage movement with evidence gates (a lead moves only when signals are captured and a next action is defined).
- Captured structured activities (touchpoints, objections, next steps) so the pipeline remains measurable and coaching-ready.
- Used the CRM as a feedback loop: patterns from wins/losses refine the scoring rubric and improve future lead quality.

---

## Support-to-Commercial Loop (Customer Support that feeds prospecting quality)

- Captured recurring objections and constraints as “voice of customer” inputs for better qualification and pitch framing.
- Reduced ambiguity in conversations by converting support inputs into a structured discovery checklist (problem → impact → urgency → constraints).
- Elevated the consultative motion: prioritize the right product surface (Search / Shopping / Display) based on the customer’s reality, not a generic script.

---

## PowerStarter (Portfolio Hub) — Customer-Facing Surface for Systems Thinking

> **Project:** PowerStarter (Portfolio Hub) · `project-powerstarter-portfolio`  
> **Type:** product  
> **Mapped Google Competency:** `COMP-3`, `COMP-4`, `COMP-1`  
> **Answers Interview Question:** `1`, `3`, `6`

- Built a React-based, documentation-first portfolio hub that communicates systems thinking and prospecting methodology with clarity.
- Reinforced Firebase-aligned thinking (identity, governed data surfaces, traceability) so the portfolio reads like an operational asset.

---

## Google Interview Questions (1–3) — Explicit Answers

### Q1 · Lead sourcing — Where to find leads and how to qualify them

- Source leads in Meta Ad Library by identifying advertisers with active spend signals: ongoing creatives, iterative variants, and clear offer/CTA language.
- Qualify with a structured three-part gate:
  - **Meta demand signals:** creative velocity + offer consistency → indicates commercial urgency.
  - **Google capture gap:** cross-check whether they run Google Ads; if absent, treat it as uncaptured high-intent demand.
  - **Website readiness:** validate that the landing page can convert traffic (DevTools + Lighthouse + friction audit).

### Q2 · Advertiser types — Which business types are high-value advertisers

- Prioritize businesses with repeatable offers and measurable conversion paths (can sustain acquisition scaling).
- Favor verticals that benefit from intent capture and clear differentiation:
  - Startups and SaaS-style offers (clear ICP + fast iteration)
  - App/game developers (high LTV, strong experimentation culture)
  - Freelancers and consultancies (lead-gen funnels with clear CTAs)
  - E-commerce and catalog-like offers (Shopping-style mechanics, offer clarity)

### Q3 · Google interest factors — Signals that indicate readiness for Google Ads

- Treat “Google-ready” as an evidence-backed composite:
  - **Demand capture fit:** the offer maps to high-intent queries; brand/category searches show opportunity.
  - **Funnel integrity:** message match, trust cues, and a low-friction conversion path exist.
  - **Technical readiness:** acceptable mobile UX/performance; basic measurement foundations are detectable via Chrome tooling.
- When readiness is incomplete, pitch the *sequence*: fix tracking/performance first, then activate Search/Shopping to capture demand efficiently.

---

> **Google Interview Alignment Wrap-up**
> - **Mapped Competencies:** [COMP-1] Lead Identification & Prospecting · [COMP-4] Consultative & Commercial Mindset · [COMP-5] Cultural & Linguistic Agility
> - **Interview Questions Covered:** Q1 (Lead sourcing) · Q2 (Advertiser types) · Q3 (Google interest factors)
> - **Evidence Anchors:** `period-01-current-lisbon` · `project-meta-library-prospecting` · `project-powerframe-dashboard` · `project-powerstarter-portfolio`
