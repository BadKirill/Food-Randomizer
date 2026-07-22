# Workspace runtime and tooling

npm workspaces, pinned Node and npm policy, root and package scripts, TypeScript configuration, linting, lockfiles, and environment checks.

Status: **current**
Authority: **current-code**

## Rules and patterns

- Use Node 20.19.4 and npm 10.8.2 for reproducible local and CI behavior.
- Three lockfiles currently exist and require careful workspace dependency updates.
- Root typecheck currently builds only the API; mobile typecheck is a separate command.
- Do not add a new runtime dependency when a deterministic standard-library implementation is sufficient.

## Source coverage

- `.npmrc` — configuration file .npmrc. Sections: .npmrc (L1–2)
- `.nvmrc` — configuration file .nvmrc. Sections: .nvmrc (L1–2)
- `apps/api/eslint.config.mjs` — javascript file eslint.config.mjs. Sections: apps/api/eslint.config.mjs (L1–36)
- `apps/api/nest-cli.json` — 4 indexed sections: $schema, collection, sourceRoot, compilerOptions. Sections: apps/api/nest-cli.json (L1–9); $schema (L2–2); collection (L3–3); sourceRoot (L4–4); compilerOptions (L5–9)
- `apps/api/package-lock.json` — 5 indexed sections: name, version, lockfileVersion, requires, packages. Sections: apps/api/package-lock.json (L1–9251); name (L2–2); version (L3–3); lockfileVersion (L4–4); requires (L5–5); packages (L6–9251)
- `apps/api/package.json` — 10 indexed sections: name, version, description, author, private, …. Sections: apps/api/package.json (L1–98); name (L2–2); version (L3–3); description (L4–4); author (L5–5); private (L6–6); license (L7–7); scripts (L8–33)
- `apps/api/tsconfig.build.json` — 2 indexed sections: extends, exclude. Sections: apps/api/tsconfig.build.json (L1–5); extends (L2–2); exclude (L3–5)
- `apps/api/tsconfig.json` — 2 indexed sections: extends, compilerOptions. Sections: apps/api/tsconfig.json (L1–32); extends (L2–2); compilerOptions (L3–32)
- `apps/mobile/package-lock.json` — 5 indexed sections: name, version, lockfileVersion, requires, packages. Sections: apps/mobile/package-lock.json (L1–8101); name (L2–2); version (L3–3); lockfileVersion (L4–4); requires (L5–5); packages (L6–8101)
- `apps/mobile/package.json` — 7 indexed sections: name, version, main, scripts, dependencies, …. Sections: apps/mobile/package.json (L1–31); name (L2–2); version (L3–3); main (L4–4); scripts (L5–11); dependencies (L12–19); devDependencies (L20–28); private (L29–31)
- `apps/mobile/tsconfig.json` — 2 indexed sections: extends, compilerOptions. Sections: apps/mobile/tsconfig.json (L1–7); extends (L2–2); compilerOptions (L3–7)
- `package-lock.json` — 5 indexed sections: name, version, lockfileVersion, requires, packages. Sections: package-lock.json (L1–19357); name (L2–2); version (L3–3); lockfileVersion (L4–4); requires (L5–5); packages (L6–19357)
- `package.json` — 8 indexed sections: name, private, version, engines, packageManager, …. Sections: package.json (L1–55); name (L2–2); private (L3–3); version (L4–4); engines (L5–7); packageManager (L8–8); workspaces (L9–12); scripts (L13–48)
- `packages/contracts/package.json` — 7 indexed sections: name, version, private, main, types, …. Sections: packages/contracts/package.json (L1–14); name (L2–2); version (L3–3); private (L4–4); main (L5–5); types (L6–6); scripts (L7–9); dependencies (L10–14)
- `packages/contracts/tsconfig.json` — 3 indexed sections: extends, compilerOptions, include. Sections: packages/contracts/tsconfig.json (L1–15); extends (L2–2); compilerOptions (L3–12); include (L13–15)
- `scripts/check-env-files.sh` — shell file check-env-files.sh. Sections: scripts/check-env-files.sh (L1–19)
- `scripts/check-node-version.mjs` — javascript file check-node-version.mjs. Sections: scripts/check-node-version.mjs (L1–21)
- `tsconfig.base.json` — 1 indexed section: compilerOptions. Sections: tsconfig.base.json (L1–16); compilerOptions (L2–16)

## Graph relations

- Depends on: [Complete repository inventory](RandoMeal--Governance--Repository-Inventory)
- Related: [Continuous integration and test runners](RandoMeal--Delivery--CI), [Local runtime and environment](RandoMeal--Infrastructure--Local)
- Supersedes: none
- Superseded by: none

## Retrieval tags

`npm` · `workspace` · `node` · `typescript` · `package` · `tooling` · `инструменты`
