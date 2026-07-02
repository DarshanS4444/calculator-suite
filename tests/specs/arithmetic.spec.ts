import { test } from '@playwright/test';
import { CalculatorBL } from '../bl/calculator.bl';
import { arithmeticTestCases } from '../fixtures/arithmetic.data';

test.describe('Arithmetic Operations - Regression Tests', () => {
  let bl: CalculatorBL;

  test.beforeEach(async ({ page }) => {
    bl = new CalculatorBL(page);
    await bl.verifyAppLoads();
  });

  for (const testCase of arithmeticTestCases) {
    test(`${testCase.description}`, async () => {
      await bl.executeAndVerifyCalculationCase(testCase);
    });
  }
});
