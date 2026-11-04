import { useState } from 'react';
import cinetraceShot from '../assets/cinetrace-for-you.webp';
import travelResults from '../assets/travel-planner-results.webp';
import travelBooking from '../assets/travel-planner-booking.webp';

/* ---------------- CineTrace: provenance tree + verifier results ---------------- */
const verify = [
  { k: 'VALID', v: 2385, tone: 'ok', note: 'true when shown, still true' },
  { k: 'SUPERSEDED', v: 1909, tone: 'warn', note: 'true when shown, data changed since' },
  { k: 'INVALID', v: 0, tone: 'bad', note: 'not true at run time' },
];

export function CineTraceVisual() {
  const total = verify.reduce((a, b) => a + b.v, 0);
  return (
    <div className="viz">
      <figure className="frame">
        <div className="frame-bar" aria-hidden="true"><span /><span /><span /><em className="mono">cinetrace · For you</em></div>
        <img src={cinetraceShot} width="1048" height="700" loading="lazy" alt="CineTrace 'For you' page: each recommendation lists its reasons with a VALID badge and an Evidence link, a score breakdown, and genre drift labels such as 'Horror turned negative' and 'Animation rising'." />
      </figure>
      <div className="viz-row">
        <pre className="tree mono" aria-label="Provenance model">
{`explanation_claims
 └─ claim_evidence    `}<span className="tok-c">-- one FK kind, CHECK</span>{`
     ├─ rating_versions   `}<span className="tok-s">temporal</span>{`
     ├─ run_genre_profile `}<span className="tok-k">immutable</span>{`
     └─ item_neighbors    `}<span className="tok-k">immutable</span>
        </pre>
        <div className="verify">
          <p className="viz-label mono">verify_claims() · {total.toLocaleString('en-IN')} claims</p>
          {verify.map((r) => (
            <div key={r.k} className="vrow">
              <span className={`pill ${r.tone}`}>{r.k}</span>
              <div className="vbar" aria-hidden="true"><i className={r.tone} style={{ width: `${(r.v / total) * 100}%` }} /></div>
              <span className="mono vnum">{r.v.toLocaleString('en-IN')}</span>
            </div>
          ))}
          <p className="viz-note">Evaluation lists dated 2012–2018, so SUPERSEDED is expected: the data moved on.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mini compiler: phases + cost-gate decision log ---------------- */
const phases = ['Lexer', 'Parser', 'Semantics', 'TAC', 'Optimizer', 'Codegen', 'VM'];
const log = [
  ['REJECT', '$p = $a * 10', '($a<<3)+($a<<1)', '28 → 28', '0'],
  ['REJECT', '$q = $b * 6', '($b<<2)+($b<<1)', '28 → 28', '0'],
  ['REJECT', '$r = $c * 11', '$c+($c<<1)+($c<<3)', '28 → 29', '+1'],
  ['ACCEPT', '$s = $d * 7', '($d<<3)-$d', '28 → 27', '−1'],
];
const cycles = [['Unoptimized', 321, 'grey'], ['Normal passes', 297, 'amber'], ['Cost-gated (ours)', 197, 'blue']];

export function CompilerVisual() {
  return (
    <div className="viz">
      <ol className="mini-phases" aria-label="Compiler phases">
        {phases.map((p, i) => (
          <li key={p} className={p === 'Optimizer' ? 'on' : ''}><span className="mono">0{i + 1}</span>{p}</li>
        ))}
      </ol>
      <div className="dlog mono" role="table" aria-label="Decision log for example 9 on the default target">
        <div className="dlog-head" role="row"><span role="columnheader">decision log · 09_gate_reject.mc</span><span role="columnheader">cycles</span><span role="columnheader">Δ</span></div>
        {log.map(([d, src, out, c, delta]) => (
          <div key={src} className="dlog-row" role="row">
            <span role="cell" className="dlog-rule"><span className={`pill ${d === 'ACCEPT' ? 'ok' : 'bad'}`}>{d}</span><span className="dlog-code">{src} <span className="tok-c">⇒</span> <span className="tok-k">{out}</span></span></span>
            <span role="cell" className="muted">{c}</span>
            <span role="cell" className={d === 'ACCEPT' ? 'tok-s' : delta === '+1' ? 'tok-f' : 'muted'}>{delta}</span>
          </div>
        ))}
      </div>
      <div className="cycles" aria-label="Measured VM cycles over nine example programs">
        <p className="viz-label mono">measured VM cycles · 9 programs · lower is better</p>
        {cycles.map(([k, v, c]) => (
          <div key={k} className="crow">
            <span className="clabel">{k}</span>
            <div className="cbar" aria-hidden="true"><i className={c} style={{ width: `${(v / 321) * 100}%` }} /></div>
            <span className="mono vnum">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Travel planner: real outputs from the report ---------------- */
const travelTabs = [
  { id: 'eval', label: 'evaluation', src: travelResults, w: 1800, h: 630, alt: 'Two charts. Left: preference questions per trip fall to under one after the first trip for plan-aware strategies with memory, while the no-memory variant stays near six. Right: on the first trip, ask-all asks 9 questions and plan-aware asks 6, both reaching 100% oracle match; ask-none reaches 11%.', cap: 'Questions per trip and first-trip burden vs decision quality (simulated users).' },
  { id: 'run', label: 'agent run', src: travelBooking, w: 1555, h: 546, alt: 'Terminal session: the agent offers the recommended plan, a runner-up and the lowest-price option, shows an exact review of the mock flight and hotel bookings, waits for a typed YES, then confirms both bookings on the mock ledgers.', cap: 'Exact booking review, explicit YES, and confirmation codes checked on both mock ledgers.' },
];

export function TravelVisual() {
  const [tab, setTab] = useState('eval');
  const t = travelTabs.find((x) => x.id === tab);
  return (
    <div className="viz">
      <div className="tabs" role="tablist" aria-label="Travel planner outputs">
        {travelTabs.map((x) => (
          <button key={x.id} type="button" role="tab" id={`tt-${x.id}`} aria-selected={tab === x.id} aria-controls="travel-panel" className={`chip ${tab === x.id ? 'on' : ''}`} onClick={() => setTab(x.id)}>{x.label}</button>
        ))}
      </div>
      <figure id="travel-panel" role="tabpanel" aria-labelledby={`tt-${tab}`} className={`frame ${tab === 'eval' ? 'paper' : 'term'}`}>
        <img key={t.id} src={t.src} width={t.w} height={t.h} loading="lazy" alt={t.alt} />
        <figcaption>{t.cap}</figcaption>
      </figure>
    </div>
  );
}

/* ---------------- GreenPlace: abstract network ---------------- */
const nodes = [
  [40, 120], [95, 60], [150, 130], [205, 70], [255, 150], [300, 95], [350, 40], [395, 125], [445, 70], [490, 140], [120, 190], [230, 205], [340, 200], [430, 200],
];
const edges = [[0,1],[1,3],[0,2],[2,3],[1,2],[3,5],[2,4],[4,5],[5,6],[6,8],[5,7],[7,8],[8,9],[7,9],[0,10],[10,11],[2,10],[4,11],[11,12],[4,12],[12,13],[7,13],[9,13]];
const ctrls = { 2: 'a', 7: 'b', 11: 'c' };
// switches 4 and 12 belonged to controller 11, which is asleep; they migrate to active controllers
const assign = { 0: 2, 1: 2, 3: 2, 10: 2, 4: 2, 12: 7, 5: 7, 6: 7, 8: 7, 9: 7, 13: 7 };
const migrating = new Set([4, 12]);

export function NetworkVisual() {
  return (
    <div className="viz">
      <figure className="frame net">
        <svg viewBox="0 0 530 240" role="img" aria-label="Illustration of controller placement: switches are assigned to three controllers; one controller is asleep and its switches migrate to an active controller.">
          {edges.map(([a, b]) => <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="n-edge" />)}
          {Object.entries(assign).map(([s, c]) => (
            <line key={`as-${s}`} x1={nodes[s][0]} y1={nodes[s][1]} x2={nodes[c][0]} y2={nodes[c][1]} className={`n-assign ${migrating.has(Number(s)) ? 'migrating' : ''}`} />
          ))}
          {nodes.map(([x, y], i) => ctrls[i]
            ? <g key={i} className={`n-ctrl ${i === 11 ? 'asleep' : ''}`}><rect x={x - 11} y={y - 11} width="22" height="22" rx="5" /><text x={x} y={y + 4}>C</text></g>
            : <circle key={i} cx={x} cy={y} r="5.5" className="n-sw" />)}
        </svg>
        <figcaption>
          <span><i className="lg ctrl" />active controller</span>
          <span><i className="lg sleep" />asleep · switches migrate</span>
          <span><i className="lg sw" />switch</span>
          <em>illustrative</em>
        </figcaption>
      </figure>
    </div>
  );
}
