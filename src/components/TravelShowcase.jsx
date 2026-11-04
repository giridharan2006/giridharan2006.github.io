import './travel.css';
import { useEffect, useState } from 'react';
import request from '../assets/travel-planner-request.webp';
import memory from '../assets/travel-planner-memory.webp';
import booking from '../assets/travel-planner-booking.webp';
import skymock from '../assets/travel-planner-skymock.webp';
import results from '../assets/travel-planner-results.webp';
import reportArch from '../assets/travel-planner-architecture-report.webp';

/* ---------------- Gallery: genuine outputs, all taken from the project report ---------------- */
const shots = [
  { id: 'request', label: 'Request', src: request, w: 1556, h: 1013, tone: 'term',
    alt: 'Terminal: the agent parses "Singapore on 12 December for 4 nights under ₹150,000", asks two preference questions, then shows the selected flight and hotel, which constraints were checked, the runner-up and the lowest-price alternative, and the risk tier.',
    cap: 'A request handled end to end: two questions asked, plan selected, constraints checked, alternatives and risk explained (report Fig. 13).' },
  { id: 'memory', label: 'Memory', src: memory, w: 1552, h: 972, tone: 'term',
    alt: 'Terminal: on a later trip to Goa the agent reuses preferences remembered from an earlier trip, asks zero preference questions and completes a mock booking.',
    cap: 'Persistent memory: preferences remembered from an earlier trip are reused, so this trip needs no preference questions (report Fig. 15).' },
  { id: 'booking', label: 'Booking', src: booking, w: 1555, h: 546, tone: 'term',
    alt: 'Terminal: the agent offers the recommended plan, runner-up and lowest-price option, shows an exact review of the mock bookings, waits for a typed YES and checks both ledgers.',
    cap: 'Exact booking review, explicit YES, and confirmation codes checked on both mock ledgers (report Fig. 14).' },
  { id: 'site', label: 'Mock site', src: skymock, w: 1400, h: 605, tone: 'paper',
    alt: 'SkyMock Flights, a local mock website labelled "demo data only", listing 13 flight offers from BOM to Goa with airline, times, stops, cabin, price and seats.',
    cap: 'SkyMock Flights, one of the two local Flask mock sites the agent searches and books against (report Fig. 7).' },
  { id: 'eval', label: 'Evaluation', src: results, w: 1800, h: 630, tone: 'paper',
    alt: 'Two charts: questions per trip fall below one after the first trip for plan-aware strategies with memory; on the first trip plan-aware asks 6 questions versus 9 for ask-all, both at 100% oracle match.',
    cap: 'Questions per trip, and first-trip burden versus decision quality, on simulated users.' },
  { id: 'arch', label: 'Report diagram', src: reportArch, w: 1200, h: 1197, tone: 'paper',
    alt: 'Architecture diagram from the report: neural/language layer, agent orchestrator, symbolic layer modules, learned component and the two mock websites with their JSON ledgers.',
    cap: 'System architecture as implemented, the original figure from the report (Fig. 1).' },
];

export function TravelGallery() {
  const [i, setI] = useState(0);
  const s = shots[i];
  return (
    <div className="tp-gallery">
      <figure className={`frame tp-main ${s.tone}`}>
        <a className="tp-main-img" href={s.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${s.label}`}>
          <img key={s.id} src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" />
          <span className="tp-zoom mono" aria-hidden="true">open full size ↗</span>
        </a>
        <figcaption><span className="pill blue">genuine output</span>{s.cap}</figcaption>
      </figure>
      <div className="tp-thumbs" role="tablist" aria-label="Travel planner screenshots">
        {shots.map((x, n) => (
          <button key={x.id} type="button" role="tab" aria-selected={n === i} className={`tp-thumb ${n === i ? 'on' : ''}`} onClick={() => setI(n)}>
            <span className={`tp-thumb-img ${x.tone}`}><img src={x.src} alt="" loading="lazy" /></span>
            <span className="mono">{x.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Architecture: redrawn from the report's Fig. 1 ---------------- */
const symbolic = [
  ['knowledge.py', 'SQLite memory: users, preference facts, trips, feedback'],
  ['ontology · geo', 'cities, airports, time zones, preference domains'],
  ['planner.py', 'flight × hotel candidates, check-in = local arrival'],
  ['constraints.py', 'hard rules → feasible set F'],
  ['elicitation · ranking', 'plan-aware questions, lexicographic rank'],
  ['risk · explain', 'SAFE / MEDIUM / HIGH, reasons'],
  ['validator.py', 'V1–V7 pre-booking checks'],
  ['recovery.py', 'diagnosis and safe alternatives when F is empty'],
];

export function TravelArchitecture() {
  return (
    <figure className="tp-arch" aria-label="System architecture of the travel planner">
      <figcaption className="tp-block-head"><span className="mono">architecture</span><span className="muted">redrawn from the report's Fig. 1 · module names from the code</span></figcaption>

      <div className="arch-row"><div className="arch-node user"><b>User</b><span>natural-language request · CLI chat</span></div></div>
      <div className="arch-link" aria-hidden="true"><span>text</span></div>

      <div className="arch-layer lang">
        <p className="arch-tag mono">language layer · travel_agent/neural</p>
        <div className="arch-node"><b>RuleBasedParser</b><span>default, offline · optional LLM parser</span></div>
        <p className="arch-note">reads text only: never filters, ranks, prices or books</p>
      </div>
      <div className="arch-link" aria-hidden="true"><span>TripRequest · schema-checked</span></div>

      <div className="arch-row"><div className="arch-node orch"><b>Agent orchestrator</b><span>validation · retrieval · search · elicitation · ranking · explanation · booking</span></div></div>
      <div className="arch-link" aria-hidden="true" />

      <div className="arch-split">
        <div className="arch-layer sym">
          <p className="arch-tag mono">symbolic layer · owns everything that must be correct</p>
          <div className="arch-grid">
            {symbolic.map(([t, d]) => <div key={t} className="arch-node"><b className="mono">{t}</b><span>{d}</span></div>)}
          </div>
        </div>
        <div className="arch-layer ml">
          <p className="arch-tag mono">learned component · ranker = ml</p>
          <div className="arch-node"><b>pairwise LR</b><span>P(A ≻ B) from plan features</span></div>
          <div className="arch-node"><b>voi.py</b><span>ask while EVOI &gt; λ</span></div>
          <p className="arch-note">ranks feasible plans only; cannot add or remove a plan</p>
        </div>
      </div>
      <div className="arch-link" aria-hidden="true"><span>re-fetch · book</span></div>

      <div className="arch-layer mock">
        <p className="arch-tag mono">sites/client.py · loopback only · "mock": true check · idempotency keys</p>
        <div className="arch-pair">
          <div className="arch-node"><b>SkyMock Flights :5001</b><span>Flask · search · book · ledger</span></div>
          <div className="arch-node"><b>StayMock Hotels :5002</b><span>Flask · search · book · ledger</span></div>
        </div>
      </div>
    </figure>
  );
}

/* ---------------- Workflow of one request ---------------- */
const steps = [
  ['User request', 'natural language, e.g. "Singapore on 12 Dec for 4 nights under ₹150,000"'],
  ['Preference extraction', 'parser → TripRequest; asks for missing facts'],
  ['Knowledge retrieval', 'stored preference facts for this trip’s scope'],
  ['Constraint evaluation', 'search both sites, pair flight × hotel, hard rules → F'],
  ['Candidate ranking', 'ask only questions that change the plan, then rank'],
  ['Explainable travel plan', 'reasons, risk tier, alternatives · book only on typed YES'],
];

export function TravelWorkflow() {
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(-1); return; }
    const id = setInterval(() => setOn((n) => (n + 1) % steps.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <figure className="tp-flow" aria-label="Workflow of one request">
      <figcaption className="tp-block-head"><span className="mono">workflow · one request</span><span className="muted">follows Agent.handle()</span></figcaption>
      <ol className="flow-steps">
        {steps.map(([t, d], n) => (
          <li key={t} className={n === on ? 'on' : ''}>
            <span className="flow-n mono">{String(n + 1).padStart(2, '0')}</span>
            <b>{t}</b>
            <span className="flow-d">{d}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
