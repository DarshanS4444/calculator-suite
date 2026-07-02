import { Page, expect } from '@playwright/test';
import { CalculatorPage } from '../pages/calculator.page';
import { CalculationCase } from '../fixtures/types';

export class CalculatorBL {
  private page: CalculatorPage;

  constructor(page: Page) {
    this.page = new CalculatorPage(page);
  }

  async verifyAppLoads(): Promise<void> {
    await this.page.navigate();
    const displayValue = await this.page.getDisplayValue();
    expect(displayValue).toBe('');
  }

  async verifyAllDigitsCanBeEntered(): Promise<void> {
    for (let digit = 0; digit <= 9; digit++) {
      const digitStr = digit.toString();
      await this.page.clickClear();
      await this.page.clickDigit(digitStr);
      const displayValue = await this.page.getDisplayValue();
      expect(displayValue).toBe(digitStr);
    }
  }

  async verifyAllOperatorsCanBeEntered(): Promise<void> {
    const operators: ('+' | '-' | '*' | '/')[] = ['+', '-', '*', '/'];
    const operatorSymbols: Record<string, string> = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
    };

    for (const operator of operators) {
      await this.page.clickClear();
      await this.page.clickOperator(operator);
      const displayValue = await this.page.getDisplayValue();
      expect(displayValue).toBe(operatorSymbols[operator]);
    }

    await this.page.clickClear();
    const clearedDisplay = await this.page.getDisplayValue();
    expect(clearedDisplay).toBe('');
  }

  async verifyBasicAddition(num1: number, num2: number, expectedResult: number): Promise<void> {
    await this.page.clickClear();

    for (const digit of num1.toString()) {
      await this.page.clickDigit(digit);
    }

    await this.page.clickOperator('+');

    for (const digit of num2.toString()) {
      await this.page.clickDigit(digit);
    }

    await this.page.clickEquals();

    const displayValue = await this.page.getDisplayValue();
    expect(displayValue).toBe(expectedResult.toString());
  }

  async executeAndVerifyCalculationCase(testCase: CalculationCase): Promise<void> {
    let expectedResult: number;
    try {
      expectedResult = eval(testCase.expression);
    } catch (error) {
      throw new Error(
        `Invalid expression in test data: "${testCase.expression}". ` +
        `Reason: ${error instanceof Error ? error.message : String(error)}. ` +
        `Please recheck the fixture.`
      );
    }

    await this.page.clickClear();

    for (const char of testCase.expression) {
      if (char === '+' || char === '-' || char === '*' || char === '/') {
        await this.page.clickOperator(char as any);
      } else if (char === '(' || char === ')') {
        await this.page.clickParenthesis(char as any);
      } else if (char === '.') {
        await this.page.clickDigit('.');
      } else {
        await this.page.clickDigit(char);
      }
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    await this.page.clickEquals();

    const actualResult = await this.page.getDisplayValue();

    expect(parseFloat(actualResult)).toBeCloseTo(expectedResult, 5);
  }
}
