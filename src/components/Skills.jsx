import { useState } from 'react';
import { Link } from 'react-router-dom';
import { skills } from '../data/profile.js';
import { projects } from '../data/projects.js';
import Reveal from './Reveal.jsx';

export default function Skills({ picked, onPick }) {
  const [group, setGroup] = useState(skills[0].group);
  const current = skills.find((g) => g.group === group) ?? skills[0];
  const used = picked ? projects.filter((p) => p.tags.includes(picked.name)) : [];

  const chooseGroup = (g) => {
    setGroup(g);
    // 다른 분야로 바꾸면 고른 기술도 풀어 줌
    if (picked && !skills.find((x) => x.group === g).items.some((i) => i.name === picked.name)) onPick(null);
  };

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <h2>Skills</h2>
          <p>분야를 고르고 기술을 누르면 어디에 썼는지 보여 주고, 아래 프로젝트에서도 그 기술을 쓴 것만 표시합니다.</p>
        </Reveal>

        <Reveal className="skill-tabs" role="tablist" aria-label="기술 분야">
          {skills.map((g) => (
            <button
              key={g.group}
              type="button"
              role="tab"
              aria-selected={g.group === group}
              className={g.group === group ? 'is-on' : ''}
              onClick={() => chooseGroup(g.group)}
            >
              <b>{g.label}</b><span>{g.group}</span><em>{g.items.length}</em>
            </button>
          ))}
        </Reveal>

        <div key={group} className="skill-row" role="tabpanel" aria-label={current.label}>
          {current.items.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className={`chip ${picked?.name === s.name ? 'is-on' : ''}`}
              style={{ animationDelay: `${i * 40}ms` }}
              aria-pressed={picked?.name === s.name}
              onClick={() => onPick(picked?.name === s.name ? null : s)}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="spotlight" aria-live="polite">
          {picked ? (
            <div key={picked.name} className="spotlight-card">
              <div className="spotlight-name">{picked.name}<small>{current.label}</small></div>
              <ul className="spotlight-points">{picked.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <div className="spotlight-used">
                <span>쓴 프로젝트</span>
                {used.map((p) => (
                  p.detail
                    ? <Link key={p.id} to={`/projects/${p.id}`} style={{ '--accent': p.accent }}>{p.title}</Link>
                    : <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" style={{ '--accent': p.accent }}>{p.title}</a>
                ))}
                <button type="button" className="spotlight-jump" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>아래 프로젝트에서 보기</button>
              </div>
            </div>
          ) : (
            <p className="spotlight-empty">위에서 기술을 하나 골라 보세요.</p>
          )}
        </div>
      </div>
    </section>
  );
}
