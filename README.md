# 수목원

이수목이 스스로 공부한 개념과 실습 기록을 모아두는 개인 위키입니다.

이 저장소의 `main` 브랜치는 Docusaurus 문서 사이트 기준 브랜치입니다. 실습 코드는 `lab/*` 브랜치나 별도 worktree에서 실행하고, 검증된 내용만 문서로 옮깁니다.

## 로컬 문서 사이트

```bash
npm ci
npm run start
```

기본 개발 서버는 <http://localhost:3000/cs-study/>에서 열립니다.

## 공부 방식

- `main`: Docusaurus 문서 사이트, 학습 흐름, 정리된 기록
- `lab/{area}/{topic}`: 각 주제의 실습 코드, 예제, 실행 기록
- CS 실습 언어: Kotlin

## 추천 실습 흐름

문서 사이트를 켜둔 상태로 실습하려면 `git worktree`를 사용합니다.

```bash
git worktree add -b lab/cs/os-process ../cs-study-lab-cs-os-process main
```

실습이 끝나면 핵심 내용만 `main`의 `docs/` 아래에 문서로 반영합니다.

## 예상 주제

### CS

- 자료구조
- 알고리즘
- 운영체제
- 네트워크
- 데이터베이스
- 컴퓨터 구조

### AI

- 머신러닝
- 딥러닝
- LLM
- 프롬프트 엔지니어링

## 기록 규칙

- 문서는 결론, 이유, 재현 방법, 참고 코드 순서로 짧게 남깁니다.
- 실습 브랜치에는 주제별 README, 예제 코드, 풀이 또는 실험 기록을 함께 남깁니다.
- 실행해본 예제 중 다시 볼 가치가 있는 내용만 `main`으로 승격합니다.
