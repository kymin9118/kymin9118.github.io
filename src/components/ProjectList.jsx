import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';
import Reveal from './Reveal.jsx';

function ProjectCard({ p, delay, skill }) {
  const match = skill && p.tags.includes(skill);
  const dim = skill && !match;
  return (
    <Reveal as="article" className={`pcard ${p.detail ? 'is-featured' : ''} ${dim ? 'is-dim' : ''} ${match ? 'is-match' : ''}`} delay={delay} style={{ '--accent': p.accent }}>
      <div className="pcard-head">
        <div>
          <p className="pcard-year">{p.year}{p.team ? ` · ${p.team}` : ''}</p>
          <h3>{p.title}</h3>
          <p className="pcard-sub">{p.summary}</p>
        </div>
        {p.detail
          ? <Link className="pcard-cta" to={`/projects/${p.id}`}>자세히 보기</Link>
          : <a className="pcard-cta" href={p.link} target="_blank" rel="noopener noreferrer">GitHub</a>}
      </div>
      <div className="pcard-tags">
        {(match ? [skill, ...p.tags.filter((t) => t !== skill)] : p.tags).slice(0, 8).map((t) => <span key={t} className={t === skill ? 'is-hit' : ''}>{t}</span>)}
      </div>
      <details className="pcard-more">
        <summary>주요 담당 내용</summary>
        <ul>{p.cardPoints.map((pt) => <li key={pt}>{pt}</li>)}</ul>
      </details>
    </Reveal>
  );
}

export default function ProjectList({ skill, onClear }) {
  const featured = projects.filter((p) => p.detail);
  const earlier = projects.filter((p) => !p.detail);
  return (
    <section id="projects" className="section section-alt">
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <h2>Projects</h2>
          <p>대표 프로젝트는 상세 페이지에서, 이전 프로젝트는 GitHub에서 볼 수 있습니다.</p>
        </Reveal>
        {skill && (
          <div className="filter-bar" role="status">
            <span><b>{skill}</b> 사용 프로젝트 {projects.filter((p) => p.tags.includes(skill)).length}개만 진하게 표시하고 있습니다.</span>
            <button type="button" onClick={onClear}>전체 보기</button>
          </div>
        )}
        <div className="pgrid featured">{featured.map((p, i) => <ProjectCard key={p.id} p={p} skill={skill} delay={i * 0.08} />)}</div>
        <h3 className="sub-head">이전 프로젝트</h3>
        <div className="pgrid">{earlier.map((p, i) => <ProjectCard key={p.id} p={p} skill={skill} delay={i * 0.08} />)}</div>
      </div>
    </section>
  );
}
