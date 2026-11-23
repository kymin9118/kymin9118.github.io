import sHome from '../assets/safety/home.jpg';
import sStatus from '../assets/safety/status.jpg';
import sHub from '../assets/safety/hub.jpg';
import sPermit from '../assets/safety/permit.jpg';
import sTbm from '../assets/safety/tbm.jpg';
import sNearMiss from '../assets/safety/nearmiss.jpg';
import sRecords from '../assets/safety/records.jpg';
import oFlow from '../assets/ocr/flow.jpg';
import oPorts from '../assets/ocr/ports.jpg';
import oBranch from '../assets/ocr/branch.jpg';
import oArch from '../assets/ocr/arch.jpg';

/*
 * 프로젝트를 추가할 때는 이 배열에 객체 하나를 넣으면 됩니다.
 * detail 이 있으면 상세 페이지(/projects/:id)가 생기고, 없으면 link 로 이동합니다.
 * gradient: [라이트 시작, 라이트 끝, 다크 끝]
 */
export const projects = [
  {
    id: 'safety',
    title: '산업현장 안전관리 AI',
    slogan: ['현장의 확인 절차를', '한 흐름으로'],
    summary: '위험성평가부터 작업허가, TBM, 결재까지 현장 안전 업무를 한 흐름으로 묶고, 문장·음성·사진 입력과 AI 도우미로 기록 부담을 줄인 서비스',
    year: '2026',
    period: '2026.10.26 – 11.26',
    team: '4명',
    role: ['서버', '작업허가·규칙 판정', '문장·음성 입력', '웹 개편'],
    tools: ['Spring Boot 4', 'FastAPI', 'React 19', 'MySQL · Flyway'],
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'Flyway', 'MySQL', 'FastAPI', 'LoRA', 'Whisper', 'YOLOX', 'React', 'Docker'],
    accent: '#F2A900',
    gradient: ['#FFB020', '#F0661A', '#C2410C'],
    glow: ['240, 102, 26', '255, 176, 32'],
    hero: { type: 'permit' },
    cover: sHome,
    overviewShot: sPermit,
    mockups: [sHome, sPermit, sTbm],
    cardPoints: [
      '인증·회원, 승인함·결재, 대시보드·알림 등 서버 업무 API',
      '화기·밀폐·고소 작업 규칙 엔진과 AI 판정 도구 연결',
      '문장·음성으로 허가서 채우기, 추출 어댑터(LoRA) 학습',
      'TBM 사진 인원·안전모 인식, 웹 개편(디자인 토큰·공통 부품)',
    ],
    detail: {
      overview: {
        background: [
          '작업 하나를 시작하려면 위험성평가, 작업허가서, TBM, 결재를 각각 따로 작성하고 확인해야 합니다.',
          '가스 측정값처럼 기준이 정해진 항목도 사람이 매번 눈으로 대조합니다.',
        ],
        goals: [
          '작업 등록부터 최종 승인까지 한 흐름으로 잇는다',
          '기준이 정해진 확인은 서버 규칙으로 판정하고, 판단은 근거와 함께 사람에게 넘긴다',
          '문장·음성·사진으로 입력 부담을 줄인다',
        ],
        statement: '확인은 시스템이, 판단은 사람이.',
        problems: [['흩어진 서류', '평가·허가·TBM·결재를 따로 작성'], ['눈으로 하는 대조', '측정값을 기준표와 매번 비교'], ['반복되는 입력', '같은 내용을 여러 화면에 다시 입력']],
        solution: ['한 흐름의 작업 관리', '규칙 엔진 자동 판정', '문장·음성·사진 입력'],
        scope: [['요구사항', '91건 (기능 76 · 비기능 15)'], ['화면', '30개'], ['구현률', '96%'], ['기간', '2026.10.26 – 11.26']],
      },
      architecture: {
        nodes: [['React 19', '웹 · Vite'], ['Spring Boot 4', '인증 · 업무 API · 규칙 엔진', true], ['FastAPI', '에이전트 · STT · 사진 인식'], ['MySQL · Qdrant', '업무 DB · 벡터 검색']],
        layers: [
          ['웹', 'React 19, Vite, 디자인 토큰과 공통 부품'],
          ['서버', 'Java 17, Spring Boot 4, Spring Security, JPA, Flyway'],
          ['AI', 'FastAPI, Qwen3-0.6B + LoRA, Whisper, YOLOX'],
          ['데이터', 'MySQL, Qdrant'],
          ['인프라', 'Docker Compose'],
        ],
        decisions: [
          ['판정은 서버가, AI는 도구로', '위험 기준 판정은 서버 규칙 엔진 한곳에 두고, AI는 같은 판정 API를 도구로 호출합니다. 같은 입력이면 웹과 AI가 같은 결과를 냅니다.'],
          ['AI 호출은 따로 인증', 'AI 서버가 부르는 내부 API는 사용자 토큰과 별도인 내부 토큰으로 인증합니다.'],
          ['스키마는 버전으로', '업무 DB는 Flyway로 관리하고, 이미 적용된 버전은 고치지 않고 새 버전을 추가합니다.'],
        ],
      },
      showcase: {
        flowHead: ['WORK FLOW', '작업 하나가', '승인되기까지', '작업 등록부터 현황 반영까지 한 흐름으로 이어지도록 화면과 서버 규칙을 맞췄습니다. 단계마다 필요한 확인을 놓치지 않게 다음 단계로 넘어가기 전에 막습니다.'],
        flow: [
          [sHub, '작업 등록', '같은 구역에서 확인하지 않은 아차사고가 있으면 경고하고 승인 요청을 막습니다.'],
          [sPermit, '작업허가', '측정값을 문장이나 음성으로 넣으면 칸이 채워지고 규칙 엔진이 판정합니다.'],
          [sTbm, 'TBM', '작업 전 회의 사진으로 참석 인원과 안전모 착용을 확인합니다.'],
          [sStatus, '작업 현황', '승인과 진행 상태가 현황판에 바로 반영됩니다.'],
        ],
        heroTitle: '홈 대시보드',
        heroHead: ['HOME', '오늘 챙길 일을', '홈 한 화면에 모았습니다', '차단된 작업, 남은 일, 결재를 따로 찾아다니지 않도록 홈에서 바로 보이게 했습니다.'],
        hero: sHome,
        left: [['차단 작업 알림', '오늘 차단된 작업을 맨 위에 먼저 보여 줍니다'], ['작업 현황', '지연 · 승인 대기 · 준비 완료를 숫자로'], ['오늘 일정', '작업 시간표와 TBM 마감 시각']],
        right: [['오늘 할 일', '측정값 미입력 · TBM 미실시 같은 남은 일'], ['승인함', '결재 대기와 내가 올린 요청'], ['AI 작업 등록', '말하듯 적거나 음성으로 작업 초안 만들기']],
        pairHead: ['RECORDS', '지난 기록을', '다음 작업의 근거로', '아차사고와 작업 기록을 찾아 다음 작업을 등록할 때 참고합니다.'],
        pair: [
          [sNearMiss, '아차사고 태그 검토', '자동으로 붙은 태그를 사람이 확정해야 검색에 쓰입니다.'],
          [sRecords, '기록 검색', '지난 작업과 아차사고를 찾아 다음 작업에 참고합니다.'],
        ],
      },
      retro: {
        learned: ['(직접 적을 자리) 이 프로젝트에서 배운 점'],
        next: ['(직접 적을 자리) 다음에 개선하고 싶은 점'],
      },
      lead: '현장 작업자가 작업을 등록하면 위험성평가, 작업허가, TBM, 승인까지 한 흐름으로 이어집니다. 가스 측정값 같은 위험 기준은 서버의 규칙 엔진이 판정하고, AI 도우미는 대화로 작업 초안을 만들거나 지난 기록을 찾아 줍니다.',
      stats: [
        { value: 98, suffix: '%', label: '문장 추출 정확도', note: '정답 세트 142건' },
        { value: 0.866, decimals: 3, label: '안전모 검출 AP50', note: '직접 학습한 모델' },
        { value: 88, suffix: '%', label: '음성 측정값 인식', note: '표기 규칙 적용 전 69%' },
        { value: 81, suffix: '쪽', label: '운영자 매뉴얼', note: '직접 작성' },
      ],
      map: [
        { group: '기반', items: [['인증·회원', 2], ['회사 관리', 2], ['현장 설정·기준 정보', 2], ['보안', 1], ['운영·배포', 0]] },
        { group: '작업 흐름', items: [['작업·경고', 2], ['위험성평가', 2], ['작업허가·규칙 판정', 2], ['TBM·사진 확인', 2], ['점검표', 2], ['결재', 2], ['대시보드·알림', 2]] },
        { group: '입력과 AI', items: [['문장·음성 입력', 2], ['작업 등록 에이전트', 1], ['지식 검색(RAG)', 0], ['아차사고', 1]] },
        { group: '기록', items: [['기록 조회·질문', 1], ['일일 안전일지', 1], ['감사 대응 보고서', 1], ['개선조치', 2]] },
      ],
      contributions: [
        { title: '규칙 엔진으로 작업허가 판정', body: '화기·밀폐·고소 작업의 가스 측정값, 감시인, 환기, 추락 방지 조건을 서버에서 판정하고 기록합니다. AI도 같은 판정을 쓰도록 내부 토큰으로 인증한 도구 API로 열었고, 차단 판정은 알림과 대시보드 집계로 이어집니다.', tags: ['Spring Boot', '규칙 엔진', '내부 API 인증'] },
        { title: '문장과 음성으로 허가서 채우기', body: '규칙 사전으로 먼저 값을 뽑고, 빈 값만 LLM으로 보강한 뒤 항목 이름, CO/CO₂, 단위로 다시 검증합니다. Qwen3-0.6B에 직접 만든 데이터로 LoRA 어댑터를 학습해 붙였고, 음성은 Whisper로 받아 같은 흐름에 넣습니다.', tags: ['LoRA', 'Qwen3-0.6B', 'Whisper'] },
        { title: 'TBM 사진으로 인원과 안전모 확인', body: 'YOLOX-Nano로 사진 속 인원을 세고, 직접 학습한 안전모 검출 모델로 미착용을 경고합니다. 확신이 낮으면 확인 필요로 남겨 사람이 판단하게 했습니다. 사진 22장 평가에서 미착용 12장 중 10장을 경고했습니다.', tags: ['YOLOX', '객체 검출', 'CPU 2~3초/장'] },
        { title: '확인 안 한 아차사고가 있으면 승인 차단', body: '작업을 등록할 때 같은 구역의 아차사고를 경고로 보여 주고, 확인하기 전에는 허가 승인 요청을 막습니다. 최종 승인 전에는 위험성평가 승인을 필수로 걸었습니다.', tags: ['업무 규칙', '결재 흐름'] },
        { title: '인증과 회원', body: '가입, 이메일 인증, 관리자 가입 승인, refresh 토큰 회전, 비밀번호 재설정까지 인증 전체를 맡았습니다. 관리자 권한이 내려가면 현장 권한도 함께 회수합니다.', tags: ['Spring Security', 'JWT'] },
      ],
      troubles: [
        { problem: '날짜가 하루 밀려 보임', cause: '서버와 브라우저가 UTC 기준으로 날짜를 계산', fix: 'JVM 기본 시간대를 Asia/Seoul로 고정하고, 웹 기본 기간도 한국 날짜로 계산' },
        { problem: '음성으로 말한 측정값이 자주 틀림', cause: 'ppm, 소수점 표기를 STT가 일정하지 않게 받아씀', fix: '측정값 표기 규칙을 추가해 사람 목소리 시험에서 69%에서 88%로 개선' },
        { problem: '여러 문장을 반영하면 오래 걸림', cause: '문장마다 LLM을 따로 호출', fix: '반영할 때 한 번만 호출해 여러 문장을 함께 처리하고 대기 시간을 50초로 제한' },
      ],
      gallery: [
        [sHome, '홈: 대시보드와 AI 도우미'], [sStatus, '작업 현황'], [sHub, '작업 허브: 아차사고 경고'],
        [sPermit, '작업허가 4단계'], [sTbm, 'TBM'], [sNearMiss, '아차사고 태그 검토'], [sRecords, '기록 검색'],
      ],
      // 공개해도 되는 파일·영상 주소가 생기면 [이름, 주소]로 넣으세요. 비어 있으면 버튼이 나오지 않습니다.
      links: [],
      docs: '요구사항정의서, 기능구조도, ERD, 화면 정의서, 단위·통합 테스트 계획서와 결과서',
    },
  },
  {
    id: 'ocr',
    title: 'PDF OCR 문서 아카이브',
    slogan: ['올린 PDF를', '읽을 수 있는 기록으로'],
    summary: 'PDF를 OCR로 텍스트화하고, 처리 결과와 실행 이력을 한곳에서 관리하는 웹 서비스',
    year: '2026',
    period: '2026',
    team: '4명',
    role: ['백엔드'],
    tools: ['Spring Boot', 'FastAPI', 'MySQL 8', 'Docker Compose'],
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'MySQL', 'FastAPI', 'React', 'Docker'],
    accent: '#3B82F6',
    gradient: ['#5B8CFF', '#2F49E0', '#1E2FA8'],
    glow: ['58, 84, 230', '120, 90, 255'],
    hero: { type: 'mockups' },
    cover: oArch,
    overviewShot: oFlow,
    mockups: [oFlow, oArch, oPorts],
    cardPoints: [
      'Spring Boot API, React–FastAPI OCR 연동',
      'JWT 인증과 사용자별 문서 접근 제어',
      '커밋 뒤 비동기 OCR 요청, 실행 단위 이력 저장',
      'Mockito 단위 테스트 124개, 테스트 계획·결과서',
    ],
    detail: {
      overview: {
        background: [
          'PDF로 받은 문서는 내용을 검색하거나 다시 쓰기 어렵습니다.',
          'OCR 엔진마다 잘 읽는 문서가 달라서, 엔진을 바꿔 다시 처리하고 결과를 비교할 수 있어야 합니다.',
        ],
        goals: [
          '업로드부터 검증, OCR, 저장, 조회까지 한 흐름으로 잇는다',
          '엔진을 골라 다시 처리해도 이전 결과가 남게 한다',
          '직접 실행과 Docker 실행을 모두 지원한다',
        ],
        statement: '올린 PDF를 다시 쓸 수 있는 기록으로.',
        problems: [['검색 안 되는 PDF', '내용을 찾거나 옮겨 쓰기 어려움'], ['엔진마다 다른 결과', '문서마다 잘 읽는 엔진이 다름'], ['재처리하면 사라지는 결과', '이전 결과와 비교할 수 없음']],
        solution: ['업로드부터 조회까지 한 흐름', '엔진 선택과 재처리', '실행 단위 이력 보관'],
        scope: [['팀', '4명 (Backend · AI · Frontend · Infra)'], ['OCR 엔진', '4종'], ['실행 방식', '직접 실행 · Docker Compose'], ['기간', '2026 미니 프로젝트']],
      },
      architecture: {
        nodes: [['React 19', 'Vite'], ['Spring Boot', '인증 · 검증 · 상태', true], ['FastAPI', 'OCR 엔진'], ['MySQL 8', '문서 · 실행 · 결과']],
        layers: [
          ['웹', 'React 19, Vite'],
          ['서버', 'Java 17, Spring Boot, Spring Security(JWT), JPA'],
          ['OCR', 'FastAPI, PDFium · Tesseract · PaddleOCR · OpenAI'],
          ['데이터', 'MySQL 8'],
          ['인프라', 'Docker Compose, GitHub Actions'],
        ],
        decisions: [
          ['커밋 뒤에 비동기 요청', '처리 중 상태가 저장된 다음에만 OCR을 요청해, 결과가 먼저 돌아와도 저장할 대상이 있게 했습니다.'],
          ['OCR 호출을 인터페이스로', '실제 FastAPI 클라이언트와 Mock을 설정으로 바꿔 끼워 AI 서버 없이도 개발합니다.'],
          ['실행 단위로 이력 저장', '재처리할 때마다 새 실행(run)으로 저장해 이전 결과와 비교할 수 있습니다.'],
        ],
      },
      showcase: {
        flowHead: ['PROCESS', 'PDF 한 장이', '기록이 되기까지', '업로드부터 조회까지 상태를 먼저 저장하고, 커밋 뒤에 OCR을 요청하는 순서로 정리했습니다.'],
        flow: [
          [null, '업로드 검증', '20MB · 50페이지 제한과 %PDF- 시그니처를 확인합니다.'],
          [null, '처리 중 저장', '문서와 실행(run)을 처리 중 상태로 먼저 저장합니다.'],
          [null, '비동기 OCR', '커밋된 뒤에 고른 엔진으로 OCR을 요청합니다.'],
          [null, '결과 저장 · 조회', '결과를 실행 단위로 남기고 목록과 상세에서 봅니다.'],
        ],
        heroTitle: '서버 처리 흐름',
        heroHead: ['BACKEND', '요청 하나를', '이렇게 처리합니다', '인증과 검증, 상태 저장, 비동기 요청, 결과 보관을 서버가 맡습니다.'],
        hero: oFlow,
        left: [['JWT 인증', '로그인한 사용자 문서만 접근'], ['PDF 검증', '크기·페이지·시그니처 확인'], ['상태 저장', 'PROCESSING으로 먼저 기록']],
        right: [['비동기 요청', '커밋 뒤 FastAPI에 OCR 요청'], ['결과 저장', '실행 단위로 결과와 오류 보관'], ['재시작 복구', '멈춘 처리 건을 실패로 정리']],
        pairHead: ['TEAM', '함께 실행하고', '함께 협업하기', '네 서비스를 Docker Compose로 함께 띄우고, 브랜치 전략으로 PR 기반 협업을 했습니다.'],
        pair: [
          [oPorts, '컨테이너 포트 정리', '컨테이너끼리는 서비스 이름과 내부 포트로 통신합니다.'],
          [oBranch, '브랜치 전략', 'main · develop · feature · hotfix로 PR 기반 협업을 했습니다.'],
        ],
      },
      retro: {
        learned: ['(직접 적을 자리) 이 프로젝트에서 배운 점'],
        next: ['저장된 OCR 결과를 임베딩해 의미 기반 검색과 RAG로 확장'],
      },
      lead: '업로드한 PDF를 PDFium, Tesseract, PaddleOCR, OpenAI 중 고른 엔진으로 처리하고, 다시 처리할 때마다 실행 이력을 남깁니다. React, Spring Boot, FastAPI, MySQL을 Docker Compose 하나로 띄웁니다.',
      stats: [
        { value: 124, label: '단위 테스트', note: '@Test 메서드 기준' },
        { value: 20, suffix: 'MB', label: '업로드 한도', note: '50페이지까지' },
        { value: 4, suffix: '개', label: 'OCR 엔진', note: '설정으로 선택' },
        { value: 4, suffix: '명', label: '팀', note: '백엔드 담당' },
      ],
      map: [
        { group: '웹', items: [['로그인·회원가입 화면', 0], ['업로드·문서 목록', 0], ['결과 상세', 0]] },
        { group: 'API 서버', items: [['JWT 인증', 2], ['PDF 검증·저장', 2], ['처리 상태 관리', 2], ['결과·이력 저장', 2]] },
        { group: 'OCR 서버', items: [['엔진 선택', 0], ['텍스트 추출', 0], ['AI 요약', 0]] },
        { group: '인프라', items: [['Docker Compose', 0], ['CI', 0]] },
      ],
      contributions: [
        { title: '커밋된 뒤에만 OCR 요청', body: '상태를 처리 중으로 바꾼 트랜잭션이 커밋된 다음에 비동기로 OCR을 요청합니다. 결과가 먼저 돌아와 저장할 대상이 없는 상황을 막기 위해서입니다.', tags: ['@Async', '@TransactionalEventListener'], code: '@Async\n@TransactionalEventListener(phase = AFTER_COMMIT)\npublic void handle(OcrRequestedEvent event) { ... }' },
        { title: '설정 하나로 바꾸는 OCR 클라이언트', body: 'OCR 호출을 인터페이스로 분리하고 설정값으로 실제 FastAPI 클라이언트와 Mock을 바꿔 끼웁니다. AI 서버가 없어도 백엔드를 개발하고 테스트할 수 있었습니다.', tags: ['인터페이스 분리', '@ConditionalOnProperty'] },
        { title: '업로드 검증과 재시작 복구', body: '20MB·50페이지 제한과 %PDF- 시그니처로 위조 파일을 막고, 서버가 재시작되면 멈춘 처리 건을 실패로 정리합니다. 재처리해도 이전 결과가 남도록 실행 단위로 이력을 저장합니다.', tags: ['PDFBox', '데이터 정합성'] },
      ],
      troubles: [
        { problem: 'Docker로 띄우자 Spring이 MySQL에 연결 못 함', cause: '컨테이너 안의 localhost는 Spring 컨테이너 자신을 가리킴', fix: '컨테이너끼리는 서비스 이름과 컨테이너 포트(mysql:3306)로 통신' },
      ],
      gallery: [[oFlow, 'Spring Boot 처리 흐름'], [oArch, '아키텍처'], [oPorts, '포트 매핑 정리'], [oBranch, '브랜치 전략']],
      links: [],
      docs: '프로젝트 계획서, 화면 정의서, 테스트 계획서와 결과서',
    },
  },
  {
    id: 'mpago',
    title: 'mpago',
    slogan: ['push 한 번으로', '배포까지'],
    summary: '등산 커뮤니티 서비스. GitHub Actions 빌드와 AWS CodeDeploy 배포를 구성했습니다.',
    year: '2024',
    period: '2024',
    role: ['백엔드', '배포'],
    tools: ['Spring Boot 3', 'AWS', 'GitHub Actions', 'Nginx'],
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'AWS', 'GitHub Actions'],
    accent: '#14B8A6',
    gradient: ['#2DD4BF', '#0E9488', '#0B6B70'],
    glow: ['14, 148, 136', '45, 212, 191'],
    hero: { type: 'pipeline' },
    cardPoints: ['사용자·친구·채팅·산 정보·등산 계획 도메인', 'GitHub Actions → CodeDeploy 배포, Nginx·Cloudflare'],
    link: 'https://github.com/kymin9118/springboot',
  },
  {
    id: 'moving',
    title: 'Moving',
    summary: '쪽지와 커뮤니티를 더한 OTT 영화 사이트 (JSP/Servlet MVC, 조장)',
    year: '2024',
    role: ['조장', '웹'],
    tags: ['Java'],
    accent: '#F97316',
    cardPoints: ['게시판·댓글, 쪽지, 관리자 페이지', 'Notion·Figma·ERD Cloud로 협업 운영'],
    link: 'https://github.com/kymin9118/Movingprj',
  },
  {
    id: 'kymfinal',
    title: 'kymfinal',
    summary: 'TMAP 지도와 일정 관리를 합친 React 화면',
    year: '2024',
    role: ['프론트엔드'],
    tags: ['React'],
    accent: '#6366F1',
    cardPoints: ['MUI·Redux Toolkit 화면 구성', 'TMAP 지도, FullCalendar 스케줄러'],
    link: 'https://github.com/kymin9118/kymfinal',
  },
];

export const carouselProjects = projects.filter((p) => p.hero);
export const detailProjects = projects.filter((p) => p.detail);
export const findProject = (id) => projects.find((p) => p.id === id);
