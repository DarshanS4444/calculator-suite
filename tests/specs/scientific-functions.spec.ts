import { test } from '@playwright/test';
import { CalculatorBL } from '../bl/calculator.bl';
import { scientificTestCases } from '../fixtures/scientific.data';

test.describe('Scientific Functions - Regression Tests', () => {
  let bl: CalculatorBL;

  test.beforeEach(async ({ page }) => {
    bl = new CalculatorBL(page);
    await bl.verifyAppLoads();
  });

  for (const testCase of scientificTestCases) {
    test(`${testCase.description}`, async () => {
      await bl.executeAndVerifyScientificCase(testCase);
    });
  }
});
