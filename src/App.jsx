import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useScrolled } from './hooks/index.js';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import ProjectPage from './pages/ProjectPage.jsx';

function ScrollManager() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    // 상세 → 목록으로 돌아올 때는 이동할 섹션이 state에 담겨 옴
    if (state?.scrollTo) {
      requestAnimationFrame(() => document.getElementById(state.scrollTo)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);
  return null;
}

function ToTop() {
  const show = useScrolled(900);
  return (
    <button type="button" className={`to-top ${show ? 'is-on' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="맨 위로" tabIndex={show ? 0 : -1}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToTop />
    </>
  );
}
