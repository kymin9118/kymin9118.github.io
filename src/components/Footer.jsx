import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>© 2026 {profile.name}</span>
      </div>
    </footer>
  );
}
