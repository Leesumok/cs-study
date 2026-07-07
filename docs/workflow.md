---
sidebar_position: 2
title: Workflow
---

# Workflow

문서 작성과 실습 실행을 분리하기 위해 `main`과 `lab/*` 브랜치를 함께 사용합니다.

## main 브랜치

`main`은 Docusaurus 문서 사이트의 기준 브랜치입니다.

```bash
git switch main
git pull
npm run start
```

## 실습 브랜치 만들기

문서 사이트를 켜둔 상태로 실습하려면 `git worktree`를 사용합니다.

```bash
cd /Users/leesumok/workspace/cs-study
git worktree add -b lab/cs/os-process ../cs-study-lab-cs-os-process main
```

이후 실습 브랜치 폴더에서 예제나 실험 코드를 작성하고 실행합니다.

```bash
cd /Users/leesumok/workspace/cs-study-lab-cs-os-process
```

## 정리 반영

실습이 끝나면 핵심 내용만 `main` 문서에 반영합니다.

```bash
cd /Users/leesumok/workspace/cs-study
git switch main
```

반영할 내용은 다음 기준으로 고릅니다.

- 개념 이해에 도움이 되는 결론
- 다시 실행할 수 있는 최소 예제
- 실수하기 쉬운 지점
- 참고할 만한 명령어와 출력 요약

## 브랜치 이름

```txt
lab/cs/data-structure-stack
lab/cs/os-process
lab/cs/network-http
lab/cs/db-index
lab/ai/ml-basics
lab/ai/llm-tokenization
```
