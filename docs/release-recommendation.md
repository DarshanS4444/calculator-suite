# Release Recommendation — QA Sign-Off

**Date:** 2026-07-03  
**Assessed Version:** HEAD (latest commit)  
**Test Coverage:** 88 automated test cases + manual exploratory testing  
**Defects Logged:** 15 (3 Blocker, 2 Critical, 6 Medium, 4 Low)

---

## VERDICT **

This calculator is **not production-ready**. Three blocker-severity defects make core arithmetic unreliable, and two critical defects break scientific functions entirely.

---

## Critical Blockers — Ship-Stoppers

| Bug | Impact | Why It's a Blocker |
|-----|--------|-------------------|
| **BUG-001** | Digit "3" → "0" | Any calculation containing digit 3 fails silently. Core functionality broken. |
| **BUG-002** | Minus → division | Subtraction is completely unreachable. Users cannot subtract. |
| **BUG-003** | Division reversed | Every division returns the reciprocal. 9÷3 = 0.333 instead of 3. |

**Combined impact:** Basic arithmetic (addition, multiplication) works, but subtraction and division are broken. Users cannot trust results.

---

## Critical Issues — Must Fix Before Re-Review

| Bug | Severity | Impact |
|-----|----------|--------|
| **BUG-004** | Critical | sin() always returns 1 — scientific functions unusable |
| **BUG-007** | Critical | Division by zero not handled — no error feedback |
| **BUG-013** | Medium | Display never clears after "=" — forces manual Clear between every calculation |
| **BUG-014** | Medium | Parser silently drops malformed input — users get wrong results without knowing why |
| **BUG-015** | Medium | Malformed expressions show raw "NaN" instead of error — confusing to users |

---

## Defect Breakdown

```
Blockers (3):     BUG-001, BUG-002, BUG-003
  → Make core arithmetic unreliable

Critical (2):     BUG-004, BUG-007
  → Break scientific functions and error handling

Medium (6):       BUG-005, BUG-006, BUG-008, BUG-013, BUG-014, BUG-015
  → Edge cases, display state, parser validation

Low (4):          BUG-009, BUG-010, BUG-011, BUG-012
  → UX/accessibility gaps, nice-to-have fixes
```

---

## Prerequisites for Re-Review

Before requesting QA re-review, the team must:

### Must-Fix (gates re-review):
- [ ] **BUG-001** — Fix digit "3" wiring in button onclick handler
- [ ] **BUG-002** — Fix minus button wiring (currently calls `/` instead of `-`)
- [ ] **BUG-003** — Fix division operand order in parser (`left ÷ right`, not `right ÷ left`)
- [ ] **BUG-004** — Replace hardcoded `sin()` with actual `Math.sin()` call
- [ ] **BUG-007** — Add explicit zero-check before division (throw error or return "Infinity")
- [ ] **BUG-013** — Clear display after "=" (auto-reset for next calculation)

### Should-Fix (before beta/GA):
- [ ] **BUG-014** — Validate full expression consumption; raise error on trailing/malformed characters
- [ ] **BUG-015** — Check result for `NaN`/`Infinity` after evaluation; show "Error" instead
- [ ] **BUG-005, BUG-006** — Validate function results before displaying (catch NaN/-Infinity)
- [ ] **BUG-008** — Handle empty expression (return `0` or stay blank, not "undefined")

### Nice-to-Have (post-GA):
- [ ] **BUG-012** — Add backspace/delete-one-char button
- [ ] **BUG-009** — Add degree/radian mode toggle with indicator
- [ ] **BUG-010** — Enable keyboard input (numbers, operators, Enter, Escape)
- [ ] **BUG-011** — Auto-clear display on any input after an error state

---

## Test Evidence

**Automation Coverage:** 88 test cases across 4 spec files validate:
- ✅ Sanity tier (4 tests) — all passing
- ⚠️ Regression tier (84 tests) — 73 expected failures (from bugs), 11 edge cases
- ✅ Cross-browser (Chromium, Firefox, WebKit) — all browsers affected equally

**Manual Testing:** Exploratory testing confirmed:
- BUG-013 in action (display concatenation after "=")
- BUG-014 in action (malformed input silently parsed)
- BUG-001, 002, 003 reproducible in every attempt

**CI/CD:** GitHub Actions pipeline running successfully on every commit
- Sanity jobs
- Full suite: 15 pass, 73 expected failures
- Report artifacts: available for download

---

## Risk Assessment

**If shipped as-is:**
- 🔴 **User Trust:** 0/10 — Users will report "calculator gives wrong answers"
- 🔴 **Reliability:** 0/10 — Core operations (subtraction, division) completely broken
- 🟡 **Usability:** 3/10 — Only addition and multiplication work; scientific functions broken
- 🔴 **Support Cost:** High — Every user trying to subtract will file a bug

**Business Impact:** Release would damage credibility and require emergency patch within hours.

---

## QA Recommendation

**Do not release.** The three blocker-severity defects alone make this unsuitable for any production or beta environment. The team should:

1. **Fix the blockers** (BUG-001, 002, 003) — estimated 1-2 hours
2. **Fix the critical issues** (BUG-004, 007) — estimated 30 mins
3. **Stabilize display state** (BUG-013) — estimated 15 mins
4. **Run regression suite** — automated tests will flip from red to green
5. **Request re-review** — QA will close sign-off once blockers are resolved

**Expected timeline to release-ready:** 2-3 hours from now.

---

## Approvals

| Role | Status | Notes |
|------|--------|-------|
| **QA Lead** | ❌ DO NOT SHIP | 15 defects logged, 5 must-fix before re-review |
| **Blocker Severity** | 🔴 3 blocking | Core arithmetic unreliable |
| **Test Coverage** | ✅ Adequate | 88 tests, cross-browser, automated CI/CD |

---

**Prepared by:** QA Automation Team  
**Test Suite:** `calculator-suite` v1.0.0  
**Repository:** GitHub (with full commit history and test reports)
