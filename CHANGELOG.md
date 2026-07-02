# Changelog

## 2026-07-02

### Added
- Task 3 delete and search: delete with confirmation, SearchBar, useMemo-filtered list, and empty-state messages

### Fixed
- useRef invalid hook call in TaskForm by aliasing react and react-dom to crud-app node_modules
- Blank page caused by duplicate React copies when dependencies resolved from parent node_modules

### Added
- Task 2 create/update flow: task form, inline edit, toggle complete, validation, and toast feedback
- Task 1 scaffold: mock tasks, task service, context, hooks, and task list UI

### Changed
- crud-app package.json now includes all runtime dependencies locally
- Vite config dedupes react and react-dom
- Task service now supports in-memory create and update for session persistence
