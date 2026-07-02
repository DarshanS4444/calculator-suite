# Calculator Suite — E2E Test Automation

A comprehensive end-to-end test suite for a Scientific Calculator, built with **Playwright** and **TypeScript**. Validates core arithmetic, scientific functions, edge cases, and documents 11 defects discovered during testing.

## 📋 Overview

**Test Coverage:** 88 automated test cases across 4 spec files  
**Browsers Tested:** Chromium, Firefox, WebKit (cross-browser validation)  
**Test Results:** 15 passing (sanity tier), 73 expected failures (from 11 documented bugs)  
**Defects Found:** 11 critical, medium, and low-priority bugs with formal issue reports

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 7+

### Installation
```bash
npm install
npx playwright install --with-deps
```

### Run Tests

**Run all tests:**
```bash
npm test
```

**Run sanity (smoke) tests only:**
```bash
npm test -- tests/specs/sanity.spec.ts
```

**Run specific spec file:**
```bash
npm test -- tests/specs/arithmetic.spec.ts
```

**Run tests in headed mode (see browser):**
```bash
npm run test:headed
```

**Interactive UI mode (best for debugging):**
```bash
npm run test:ui
```

### View Test Reports

**Open latest report in browser:**
```bash
npm run test:report
```

This opens an interactive HTML report at `http://localhost:9323` showing:
- Test results summary
- Individual test details
- Screenshots of failures
- Error traces

**Save current report for submission:**
```bash
npm run test:archive-report
```

Creates a timestamped copy in `reports/archive/report-YYYYMMDD-HHMMSS/` that's not overwritten by future runs.

---

## 🏗️ Test Architecture

### Layered Design
Tests follow a strict 4-layer architecture with unidirectional dependencies:

```
specs/
  *.spec.ts          ← Thin test blocks, call BL only
         ↓
bl/
  *.bl.ts            ← Business logic + ALL assertions, calls POs + fixtures
       ↙     ↘
pages/      fixtures/
*.page.ts   *.data.ts
```

**Benefits:**
- Specs are readable as business scenarios
- All assertions centralized in one layer
- Page objects are dumb element wrappers
- Fixtures are pure data, no logic
- Easy to maintain and refactor

### Test Breakdown

| Spec File | Tests | Purpose | What It Validates |
|-----------|-------|---------|-------------------|
| `sanity.spec.ts` | 4 | Smoke tests | App loads, display empty, digits entry, operators work |
| `arithmetic.spec.ts` | 22 | Arithmetic ops | +, −, ×, ÷, decimals, precedence, parentheses, chained ops |
| `scientific-functions.spec.ts` | 39 | Scientific funcs | sin, cos, tan, sqrt, log (base 10) across multiple angles |
| `edge-cases.spec.ts` | 23 | Boundary cases | Divide-by-zero, mismatched parens, empty input, error state, negative sqrt/log |
| **Total** | **88** | | |

---

## 🐛 Defects Discovered

### Summary

**11 bugs found** across 3 severity levels:

| Priority | Count | Impact |
|----------|-------|--------|
| Blocker | 3 | Critical arithmetic failures |
| Critical | 2 | Scientific functions broken |
| Medium | 4 | Edge cases & error handling |
| Low | 2 | State/accessibility issues |

### Full Defect List

See [`docs/BUG-SUMMARY.md`](docs/BUG-SUMMARY.md) for detailed bug reports including:
- Steps to reproduce
- Expected vs. actual behavior
- Severity & impact
- Affected test cases

**Quick reference:**

- **BUG-001** (Blocker): Digit "3" cannot be entered
- **BUG-002** (Blocker): Subtract button performs division
- **BUG-003** (Blocker): Division result inverted
- **BUG-004** (Critical): sin() always returns 1
- **BUG-005** (Medium): sqrt(-x) should return NaN
- **BUG-006** (Medium): log() edge cases (0, negative values)
- **BUG-007** (Critical): Divide-by-zero returns raw Infinity
- **BUG-008** (Medium): Empty input + equals shows "undefined"
- **BUG-009** (Low): cos(90°) in radians returns wrong value
- **BUG-010** (Low): Display unreachable by keyboard, no ARIA labels
- **BUG-011** (Low–Medium): Error state not reset after digit entry

### Test-to-Bug Mapping

See [`docs/TEST-COVERAGE.md`](docs/TEST-COVERAGE.md) for detailed mapping showing:
- How many tests fail per bug
- Specific failing test cases
- Which spec files test each bug
- Coverage gaps (intentional exclusions)

**Summary:**
- 73 tests fail due to bugs (expected failures)
- 15 tests pass (sanity tier, no known bugs)
- Cross-bug dependencies tracked (e.g., BUG-001 affects multiple arithmetic tests)

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Automated workflow runs on every push to `main`:

**Workflow:** `.github/workflows/playwright.yml`

**Two parallel jobs:**
1. **Sanity Tests** — 4 smoke tests (must all pass ✅)
2. **Full Suite** — All 88 tests (expected failures from known bugs ✅)

**Artifacts:**
- HTML test reports uploaded after each run
- View in GitHub Actions → Artifacts tab
- Contains screenshots, traces, detailed test results

**How to trigger:**
- Push to `main` → workflow auto-runs
- Open Actions tab to watch progress
- First run takes ~2-3 minutes (Playwright downloads browsers)

---

## 📊 Test Results

### Latest Run
- **Sanity:** 4/4 passed ✅
- **Full Suite:** 15 passed, 73 expected failures (due to known bugs)
- **Cross-browser:** All results across Chromium, Firefox, WebKit

### Reports
- **Local:** `npm run test:report` opens HTML dashboard
- **CI:** GitHub Actions artifacts contain full reports
- **Archive:** `npm run test:archive-report` saves timestamped copy for submission

---

## 📁 Project Structure

```
calculator-suite/
├── tests/
│   ├── specs/                      # Test files (thin specs layer)
│   │   ├── sanity.spec.ts         # Smoke tests
│   │   ├── arithmetic.spec.ts     # Arithmetic ops
│   │   ├── scientific-functions.spec.ts  # Scientific functions
│   │   └── edge-cases.spec.ts     # Boundary/error cases
│   ├── bl/
│   │   └── calculator.bl.ts       # Business logic layer (assertions, orchestration)
│   ├── pages/
│   │   └── calculator.page.ts     # Page object model (selectors, atomic actions)
│   └── fixtures/
│       ├── types.ts               # TypeScript interfaces
│       ├── arithmetic.data.ts     # Arithmetic test data
│       ├── scientific.data.ts     # Scientific function test data
│       └── edgeCases.data.ts      # Edge case test data
├── docs/
│   ├── BUG-SUMMARY.md            # Detailed bug reports
│   └── TEST-COVERAGE.md          # Test-to-bug mapping & coverage analysis
├── reports/
│   ├── latest/                   # Current test report (regenerated on each run)
│   └── archive/                  # Saved timestamped reports
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD configuration
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # npm scripts & dependencies
└── README.md                      # This file
```

---

## 🛠️ Technologies

- **Playwright** (v1.47.0) — Cross-browser E2E automation
- **TypeScript** (v5.5.0) — Type-safe test code
- **Node.js** 18+ — Runtime
- **GitHub Actions** — CI/CD pipeline

---

## 📖 How to Run & Verify

### Local Development

1. **Install & setup:**
   ```bash
   npm install
   npx playwright install --with-deps
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **View results:**
   ```bash
   npm run test:report
   ```

4. **Debug a failing test:**
   ```bash
   npm run test:ui
   # Opens interactive UI to step through tests

   # Or run a single test with debugging:
   npm run test:debug -- tests/specs/arithmetic.spec.ts
   ```

### CI/CD Verification

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Monitor workflow:**
   - Go to GitHub repo → Actions tab
   - Click the latest run
   - Watch sanity & full-suite jobs
   - Download artifacts (HTML reports)

---

## ✅ Validation Checklist

This test suite validates:

- ✅ **Digit Entry** — All digits 0-9 can be entered
- ✅ **Basic Operations** — +, −, ×, ÷ work correctly
- ✅ **Operator Precedence** — Correct evaluation order
- ✅ **Parentheses** — Expression grouping works
- ✅ **Decimals** — Float input & output
- ✅ **Scientific Functions** — sin, cos, tan, sqrt, log (base 10)
- ✅ **Edge Cases** — Divide-by-zero, negative sqrt, log of invalid inputs
- ✅ **State Management** — Clear button, error recovery
- ✅ **Cross-browser** — Chromium, Firefox, WebKit compatibility
- ✅ **Accessibility** — Selectors by ARIA role (where available)

---

## 📝 Coverage Gaps & Out of Scope

Intentionally not tested:
- **BUG-010** — Keyboard accessibility (requires DOM modification, not a functional defect)
- Chained function calls (e.g., `sin(sqrt(4))`) — not typical user flow
- Very large exponents (e.g., `10^100`) — platform limitation
- Floating-point precision (e.g., `0.1 + 0.2 ≠ 0.3`) — JavaScript limitation
- Memory operations (M+, M-, MR, MC) — not implemented in calculator

---

## 🔗 Related Documentation

- [Detailed Bug Reports](docs/BUG-SUMMARY.md) — Each bug with reproduction steps
- [Test Coverage Analysis](docs/TEST-COVERAGE.md) — Bug-to-test mapping, coverage breakdown
- [Playwright Docs](https://playwright.dev/) — Framework reference

---

## 📧 Contact & Questions

For questions about the test suite, open an issue or review:
- Test implementation: `tests/specs/` and `tests/bl/`
- Bug findings: `docs/BUG-SUMMARY.md`
- Coverage details: `docs/TEST-COVERAGE.md`

---

**Last Updated:** 2026-07-03  
**Test Suite Version:** 1.0.0  
**Calculator Under Test:** https://rbihubcodechallenge.github.io/calculator/index.html
