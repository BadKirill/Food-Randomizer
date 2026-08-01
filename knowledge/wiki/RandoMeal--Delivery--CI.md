# Continuous integration and test runners

GitHub Actions API, mobile, and live contract jobs plus local headless, background, and mobile headful runners.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Knowledge validation must run before expensive build and test jobs.
- CI validates local knowledge freshness and contracts without contacting Notion or gating pull requests on external Wiki freshness.
- API CI uses PostgreSQL 16 and applies current Prisma migrations before real E2E tests.
- Mobile CI runs Jest and TypeScript no-emit checks.
- The headless runner does not itself start the live API required by the contract smoke.

## Source coverage

- `.github/workflows/ci.yml` — 112 indexed sections: name, on, pull_request, branches, push, …. Sections: .github/workflows/ci.yml (L1–161); name (L1–2); on (L3–8); pull_request (L4–5); branches (L5–5); push (L6–8); branches (L7–8); jobs (L9–161)
- `scripts/run-mobile-headful.sh` — shell file run-mobile-headful.sh. Sections: scripts/run-mobile-headful.sh (L1–6)
- `scripts/run-tests-background.sh` — shell file run-tests-background.sh. Sections: scripts/run-tests-background.sh (L1–7)
- `scripts/run-tests-headless.sh` — shell file run-tests-headless.sh. Sections: scripts/run-tests-headless.sh (L1–8)
- `scripts/test-mobile-api-contract.mjs` — javascript file test-mobile-api-contract.mjs. Sections: scripts/test-mobile-api-contract.mjs (L1–98)

## Graph relations

- Depends on: [Workspace runtime and tooling](RandoMeal--Tooling--Workspace), [Knowledge system](RandoMeal--Governance--Knowledge-System)
- Related: [QA, security, and release gates](RandoMeal--Quality--QA-Strategy), [Production deployment and operations](RandoMeal--Infrastructure--Production)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`ci` · `github actions` · `test runner` · `coverage` · `pipeline` · `пайплайн`
