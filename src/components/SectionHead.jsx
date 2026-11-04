import Reveal from './Reveal.jsx';

export default function SectionHead({ num, label, title, lead }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow"><span className="num">{num}</span><span aria-hidden="true">·</span>{label}</p>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}
