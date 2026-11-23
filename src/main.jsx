import { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

console.log(
  '%c\n  채용 담당자님, 반갑습니다.\n  코드가 궁금하시면 github.com/kymin9118 에 있습니다.\n',
  'color:#b7791f;font-weight:600;font-size:13px',
);

// 미리보기 창처럼 주소가 없는 곳(about:srcdoc 등)에서는 HashRouter가 URL을 만들지 못하므로 메모리 라우터를 씁니다.
const hasRealUrl = /^(https?|file):$/.test(window.location.protocol);
const Router = hasRealUrl ? HashRouter : MemoryRouter;

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24 }}>화면을 그리는 중에 문제가 생겼습니다</h1>
        <p style={{ marginTop: 8, color: '#545C66' }}>새로고침하거나 github.com/kymin9118 에서 확인해 주세요.</p>
      </div>
    );
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </StrictMode>,
);
