import { test } from '@playwright/test';
import { CalculatorBL } from '../bl/calculator.bl';

test.describe('Sanity - Smoke Tests', () => {
  let bl: CalculatorBL;

  test.beforeEach(async ({ page }) => {
    bl = new CalculatorBL(page);
  });

  test('should load the calculator app with empty display', async () => {
    await bl.verifyAppLoads();
  });

  test('should allow entering a single digit', async () => {
    await bl.verifyAppLoads();
    await bl.verifyAllDigitsCanBeEntered();
  });

  test('should allow entering all operators and clear display', async () => {
    await bl.verifyAppLoads();
    await bl.verifyAllOperatorsCanBeEntered();
  });
  
  test('should perform basic addition', async () => {
    await bl.verifyAppLoads();
    await bl.verifyBasicAddition(2, 3, 5);
  });
});
