import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { detailProjects, findProject } from '../data/projects.js';
import { useActiveSection, useCountUp, useInView, useScrollProgressRef } from '../hooks/index.js';
import Reveal from '../components/Reveal.jsx';
import Footer from '../components/Footer.jsx';
import Home from './Home.jsx';

// 발표 자료 흐름: 개요 → 설계 → 담당 → 기능 → 기여 → 문제 해결 → 성과·회고
const SECTIONS = [
  ['p-overview', '개요'], ['p-problem', '문제와 해결'], ['p-design', '설계'], ['p-map', '담당 파트'], ['p-features', '주요 기능'],
  ['p-contrib', '기술적 기여'], ['p-trouble', '트러블슈팅'], ['p-result', '성과·회고'],
];

function Stat({ s, start }) {
  const v = useCountUp(s.value, { decimals: s.decimals || 0, start });
  return (
    <div className="stat">
      <div className="stat-num">{s.prefix}{v}{s.suffix}</div>
      <b>{s.label}</b>
      <span>{s.note}</span>
    </div>
  );
}

function Stats({ stats }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return <div ref={ref} className="stats">{stats.map((s) => <Stat key={s.label} s={s} start={inView} />)}</div>;
}

function Lightbox({ items, index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, onMove]);
  const [src, title] = items[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="화면 크게 보기" onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={title} />
        <figcaption>{index + 1} / {items.length} · {title}</figcaption>
        <div className="lightbox-ctl">
          <button type="button" onClick={() => onMove(-1)}>이전</button>
          <button type="button" onClick={onClose}>닫기</button>
          <button type="button" onClick={() => onMove(1)}>다음</button>
        </div>
      </figure>
    </div>
  );
}

function FeatHead({ head, center }) {
  const [label, l1, l2, desc] = head;
  return (
    <Reveal as="header" className={`feat-head ${center ? 'is-center' : ''}`}>
      <div>
        <p className="feat-label">{label}</p>
        <h3>{l1}<br /><span>{l2}</span></h3>
      </div>
      <p className="feat-desc">{desc}</p>
    </Reveal>
  );
}

function SecTitle({ no, children, sub }) {
  return (
    <Reveal as="header" className="p-sec-head">
      <span className="p-sec-no">{no}</span>
      <h2 className="two-tone">{children}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const p = findProject(id);
  const progressRef = useScrollProgressRef();
  const active = useActiveSection(SECTIONS.map((s) => s[0]));
  const [lb, setLb] = useState(null);

  if (!p?.detail) return <Home />;
  const d = p.detail;
  const i = detailProjects.indexOf(p);
  const prev = detailProjects[(i - 1 + detailProjects.length) % detailProjects.length];
  const next = detailProjects[(i + 1) % detailProjects.length];
  const sc = d.showcase;
  const shots = [...sc.flow.filter(([src]) => src), [sc.hero, sc.heroTitle], ...sc.pair].map(([src, title]) => [src, title]);
  const openShot = (src) => setLb(shots.findIndex(([x]) => x === src));
  const move = (k) => setLb((cur) => (cur + k + shots.length) % shots.length);

  return (
    <main className="project" style={{ '--accent': p.accent, '--g0': p.gradient[0], '--g1': p.gradient[1], '--g2': p.gradient[2], '--glow1': p.glow[0], '--glow2': p.glow[1] }}>
      <div ref={progressRef} className="read-progress" aria-hidden="true" />

      <header className="cover">
        <div className="cover-shade" aria-hidden="true" />
        <div className="cover-peek frame" aria-hidden="true"><i /><img src={p.cover} alt="" /></div>
        <div className="cover-in">
          <div className="cover-top">
            <div>
              <b>{p.title}</b>
              <span>{p.summary}</span>
            </div>
            <span className="cover-no">Project {String(i + 1).padStart(2, '0')}</span>
          </div>
          <h1 className="cover-title">
            <span className="cover-line">{p.slogan[0]}</span>
            <span className="cover-line">{p.slogan[1]}</span>
          </h1>
          <dl className="cover-meta">
            <div className="cover-sum"><dt>Summary</dt><dd>{d.lead}</dd></div>
            <div><dt>Date</dt><dd>{p.period}</dd></div>
            <div><dt>Role</dt><dd>{p.role.join(', ')}</dd></div>
            <div><dt>Tools</dt><dd className="cover-tools">{p.tools.map((t) => <span key={t}>{t}</span>)}</dd></div>
          </dl>
        </div>
        <Link to="/" state={{ scrollTo: 'projects' }} className="cover-back">프로젝트 목록</Link>
        <span className="cover-scroll" aria-hidden="true">Scroll</span>
      </header>

      <nav className="subnav" aria-label="이 페이지 안 이동">
        <div className="wrap">
          {SECTIONS.map(([sid, label], k) => (
            <a key={sid} href={`#${sid}`} className={active === sid ? 'is-on' : ''}
              onClick={(e) => { e.preventDefault(); document.getElementById(sid)?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>{String(k + 1).padStart(2, '0')}</span>{label}
            </a>
          ))}
        </div>
      </nav>

      {/* 01 개요 */}
      <section id="p-overview" className="p-sec overview">
        <div className="wrap ov-split">
          <div className="ov-text">
            <Reveal as="p" className="ov-label">Overview</Reveal>
            <Reveal as="h2" className="ov-statement" delay={0.05}>{d.overview.statement}</Reveal>
            <Reveal className="ov-story" delay={0.1}>
              {d.overview.background.map((t) => <p key={t}>{t}</p>)}
              <p>{p.title}는 이 과정을 <b>{d.overview.solution.join(', ')}</b>으로 풀었습니다.</p>
            </Reveal>
            <Reveal as="dl" className="scope" delay={0.15}>
              {d.overview.scope.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </Reveal>
          </div>
          <Reveal className="ov-shot" delay={0.1}>
            <img src={p.overviewShot} alt={`${p.title} 화면`} loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* 02 문제와 해결 */}
      <section id="p-problem" className="ps">
        <div className="wrap">
          <div className="ps-head">
            <Reveal as="p" className="ov-label">Problem &amp; Solution</Reveal>
            <Reveal as="h2" delay={0.05}>{d.overview.goals[0]}</Reveal>
          </div>
          <div className="ps-body">
            <div className="ps-problems">
              {d.overview.problems.map(([t, sub], k) => (
                <Reveal key={t} className="blob" delay={k * 0.1} style={{ '--k': k }}>
                  <b>{t}</b><span>{sub}</span>
                </Reveal>
              ))}
              <p className="ps-cap">Problems</p>
            </div>
            <Reveal className="ps-arrow" delay={0.3} aria-hidden="true"><svg viewBox="0 0 90 20"><path d="M0 10h84M76 3l8 7-8 7" fill="none" stroke="currentColor" strokeWidth="2" /></svg></Reveal>
            <div className="ps-solution">
              <Reveal className="cloud" delay={0.4}>
                <b>{p.title}</b>
                <ul>{d.overview.solution.map((t) => <li key={t}>{t}</li>)}</ul>
              </Reveal>
              <p className="ps-cap">Solution</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 설계 */}
      <section id="p-design" className="p-sec p-sec-alt">
        <div className="wrap">
          <SecTitle no="03">어떻게<br /><span>설계했나</span></SecTitle>
          <Reveal className="arch">
            {d.architecture.nodes.map(([t, s2, hl], k) => (
              <div key={t} className={`arch-node ${hl ? 'is-hl' : ''}`} style={{ '--k': k }}>
                <b>{t}</b><span>{s2}</span>
              </div>
            ))}
          </Reveal>
          <div className="design-grid">
            <Reveal className="stack-table">
              <h3>기술 스택</h3>
              <dl>{d.architecture.layers.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </Reveal>
            <Reveal className="decisions" delay={0.08}>
              <h3>설계에서 정한 것</h3>
              {d.architecture.decisions.map(([t, body]) => (
                <div key={t} className="decision"><b>{t}</b><p>{body}</p></div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 담당 파트 */}
      <section id="p-map" className="p-sec">
        <div className="wrap">
          <SecTitle no="04">서비스 구성과<br /><span>담당 개발 파트</span></SecTitle>
          <div className="legend">
            <span className="l2"><i />직접 맡음</span><span className="l1"><i />서버 쪽 연결을 맡음</span><span className="l0"><i />다른 팀원 담당</span>
          </div>
          <div className="svc-map">
            {d.map.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 0.08}>
                <h3>{g.group}</h3>
                <ul>{g.items.map(([name, lv], k) => <li key={name} className={`m${lv}`} style={{ transitionDelay: `${gi * 0.08 + k * 0.04}s` }}>{name}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 주요 기능 */}
      <section id="p-features" className="p-sec feat">
        <div className="wrap">
          <SecTitle no="05" sub="화면을 누르면 크게 볼 수 있습니다.">실제로 만든<br /><span>주요 기능</span></SecTitle>

          <FeatHead head={sc.flowHead} />
          <ol className="flow">
            {sc.flow.map(([src, title, body], k) => (
              <Reveal as="li" key={title} className="flow-step" delay={k * 0.1}>
                <div className="flow-tag"><small>STEP {k + 1}</small><span>{title}</span></div>
                {src
                  ? <button type="button" className="frame" onClick={() => openShot(src)} aria-label={`${title} 화면 크게 보기`}><i aria-hidden="true" /><img src={src} alt="" loading="lazy" /></button>
                  : <div className="frame is-text" aria-hidden="true"><i /><b>{String(k + 1).padStart(2, '0')}</b></div>}
                <p>{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="stage">
          <div className="wrap">
            <FeatHead head={sc.heroHead} />
            <div className="stage-grid">
              <ul className="callouts is-left">
                {sc.left.map(([t, b], k) => <Reveal as="li" key={t} delay={0.15 + k * 0.1}><b>{t}</b><span>{b}</span></Reveal>)}
              </ul>
              <Reveal className="stage-shot">
                <button type="button" className="frame is-big" onClick={() => openShot(sc.hero)} aria-label="화면 크게 보기"><i aria-hidden="true" /><img src={sc.hero} alt={sc.heroTitle} loading="lazy" /></button>
              </Reveal>
              <ul className="callouts is-right">
                {sc.right.map(([t, b], k) => <Reveal as="li" key={t} delay={0.15 + k * 0.1}><b>{t}</b><span>{b}</span></Reveal>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="pair-panel">
            <FeatHead head={sc.pairHead} />
            <div className="pair">
              {sc.pair.map(([src, title, body], k) => (
                <Reveal key={title} className={`pair-item ${k ? 'is-low' : ''}`} delay={k * 0.12}>
                  <button type="button" className="frame" onClick={() => openShot(src)} aria-label={`${title} 화면 크게 보기`}><i aria-hidden="true" /><img src={src} alt="" loading="lazy" /></button>
                  <div className="pair-text"><b>{title}</b><p>{body}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 기술적 기여 */}
      <section id="p-contrib" className="p-sec p-dark">
        <div className="wrap">
          <SecTitle no="06">기여의 핵심,<br /><span>주요 기술적 기여</span></SecTitle>
          <div className="contrib">
            {d.contributions.map((c, k) => (
              <Reveal as="article" key={c.title} delay={(k % 2) * 0.08}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                {c.code && <pre><code>{c.code}</code></pre>}
                <div className="tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 트러블슈팅 */}
      <section id="p-trouble" className="p-sec">
        <div className="wrap">
          <SecTitle no="07">막혔던 곳과<br /><span>풀어낸 방법</span></SecTitle>
          <div className="troubles">
            {d.troubles.map((t, k) => (
              <Reveal key={t.problem} className="trouble" delay={k * 0.06}>
                <div className="t-p"><small>문제</small>{t.problem}</div>
                <div className="t-c"><small>원인</small>{t.cause}</div>
                <div className="t-f"><small>해결</small>{t.fix}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 성과·회고 */}
      <section id="p-result" className="p-sec p-sec-alt">
        <div className="wrap">
          <SecTitle no="08">숫자로 본 성과와<br /><span>돌아보며</span></SecTitle>
          <Stats stats={d.stats} />
          <div className="retro">
            <Reveal className="retro-card"><h3>배운 점</h3><ul className="blist">{d.retro.learned.map((t) => <li key={t}>{t}</li>)}</ul></Reveal>
            <Reveal className="retro-card" delay={0.08}><h3>다음에 할 것</h3><ul className="blist">{d.retro.next.map((t) => <li key={t}>{t}</li>)}</ul></Reveal>
          </div>
        </div>
      </section>

      <section className="p-outro">
        <div className="wrap">
          <Reveal as="h2">{p.slogan[0]} {p.slogan[1]},<br />{p.title}</Reveal>
          <Reveal as="p" delay={0.08}>함께 낸 문서: {d.docs}</Reveal>
          {d.links.length > 0 && (
            <Reveal className="outro-btns" delay={0.14}>
              {d.links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
            </Reveal>
          )}
        </div>
      </section>

      <nav className={`pn ${prev === next ? 'is-single' : ''}`} aria-label="다른 프로젝트">
        {prev !== next && <Link to={`/projects/${prev.id}`} style={{ '--accent': prev.accent }}><small>이전 프로젝트</small><b>{prev.title}</b></Link>}
        <Link to={`/projects/${next.id}`} style={{ '--accent': next.accent }}><small>{prev === next ? '다른 프로젝트' : '다음 프로젝트'}</small><b>{next.title}</b></Link>
      </nav>

      <Footer />
      {lb !== null && <Lightbox items={shots} index={lb} onClose={() => setLb(null)} onMove={move} />}
    </main>
  );
}
