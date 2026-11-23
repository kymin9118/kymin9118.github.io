import { useState } from 'react';
import HeroCarousel from '../components/HeroCarousel.jsx';
import Skills from '../components/Skills.jsx';
import ProjectList from '../components/ProjectList.jsx';
import Reveal from '../components/Reveal.jsx';
import Footer from '../components/Footer.jsx';
import { certificates, profile } from '../data/profile.js';
import wayPermit from '../assets/safety/permit.jpg';
import wayTbm from '../assets/safety/tbm.jpg';
import wayRecords from '../assets/safety/records.jpg';

const wayImages = { permit: wayPermit, tbm: wayTbm, records: wayRecords };

export default function Home() {
  const [skill, setSkill] = useState(null);
  const pick = (s) => setSkill((cur) => (s && cur?.name !== s.name ? s : null));
  return (
    <main className="home">
      <HeroCarousel />

      <section id="about" className="about">
        <div className="wrap about-grid">
          <div className="about-left">
            <Reveal as="h2" className="about-headline">{profile.headline[0]}<br />{profile.headline[1]}</Reveal>
            <Reveal className="about-body" delay={0.08}>
              <p>{profile.intro}</p>
              <p>매번 사람이 확인하던 일은 규칙으로 옮기고,<br />판단이 필요한 순간에는 근거와 함께 사람에게 넘기는 구조를 만듭니다.</p>
            </Reveal>
          </div>
          <Reveal className="about-info" delay={0.12}>
            <div className="info-row">
              <h3>About<span>기본정보</span></h3>
              <div className="info-basic">
                {profile.photo
                  ? <img className="id-photo" src={profile.photo} alt={`${profile.name} 사진`} draggable="false" onContextMenu={(e) => e.preventDefault()} />                  : <div className="id-photo is-empty" role="img" aria-label="증명사진 자리">사진</div>}
                <div>{profile.info.basic.map((t) => <p key={t}>{t}</p>)}</div>
              </div>
            </div>
            <div className="info-row">
              <h3>Education<span>학력사항</span></h3>
              <ul>{profile.info.education.map((e) => <li key={e.title}><b>{e.title}{e.example && <em>예시</em>}</b><small>{e.sub}</small></li>)}</ul>
            </div>
            <div className="info-row is-act">
              <h3>Activities<span>프로젝트</span></h3>
              <ul>{profile.info.activities.map((e) => <li key={e.title}><b>{e.title}</b><small>{e.sub}</small></li>)}</ul>
            </div>
            <div className="info-row is-skills">
              <h3>Skills<span>주력 기술</span></h3>
              <dl className="skill-lines">
                {profile.info.skills.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
            <div className="info-row is-certs" id="certificates">
              <h3>Certificate<span>자격증</span></h3>
              <div className="cert-mini">
                {certificates.map((c) => (
                  <div key={c.name} className="cert-card">
                    {c.example && <span className="cert-ex">예시</span>}
                    <b>{c.name}</b>
                    <span>{c.org}</span>
                    <span className="cert-date">{c.date}</span>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 6 - certificates.length) }, (_, k) => <div key={`empty-${k}`} className="cert-card is-empty">자격증 추가 자리</div>)}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="wrap ways">
          <Reveal as="p" className="ways-label">Working Style</Reveal>
          <div className="ways-grid">
            {profile.principles.map(([kw, kwSub, out, outSub, img], k) => (
              <Reveal key={kw} className="way" delay={k * 0.08} style={{ backgroundImage: `url(${wayImages[img]})` }}>
                <div className="way-in">
                  <b>{kw}</b><span>{kwSub}</span>
                  <svg className="way-arrow" viewBox="0 0 48 24" aria-hidden="true"><path d="M2 3l22 18L46 3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                  <b>{out}</b><span>{outSub}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Skills picked={skill} onPick={pick} />
      <ProjectList skill={skill?.name} onClear={() => setSkill(null)} />

      <section id="contact" className="section contact">
        <div className="wrap">
          <Reveal as="header" className="sec-head"><h2>Contact</h2><p>코드와 작업 기록은 GitHub에 있습니다.</p></Reveal>
          <Reveal className="contact-links" delay={0.08}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>
              github.com/kymin9118
            </a>
            {profile.email && (
              <a href={`mailto:${profile.email}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                {profile.email}
              </a>
)}
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
