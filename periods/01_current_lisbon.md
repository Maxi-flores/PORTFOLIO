# August 2025 – Present · Customer Support & Ads Specialist (Lisbon) — WOMmedia / Powerframe

> **Period Metadata**
> - **Period ID:** `period-01-current-lisbon`
> - **Location:** Lisbon, Portugal
> - **Focus:** Commercial lead qualification and Meta cross-platform insights.
> - **Copilot Directive:** Use the Meta Ad Library to uncover advertisers who lack SEM/search network coverage and turn that gap into a prospecting pipeline.
> - **Mapped Core Competencies:** `[B2B-Lead-Gen]`, `[Cross-Platform-Ads]`, `[Automation]`, `[Systems-Dev]`, `[Localization]`

---

## Role Context (Support + Ads Operations)

- Ran a customer-facing support motion with a commercial lens: **diagnose**, **de-risk**, and **convert** ambiguous conversations into decision-ready next steps.
- Operated as the “signal translator” between what customers *say* (objections, constraints, urgency) and what the data *shows* (offer clarity, funnel friction, technical readiness).
- Built repeatable qualification mechanics that prioritize outcomes over opinions: evidence, scoring, and clear actions per prospect.

---

## Operational Mandate (Lisbon)

- Engineered a repeatable workflow that converts **Meta-side demand signals** into **SEM-ready opportunities** without relying on gut-feel.
- Triaged landing pages with a data-first rubric (message match, friction, speed, mobile UX) to determine whether Search/Shopping capture can scale.
- Standardized consultative output: every lead ends with a measurable “next action” (fix, test, or launch) and a recommended channel sequencing (Search / Shopping / Display).

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

**Web Tools**
- Chrome DevTools
- Lighthouse

**Workflows**
- Lead qualification
- Competitor signal analysis
- Landing page auditing
- Support-to-sales handoff discipline

---

## Meta Ad Library → Search Network Prospecting Pipeline (Cross-Platform Arbitrage)

> **Project:** Meta Ad Library → Search Network Prospecting Pipeline · `project-meta-library-prospecting`  
> **Type:** workflow  
> **Mapped Core Competencies:** `[B2B-Lead-Gen]`, `[Cross-Platform-Ads]`, `[Automation]`

### Why this works (Commercial logic)

- Meta is a high-signal environment for **creative velocity** and **offer positioning** (who is actively spending to generate demand).
- Search and product listing placements are high-signal environments for **intent capture** (who is harvesting demand).
- The highest-value prospect wedge is the gap: advertisers investing in Meta (demand gen) while underinvesting in search intent capture (demand capture).

### Step-by-step workflow (How leads are sourced and qualified)

1. **Identify active advertisers on Meta**
   - Use Meta Ad Library to find advertisers with consistent creative volume, fresh variants, and clear CTAs.
   - Extract stable identifiers: advertiser name, landing page domain(s), offer hooks, and geo/language targeting context.
2. **Score Meta-side commercial urgency**
   - Treat creative patterns as operational signals:
     - New variants → active testing loop
     - Multiple formats → distribution maturity
     - Repeated offers → repeatability and unit-economics confidence
3. **Cross-reference SEM/search network coverage (the arbitrage check)**
   - Run a structured check for intent-capture coverage signals:
     - Brand and category queries in search engines (are there sponsored placements?)
     - Ads transparency database checks where applicable (confirming if they publish ads on search/display surfaces)
     - Landing page tracking footprints (e.g., whether tag patterns appear in network requests)
   - Prioritize accounts with **strong Meta activity + weak/absent search coverage** as high-upside targets.
4. **Validate website and tracking readiness**
   - Use Chrome DevTools to inspect network/console behavior, script loads, and obvious measurement gaps.
   - Use Lighthouse to benchmark mobile UX constraints that would cap ROI if Search traffic were scaled.
5. **Create a consultative “next action” package**
   - Output a 1-page summary per lead: evidence, risks, and the recommended Ads surface sequencing (what to launch first and why).

### Signal scoring rubric (Inputs → decision)

- **Creative velocity:** frequent refresh cadence implies budget appetite and optimization discipline.
- **Offer clarity:** a crisp value prop + CTA implies scalable acquisition mechanics.
- **Funnel integrity:** message match, trust cues, and conversion-path simplicity reduce wasted clicks.
- **Capture gap:** weak/absent search coverage implies untapped high-intent demand.
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
> **Mapped Core Competencies:** `[Systems-Dev]`, `[Automation]`, `[Cloud-Data]`, `[B2B-Lead-Gen]`

### What Powerframe operationalizes (From signal → pipeline)

- Ran Powerframe as an operational control center: one surface to store evidence, enforce qualification structure, and keep pipeline decisions consistent.
- Turned prospecting into a data workflow:
  - **Inputs:** Meta signals, search coverage checks, website audit outputs
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
	      "search_network": { "adsPresenceDetected": false },
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
> **Mapped Core Competencies:** `[Systems-Dev]`, `[Automation]`, `[Cross-Platform-Ads]`

- Built a React-based, documentation-first portfolio hub that communicates systems thinking and prospecting methodology with clarity.
- Reinforced Firebase-aligned thinking (identity, governed data surfaces, traceability) so the portfolio reads like an operational asset.

---

## Project Technical Metrics & Architecture Sign-off

**Diagnostics**
- Evidence gates: Meta demand signals → search coverage checks → landing page readiness → next-action output.
- Readiness rubric: message match, friction, mobile UX, and measurement foundations validated before scaling spend.
- Pipeline discipline: stage transitions require captured signals + an explicit next step (fix / test / launch).

**Architecture sign-off**
- Data shape: lead records store structured signals, evidence, and owner accountability (no ad-hoc notes as a system of record).
- Access control: authenticated roles for creating/editing leads and moving stages.
- Automation hooks: connector-friendly fields for scoring, staleness detection, and follow-up scheduling.
