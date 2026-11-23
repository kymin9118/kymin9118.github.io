import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/index.js';

// 실제 서비스의 규칙 판정 결과를 단순하게 보여 주는 떠 있는 카드
const CASES = [
  { text: '산소 20.5% · 황화수소 3ppm', tone: 'ok', title: '작업 가능', sub: '4/4 기준 적합' },
  { text: '산소 17.2% · 황화수소 14ppm', tone: 'no', title: '작업 차단', sub: '산소 부족 · 황화수소 초과' },
  { text: 'TBM 사진 · 안전모 3/4명', tone: 'wait', title: '확인 필요', sub: '1명 미착용 의심' },
];

export default function LiveVerdict({ screen }) {
  const reduced = useReducedMotion();
  const [k, setK] = useState(0);
  useEffect(() => {
    if (reduced) return undefined;
    const t = setInterval(() => setK((v) => (v + 1) % CASES.length), 2600);
    return () => clearInterval(t);
  }, [reduced]);
  const c = CASES[k];
  return (
    <div className="live">
      <div className="frame live-screen" aria-hidden="true"><i /><img src={screen} alt="" /></div>
      <div key={k} className={`verdict-chip is-${c.tone}`} role="status">
        <span className="vc-dot" />
        <div>
          <small>규칙 엔진 판정</small>
          <b>{c.title}</b>
          <p>{c.text}</p>
          <em>{c.sub}</em>
        </div>
      </div>
      <div className="input-chip" aria-hidden="true">
        <span>🎙</span> “산소 이십 점 오 퍼센트, 황화수소 삼 피피엠”
      </div>
    </div>
  );
}
