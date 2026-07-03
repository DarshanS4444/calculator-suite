# Bug Summary — Scientific Calculator

Consolidated defect log for `https://rbihubcodechallenge.github.io/calculator/index.html`.

Individual detailed reports (root cause, test references, suggested fix) are in the `bug-reports/` folder,
one file per bug ID. This document is the scannable, at-a-glance version.

**Total defects: 15** (3 Blocker · 2 Critical · 6 Medium · 4 Low)

---

## BUG-001 — Digit button "3" enters "0" instead of "3"
**Priority:** Blocker

**Description:** Clicking the button labeled "3" appends the character "0" to the display instead of "3". A core digit key is silently wired to the wrong value.

**Steps to reproduce:**
1. Open the calculator.
2. Click the button labeled **3**.
3. Observe the display.

**Expected:** Display shows `3`.
**Actual:** Display shows `0`.

---

## BUG-002 — "−" (minus) button performs division instead of subtraction
**Priority:** Blocker

**Description:** The subtract button is wired to append the division symbol (`/`) instead of the minus symbol (`-`). Subtraction is unreachable from the UI entirely.

**Steps to reproduce:**
1. Open the calculator.
2. Click `9` → `−` → `3` → `=`.
3. Observe the display.

**Expected:** Display shows `6` (9 − 3).
**Actual:** A division is performed instead (operands also reversed per BUG-003).

---

## BUG-003 — Division computes divisor ÷ dividend (operands reversed)
**Priority:** Blocker

**Description:** The expression parser swaps operands for division only — it computes `right ÷ left` instead of `left ÷ right`. Every division on the calculator returns the reciprocal of the correct answer, with no error or indication anything is wrong.

**Steps to reproduce:**
1. Open the calculator.
2. Click `9` → `÷` → `3` → `=`.
3. Observe the display.

**Expected:** Display shows `3` (9 ÷ 3).
**Actual:** Display shows `0.3333333333333333` (i.e., it computed 3 ÷ 9).

---

## BUG-004 — sin() always returns 1, regardless of input
**Priority:** Critical

**Description:** The `sin` function is hardcoded to display `1` for any input instead of calling `Math.sin()`. Every other trig/log/root function correctly calls its matching Math method — sin is the sole exception.

**Steps to reproduce:**
1. Open the calculator.
2. Click `0` → `sin`.
3. Repeat with any other value (e.g. `30`, `90`).

**Expected:** `sin(0)` = `0`; result varies by input.
**Actual:** Display always shows `1`, for every input tested.

---

## BUG-005 — √ of a negative number shows "NaN" instead of a handled error
**Priority:** Medium

**Description:** `func()` validates input before computing but never re-checks the result. `Math.sqrt(-9)` returns `NaN`, and that raw value gets displayed instead of a handled "Error".

**Steps to reproduce:**
1. Open the calculator.
2. Enter a negative number (requires workaround due to BUG-002).
3. Click `√`.

**Expected:** Display shows a handled error state, e.g. `Error`.
**Actual:** Display shows `NaN`.

---

## BUG-006 — log() of zero/negative shows "-Infinity"/"NaN" instead of a handled error
**Priority:** Medium

**Description:** Same root cause as BUG-005 — the result of `Math.log10()` is never validated before being displayed.

**Steps to reproduce:**
1. Open the calculator.
2. Click `0` → `log`.
3. Separately, enter a negative number and click `log`.

**Expected:** Both cases show a handled error state, e.g. `Error`.
**Actual:** `log(0)` shows `-Infinity`; `log(-5)` shows `NaN`.

---

## BUG-007 — Division by zero is not handled
**Priority:** Critical

**Description:** Dividing by zero does not throw an error or show "Infinity" — it silently resolves to a plain number. This is a side effect of BUG-003 (5 ÷ 0 is actually evaluated as 0 ÷ 5), but is filed separately because it needs its own explicit zero-check fix.

**Steps to reproduce:**
1. Open the calculator.
2. Click `5` → `÷` → `0` → `=`.
3. Observe the display.

**Expected:** A handled error state (e.g. `Error`) or clearly-labeled `Infinity`.
**Actual:** Display shows `0` (due to operand reversal).

---

## BUG-008 — "=" on an empty display shows the literal string "undefined"
**Priority:** Medium

**Description:** `evaluateExpression('')` returns JavaScript's `undefined`, which gets assigned straight to `display.value`. Setting an input's value to `undefined` coerces it to the string "undefined", so it renders on screen.

**Steps to reproduce:**
1. Open the calculator (display is blank by default).
2. Click `=` without entering anything.
3. Observe the display.

**Expected:** Display stays blank, or shows a handled `0` or `Error`.
**Actual:** Display shows the text `undefined`.

---

## BUG-009 — Trig functions use radians with no mode indicator
**Priority:** Low (product/UX question)

**Description:** `cos`/`sin`/`tan` pass the raw input straight into JavaScript's `Math` functions, which expect radians. There's no mode toggle or unit label, so a user entering an angle in degrees gets a result that looks wrong.

**Steps to reproduce:**
1. Open the calculator.
2. Click `9` → `0` → `cos`.
3. Observe the display.

**Expected:** Ambiguous without a spec, but most users expect `cos(90°) ≈ 0`.
**Actual:** Display shows ≈ `-0.448` (90 treated as radians, not degrees).

---

## BUG-010 — No keyboard input support
**Priority:** Low

**Description:** The display is a `disabled` `<input>` with no keydown listeners anywhere on the page. The calculator only responds to mouse/touch clicks.

**Steps to reproduce:**
1. Open the calculator.
2. Try typing a digit or pressing `Enter` on the keyboard.
3. Observe that nothing happens.

**Expected:** Standard convention — digits, operators, `Enter` (=), `Escape`/`Backspace` (clear) should work.
**Actual:** No response to any keyboard input.

---

## BUG-011 — No state reset after "Error"
**Priority:** Low (subsumed by BUG-013)

**Description:** Once the display shows "Error", pressing any digit appends onto it (e.g. "Error5") instead of clearing first. This is a specific manifestation of BUG-013 — the display never clears after any result, error or success.

**Steps to reproduce:**
1. Open the calculator.
2. Click `cos` with a blank display → display shows `Error`.
3. Click `5`.
4. Observe the display.

**Expected:** Display either ignores new input or auto-clears and shows `5`.
**Actual:** Display shows `Error5`.

---

## BUG-012 — No backspace/single-character delete
**Priority:** Low

**Description:** The calculator provides only a full "Clear" button (C). There is no backspace or delete-one-character button, making it impossible to correct a single mistyped digit without clearing the entire entry.

**Steps to reproduce:**
1. Open the calculator.
2. Enter `1234`.
3. Try to delete just the `4` without clearing all digits.
4. Observe available buttons.

**Expected:** A backspace or delete button exists to remove one character at a time.
**Actual:** Only the `C` (Clear All) button is available.

---

## BUG-013 — Display never clears after "=" — next input appends onto the previous result
**Priority:** Medium

**Description:** After clicking "=" to complete a calculation, the display retains the result. Any new digit or operator clicked then concatenates onto the old result instead of starting fresh. This is the root cause of unexpected calculation results and makes the calculator unusable for consecutive calculations without manually pressing Clear each time.

**Steps to reproduce:**
1. Open the calculator.
2. Click `5` → `+` → `3` → `=` (display shows `8`).
3. Click `2` (without pressing `C` first).
4. Click `=`.
5. Observe the display.

**Expected:** After step 3, display shows `2` (new entry started fresh).
**Actual:** Display shows `82`, and evaluating produces an unexpected result because the old result was concatenated with new input.

---

## BUG-014 — Parser doesn't validate full expression consumption; trailing/malformed characters are silently dropped
**Priority:** Medium

**Description:** The expression parser stops consuming input as soon as it hits an unrecognized token or operator mismatch, then silently discards everything after it instead of raising an error. This makes it impossible to detect typos or incomplete expressions.

**Steps to reproduce:**
1. Open the calculator.
2. Enter `5.069` → `/` → `5` → `*` → `6` → `+` → `9` → `)` (mismatched closing paren).
3. Click `=`.
4. Observe the display.

**Expected:** Display shows `Error` (unmatched parenthesis).
**Actual:** Display evaluates the valid part (`5.069/5*6+9 = 14.918...`) and silently drops the trailing `)`.

---

## BUG-015 — Malformed expressions silently show raw "NaN" instead of "Error"
**Priority:** Medium

**Description:** The calculator catches exceptions during evaluation but doesn't validate whether the result is `NaN` or `Infinity` — these raw JavaScript values are displayed to the user instead of a handled error message. This also allows incomplete expressions (e.g., `5+` without a second operand) to silently evaluate and return `NaN`.

**Steps to reproduce:**
1. Open the calculator.
2. Enter `5` → `.` → `=` (incomplete decimal).
3. Observe the display.
4. Separately, enter `5` → `+` → `+` (double operator) → `3` → `=`.
5. Observe the display.

**Expected:** Both cases display `Error` or a handled error message.
**Actual:** Both display `NaN`.

---

## Priority Summary

| Priority | Bug IDs | Count |
|---|---|---|
| Blocker | BUG-001, BUG-002, BUG-003 | 3 |
| Critical | BUG-004, BUG-007 | 2 |
| Medium | BUG-005, BUG-006, BUG-008, BUG-013, BUG-014, BUG-015 | 6 |
| Low | BUG-009, BUG-010, BUG-011, BUG-012 | 4 |
| **Total** | | **15** |
