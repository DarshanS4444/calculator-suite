import { Page } from '@playwright/test';

export class CalculatorPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('index.html');
  }

  async getDisplayValue(): Promise<string> {
    return this.page.locator('#display').inputValue();
  }

  async clickDigit(digit: string): Promise<void> {
    const buttonText = digit === '.' ? '.' : digit;
    await this.page.getByRole('button', { name: buttonText, exact: true }).click();
  }

  async clickOperator(operator: '+' | '-' | '*' | '/'): Promise<void> {
    const operatorMap: Record<string, string> = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
    };
    const displayText = operatorMap[operator];
    await this.page.getByRole('button', { name: displayText, exact: true }).click();
  }

  async clickFunction(fn: 'sin' | 'cos' | 'tan' | 'sqrt' | 'log'): Promise<void> {
    await this.page.getByRole('button', { name: fn, exact: true }).click();
  }

  async clickEquals(): Promise<void> {
    await this.page.getByRole('button', { name: '=', exact: true }).click();
  }

  async clickClear(): Promise<void> {
    await this.page.getByRole('button', { name: 'C', exact: true }).click();
  }

  async clickParenthesis(paren: '(' | ')'): Promise<void> {
    await this.page.getByRole('button', { name: paren, exact: true }).click();
  }
}
