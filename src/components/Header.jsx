import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrolled, useTheme } from '../hooks/index.js';
import { profile } from '../data/profile.js';

const NAV = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['contact', 'Contact']];

export default function Header() {
  const scrolled = useScrolled();
  const [theme, toggle] = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';

  const go = (id) => (e) => {
    e.preventDefault();
    if (onHome) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    else navigate('/', { state: { scrollTo: id } });
  };

  return (
    <header className={`pill-header ${scrolled || !onHome ? 'is-solid' : ''}`}>
      <Link to="/" className="pill-brand"><i aria-hidden="true" />{profile.nameEn}</Link>
      <nav aria-label="주요 메뉴">
        {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={go(id)}>{label}</a>)}
      </nav>
      <button type="button" className="theme-btn" onClick={toggle} aria-label={theme === 'dark' ? '밝은 화면으로' : '어두운 화면으로'}>
        {theme === 'dark' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        )}
      </button>
    </header>
  );
}
