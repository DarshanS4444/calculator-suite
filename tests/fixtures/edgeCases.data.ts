import { CalculationCase } from './types';

export const edgeCasesTestCases: CalculationCase[] = [
  {
    description: 'divide by zero: 10 ÷ 0 should handle gracefully',
    expression: '10/0',
  },
  {
    description: 'divide by zero: 5 ÷ 0 should handle gracefully',
    expression: '5/0',
  },
  {
    description: 'multiple decimal points: 1.2.3 should truncate to 1.2',
    expression: '1.2.3',
  },
  {
    description: 'multiple decimal points: 5.5.5 should truncate to 5.5',
    expression: '5.5.5',
  },
  {
    description: 'mismatched parentheses: (2 + 3 should handle gracefully',
    expression: '(2+3',
  },
  {
    description: 'mismatched parentheses: 2 + 3) should handle gracefully',
    expression: '2+3)',
  },
  {
    description: 'empty expression then equals should not crash',
    expression: '',
    expected: '',
  },
  {
    description: 'repeated equals: 5 + 5 = = should stay at 10',
    expression: '5+5',
  },
  {
    description: 'large number: 999999 + 1 should return 1000000',
    expression: '999999+1',
  },
  {
    description: 'long decimal: 0.123456789 + 0.1 should calculate correctly',
    expression: '0.123456789+0.1',
  },
  {
    description: 'zero operations: 0 + 0 should return 0',
    expression: '0+0',
  },
  {
    description: 'zero multiplication: 5 × 0 should return 0',
    expression: '5*0',
  },
  {
    description: 'negative number via subtraction: -5 (unary minus not supported)',
    expression: '0-5',
  },
  {
    description: 'complex expression: (10 + 5) × (3 − 1) should return 30',
    expression: '(10+5)*(3-1)',
  },
  {
    description: 'very small decimal: 0.0001 + 0.0001 should return 0.0002',
    expression: '0.0001+0.0001',
  },
];
