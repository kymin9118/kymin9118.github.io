export const profile = {
  name: '김영민',
  nameEn: 'YOUNGMIN.KIM',
  role: '백엔드 개발자',
  github: 'https://github.com/kymin9118',
  // 공개해도 되는 연락용 이메일이 있으면 적으세요. 비워 두면 Contact에 나오지 않습니다.
  email: '',
  headline: ['반복되는 확인은 시스템이,', '판단이 필요한 순간은 사람이.'],
  // 증명사진: src/assets/profile.jpg 를 넣고 파일 맨 위에 `import photo from '../assets/profile.jpg';`를 추가한 뒤 photo: photo 로 바꾸세요.
  photo: null,
  // 일하는 방식: [키워드, 설명, 결과 키워드, 결과 설명, 배경 이미지 키]
  principles: [
    ['규칙은 코드로', '매번 사람이 대조하던 기준을 서버로', '같은 입력, 같은 결과', '웹과 AI가 같은 판정을 씀', 'permit'],
    ['판단은 근거와 함께', '확신이 낮으면 멈추고 넘긴다', '확인 필요', '사람이 판단할 근거를 같이 보여 줌', 'tbm'],
    ['문서도 결과물', '요구사항부터 매뉴얼까지', '코드와 맞춘 문서', '테스트 결과서·운영자 매뉴얼 81쪽', 'records'],
  ],
  // About 오른쪽 정보 칸. example: true 는 '예시' 표시
  info: {
    basic: ['김영민', 'YOUNGMIN.KIM', 'github.com/kymin9118'],
    education: [{ title: '○○대학교 ○○학과', sub: '재학', example: true }],
    activities: [
      { title: '산업현장 안전관리 AI', sub: '서버 · 작업허가 · 문장/음성 입력 | 2026.10 – 11' },
      { title: 'PDF OCR 문서 아카이브', sub: '백엔드 | 2026' },
      { title: 'mpago · Moving · kymfinal', sub: '백엔드 · 조장 · 프론트엔드 | 2024' },
    ],
    skills: [
      ['Backend', 'Java, Spring Boot, Spring Security, JPA, Flyway, MySQL'],
      ['Frontend', 'React, Vite, JSP'],
      ['AI', 'Python, FastAPI, LoRA, Whisper, YOLOX'],
      ['Infra', 'Docker, AWS, GitHub Actions'],
    ],
  },
  intro:
    '작업허가 판정 규칙, 인증과 권한, 문장·음성 입력처럼 현장의 확인 절차를 서버로 옮기는 일을 해 왔습니다.',
};

// 자격증: 이 배열에 추가하면 화면에 바로 나옵니다. 6칸 기준으로 빈 자리는 자동으로 채워집니다. example: true 는 '예시' 표시가 붙습니다.
export const certificates = [
  { name: '정보처리기사', org: '한국산업인력공단', date: '2026. 00.', example: true },
  { name: 'SQLD', org: '한국데이터산업진흥원', date: '2026. 00.', example: true },
];

// 기술: 칩을 누르면 스포트라이트에 points 와 이 기술을 쓴 프로젝트가 나옵니다.
export const skills = [
  { group: 'Backend', label: '백엔드', items: [
    { name: 'Java', points: ['Spring Boot 서버의 주 언어', '규칙 엔진·업무 API·인증을 Java 17로 작성'] },
    { name: 'Spring Boot', points: ['안전관리 AI 서버: 인증·회원, 업무 API, 규칙 엔진', 'OCR 아카이브: 업로드 검증, 비동기 OCR 요청, 이력 저장', 'mpago: 도메인 설계와 배포'] },
    { name: 'Spring Security', points: ['JWT 인증과 refresh 토큰 회전', 'AI가 부르는 내부 API를 토큰으로 따로 인증'] },
    { name: 'JPA', points: ['업무 엔티티와 결재·기록 관계 설계', '실행(run) 단위 이력 저장'] },
    { name: 'Flyway', points: ['업무 DB 스키마를 버전별 마이그레이션으로 관리', '적용된 버전은 고치지 않고 새 버전을 추가'] },
  ]},
  { group: 'Python · Model', label: 'AI', items: [
    { name: 'FastAPI', points: ['규칙 판정 도구, 문장 추출, STT, 사진 인식을 서버와 연결'] },
    { name: 'LoRA', points: ['Qwen3-0.6B에 문장 추출 어댑터를 학습해 연결', '정답 세트 142건 기준 98%'] },
    { name: 'Whisper', points: ['말로 입력한 측정값을 텍스트로 변환', '표기 규칙을 더해 측정값 인식 69% → 88%'] },
    { name: 'YOLOX', points: ['TBM 사진에서 인원 인식', '안전모 검출 모델 학습 (AP50 0.866)'] },
  ]},
  { group: 'Data · Infra', label: '데이터·인프라', items: [
    { name: 'MySQL', points: ['업무 DB와 문서·실행 이력 저장'] },
    { name: 'Docker', points: ['웹·서버·AI·DB를 Docker Compose로 함께 실행', '컨테이너 간 통신 문제 해결'] },
    { name: 'AWS', points: ['RDS·S3와 CodeDeploy로 배포 (mpago)'] },
    { name: 'GitHub Actions', points: ['빌드와 배포 자동화 (mpago)'] },
  ]},
  { group: 'Frontend', label: '프론트엔드', items: [
    { name: 'React', points: ['안전관리 AI 웹 개편: 디자인 토큰, 공통 부품, 홈·작업 현황', 'kymfinal: 지도와 일정 화면'] },
  ]},
];
