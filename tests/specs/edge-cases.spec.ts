import { test } from '@playwright/test';
import { CalculatorBL } from '../bl/calculator.bl';
import { edgeCasesTestCases } from '../fixtures/edgeCases.data';

test.describe('Edge Cases - Regression Tests', () => {
  let bl: CalculatorBL;

  test.beforeEach(async ({ page }) => {
    bl = new CalculatorBL(page);
    await bl.verifyAppLoads();
  });

  for (const testCase of edgeCasesTestCases) {
    test(`${testCase.description}`, async () => {
      await bl.executeAndVerifyCalculationCase(testCase);
    });
  }
});
