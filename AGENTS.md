# Repository Guidelines

## Documentation Numbering

CS 문서는 번호 기반 구조를 사용한다.

- `CS` 바로 하위의 큰 묶음은 두 자리 번호를 붙인다.
  - 예: `01. CDN 개념 및 심화`, `02. 운영체제`, `03. 네트워크`
- 큰 묶음 하위 문서는 `{groupNumber}-{pageNumber}` 형식으로 번호를 붙인다.
  - 예: `1-1. CDN이란? CDN 작동`, `1-2. 동적 API와 CDN`
  - `02` 묶음의 하위 문서는 `2-1`, `2-2`처럼 쓴다.
- 파일 경로도 같은 번호 체계를 반영한다.
  - 예: `docs/cs/01-cdn/1-1-intro-and-flow.md`
  - 예: `docs/cs/01-cdn/1-2-dynamic-api.md`
- Docusaurus 사이드바는 명시적으로 관리한다.
  - 카테고리 `label`에는 `01. ...` 형식을 쓴다.
  - 문서 frontmatter `title`에는 `1-1. ...` 형식을 쓴다.
  - Docusaurus는 `01-cdn` 같은 숫자 디렉터리 prefix를 문서 ID에서 제거한다. 파일이 `docs/cs/01-cdn/1-1-intro-and-flow.md`여도 sidebar id는 `cs/cdn/1-1-intro-and-flow`가 된다.
- 사이드바 펼침 기본값은 `CS` 같은 대분류는 `collapsed: false`, `01. ...` 같은 중간분류는 `collapsed: true`로 둔다.
- 새 문서는 frontmatter에 `created_at: YYYY-MM-DD`를 적는다. 사이드바 helper가 이 값을 읽어 생성 후 14일 동안 `NEW` 배지를 표시한다.
- 사이드바에는 문서 제목 검색을 제공한다. 검색은 현재 사이드바의 카테고리/문서 라벨을 부분 문자열로 필터링한다.
- PDF나 기타 산출물도 가능하면 문서 번호와 같은 제목 체계를 따른다.

## Study Workflow

- `main`은 정리된 문서와 사이트 설정을 유지한다.
- 실습 코드는 `lab/{area}/{topic}` 브랜치 또는 worktree에서 진행한다.
- 실습 후 검증된 내용만 `main`의 `docs/`로 옮긴다.
