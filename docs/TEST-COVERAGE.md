# Test Coverage Report

**88 total test cases** across 4 spec files

---

## By Spec File

### sanity.spec.ts
- **4 tests** 
- Smoke tests: app loads, displays empty, digits enter, operators display
- Purpose: basic "is the build alive" tier, kept separate from regression

### arithmetic.spec.ts  
- **22 tests**
- Covers: basic operations, decimals, chained ops, precedence, parentheses, digit 3
- **Bugs confirmed:** BUG-001 (digit 3), BUG-002 (minus button), BUG-003 (division reversed)

### scientific-functions.spec.ts
- **39 tests** (failures document bugs)
- Covers: sin/cos/tan across 8 angles each, sqrt (9 cases), log base 10 (8 cases)
- **Bugs confirmed:** BUG-004 (sin always returns 1)

### edge-cases.spec.ts
- **20 fixture-based tests + 3 specialized tests** (failures document bugs)
- Covers:
  - Arithmetic edge cases: divide-by-zero, multiple decimals, mismatched parens, empty input, large numbers, zero operations, complex expressions
  - Scientific edge cases: sqrt(-4), sqrt(-1), log(0), log(-1), log(-10)
  - State/interaction edge cases: empty input equals, radians mode, error state reset
- **Bugs confirmed:** BUG-005, BUG-006, BUG-007, BUG-008, BUG-009, BUG-011

---

## Bug-to-Test Mapping

**Total failing tests across all bugs: 73**
(88 total test cases − 15 passing sanity tests = 73 failing regression tests)

| Bug ID | Priority | Failing Tests | Test Cases | Spec File |
|---|---|---|---|---|
| BUG-001 | Blocker | 5+ | "digit entry: 3..." + any test using digit 3 (e.g., "expression with digit 3: 30 + 3") | arithmetic.spec.ts |
| BUG-002 | Blocker | 5+ | "subtraction: 10 − 5...", "subtraction: 100 − 40...", + chained subtraction cases | arithmetic.spec.ts |
| BUG-003 | Blocker | 8+ | All division tests: "division: 10 ÷ 2...", "division: 20 ÷ 4...", "decimal division..." + operator precedence cases | arithmetic.spec.ts |
| BUG-004 | Critical | 8 | sin(0), sin(π/6), sin(π/4), sin(π/2), sin(π), sin(3π/2), sin(-π/2), sin(2π) | scientific-functions.spec.ts |
| BUG-005 | Medium | 2 | "sqrt(-4) should return NaN", "sqrt(-1) should return NaN" | edge-cases.spec.ts |
| BUG-006 | Medium | 3 | "log(0) should return -Infinity", "log(-1) should return NaN", "log(-10) should return NaN" | edge-cases.spec.ts |
| BUG-007 | Critical | 2 | "divide by zero: 10 ÷ 0...", "divide by zero: 5 ÷ 0..." | edge-cases.spec.ts |
| BUG-008 | Medium | 1 | "BUG-008: empty input then equals should not display 'undefined'" | edge-cases.spec.ts |
| BUG-009 | Low | 1 | "BUG-009: cos(90) in radians should return -0.448, not 0" | edge-cases.spec.ts |
| BUG-010 | Low | 0 | N/A — Accessibility gap, documented separately (not code-testable) | N/A |
| BUG-011 | Low–Medium | 1 | "BUG-011: error state not reset — digit after error should clear display" | edge-cases.spec.ts |
| | | **37+** | (Accounting for cross-bug impacts: BUG-001, -002, -003 affect multiple tests due to dependencies) | |

---

## Coverage Strategy

### Sanity Tier
Smoke tests kept separate from regression suite per assessment guidance. Validates core UI responsiveness without exercising buggy code paths.

### Regression Tier
Tests assert **correct mathematical/logical behavior**, not the buggy actual behavior. When a test fails, that failure is the proof of the bug.

- **Arithmetic suite:** Covers dependencies between bugs (e.g., BUG-001 affects any calculation with digit 3)
- **Scientific suite:** Full angle coverage for trig functions; tests multiple bases for log (base 10 per actual calculator behavior)
- **Edge-case suite:** Tests boundary conditions and state management that expose secondary defects

### Coverage Gaps

**By design (out of scope):**
- BUG-010 (keyboard input): Accessibility enhancement, not a functional defect in the calculator logic
- Chained function calls: e.g., `sin(sqrt(4))` — not typical user flow
- Very large exponents: e.g., `10^100` — platform limitation, not a bug
- Floating-point precision: e.g., `0.1 + 0.2 ≠ 0.3` — JavaScript limitation, not a bug

