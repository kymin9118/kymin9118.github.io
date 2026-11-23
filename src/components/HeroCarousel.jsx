import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { carouselProjects as slides } from '../data/projects.js';
import { useReducedMotion, useTheme } from '../hooks/index.js';
import LiveVerdict from './LiveVerdict.jsx';

const INTERVAL = 6000;
const LOCK = 650;

function position(index, current, n) {
  let d = index - current;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  if (d === 0) return 'is-active';
  if (d === -1) return 'is-prev';
  if (d === 1) return 'is-next';
  return 'is-far';
}

function Visual({ project }) {
  if (project.hero.type === 'permit') return <LiveVerdict screen={project.cover} />;
  if (project.hero.type === 'pipeline') {
    const steps = [['git push', 'main 브랜치'], ['GitHub Actions', 'JDK 17 · Gradle 빌드'], ['S3', '빌드 산출물 업로드'], ['CodeDeploy', 'EC2에 배포'], ['Nginx', 'mpago.co.kr']];
    return (
      <ol className="pipeline" aria-label="배포 흐름">
        {steps.map(([t, s], i) => <li key={t} style={{ '--i': i }}><b>{t}</b><span>{s}</span></li>)}
      </ol>
    );
  }
  return (
    <div className="mock-stack">
      {project.mockups.map((src, i) => <img key={src} src={src} alt="" style={{ '--i': i }} loading={i ? 'lazy' : 'eager'} />)}
    </div>
  );
}

export default function HeroCarousel() {
  const n = slides.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const [theme] = useTheme();
  const locked = useRef(false);
  const drag = useRef(null);
  const [dragX, setDragX] = useState(0);

  const goTo = useCallback((i) => {
    if (locked.current) return;
    locked.current = true;
    setTimeout(() => { locked.current = false; }, LOCK);
    setCurrent((i + n) % n);
  }, [n]);
  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  // 마우스로 끌거나 손가락으로 밀어서 넘기기. 입력칸·버튼·링크 위에서는 끌기를 시작하지 않음
  const onDragStart = (e) => {
    if (e.button !== 0 || e.target.closest('input, button, a, .permit')) return;
    e.preventDefault();
    window.getSelection()?.removeAllRanges();
    drag.current = { x: e.clientX, id: e.pointerId };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onDragMove = (e) => {
    if (!drag.current) return;
    setDragX(e.clientX - drag.current.x);
  };
  const onDragEnd = () => {
    if (!drag.current) return;
    const dx = dragX;
    drag.current = null;
    setDragX(0);
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
  };

  // 자동 넘김: 마우스를 올리거나 안에 포커스가 있거나, 탭이 숨겨졌거나, 동작 줄이기 설정이면 멈춤
  const autoplay = !paused && !reduced;
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [autoplay, current, next]);
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // 거의 검은 바탕 위에 프로젝트 색 빛이 모서리에서 번지는 배경
  const [c1, c2] = slides[current].glow;
  const background = theme === 'dark'
    ? [
      `radial-gradient(1300px 900px at 92% -12%, rgba(${c1}, .85), transparent 60%)`,
      `radial-gradient(1000px 700px at -8% 112%, rgba(${c2}, .38), transparent 62%)`,
      `radial-gradient(900px 600px at 50% 125%, rgba(${c1}, .35), transparent 70%)`,
      '#0B0A0D',
    ].join(', ')
    : [
      `radial-gradient(1300px 900px at 92% -12%, rgba(${c1}, .55), transparent 60%)`,
      `radial-gradient(1000px 700px at -8% 112%, rgba(${c2}, .30), transparent 62%)`,
      `radial-gradient(900px 600px at 50% 125%, rgba(${c1}, .22), transparent 70%)`,
      '#F6F4F0',
    ].join(', ');

  return (
    <section
      id="top"
      className={`hero-carousel ${autoplay ? 'is-playing' : ''}`}
      style={{ background }}
      aria-roledescription="carousel"
      aria-label="대표 프로젝트"
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setPaused(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
      onKeyDown={(e) => { if (e.target.tagName === 'INPUT') return; if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); }}
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
    >
      <div className="orbs" aria-hidden="true"><span /><span /></div>

      <div className={`hc-track ${dragX ? 'is-dragging' : ''}`} style={dragX ? { transform: `translateX(${dragX * 0.35}px)` } : undefined}>
        {slides.map((p, i) => {
          const pos = position(i, current, n);
          const active = pos === 'is-active';
          return (
            <article
              key={p.id}
              className={`hc-card ${pos}`}
              aria-hidden={!active}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${n}: ${p.title}`}
              onClick={!active && pos !== 'is-far' ? () => goTo(i) : undefined}
            >
              <div className="hc-text">
                <p className="hc-index">{p.year} · {String(i + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}</p>
                <h2 className="hc-slogan">{p.slogan[0]}<br />{p.slogan[1]}</h2>
                <p className="hc-title">{p.title}</p>
                <p className="hc-summary">{p.summary}</p>
                <dl className="hc-meta">
                  <div><dt>맡은 일</dt>{p.role.map((r) => <dd key={r}>{r}</dd>)}</div>
                  <div><dt>기간</dt><dd>{p.period}</dd></div>
                  <div><dt>도구</dt>{p.tools.map((t) => <dd key={t}>{t}</dd>)}</div>
                </dl>
                {p.detail
                  ? <Link className="hc-cta" to={`/projects/${p.id}`} tabIndex={active ? 0 : -1}>프로젝트 자세히 보기</Link>
                  : <a className="hc-cta" href={p.link} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}>GitHub에서 보기</a>}
              </div>
              <div className="hc-visual">{active || pos !== 'is-far' ? <Visual project={p} /> : null}</div>
            </article>
          );
        })}
      </div>

      <div className="hc-index-bar">
        <div className="hc-step">
          <button type="button" onClick={prev} aria-label="이전 프로젝트"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg></button>
          <span className="hc-count"><b>{String(current + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}</span>
          <button type="button" onClick={next} aria-label="다음 프로젝트"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg></button>
        </div>
        <div className="hc-tabs" role="tablist" aria-label="프로젝트 고르기">
          {slides.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              className={i === current ? 'is-on' : ''}
              onClick={() => goTo(i)}
            >
              <span className="hc-tab-name">{p.title}</span>
              <span className="hc-tab-bar"><i style={{ animationDuration: `${INTERVAL}ms` }} /></span>
            </button>
          ))}
        </div>
        <button type="button" className="hc-pause" onClick={() => setPaused((v) => !v)} aria-label={autoplay ? '자동 넘김 멈추기' : '자동 넘김 다시 시작'}>
          {autoplay ? '멈춤' : '재생'}
        </button>
      </div>

      <svg className="hc-curve" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0,80 C360,10 1080,10 1440,80 L1440,80 L0,80 Z" /></svg>
    </section>
  );
}
