import { CalculationCase } from './types';

export const arithmeticTestCases: CalculationCase[] = [
  {
    description: 'addition: 2 + 3 should return 5',
    expression: '2+3',
  },
  {
    description: 'addition: 10 + 20 should return 30',
    expression: '10+20',
  },
  {
    description: 'multiplication: 4 × 5 should return 20',
    expression: '4*5',
  },
  {
    description: 'multiplication: 6 × 7 should return 42',
    expression: '6*7',
  },
  {
    description: 'division: 10 ÷ 2 should return 5',
    expression: '10/2',
  },
  {
    description: 'division: 20 ÷ 4 should return 5',
    expression: '20/4',
  },
  {
    description: 'subtraction: 10 − 5 should return 5',
    expression: '10-5',
  },
  {
    description: 'subtraction: 100 − 40 should return 60',
    expression: '100-40',
  },
  {
    description: 'decimal addition: 2.5 + 5.5 should return 8',
    expression: '2.5+5.5',
  },
  {
    description: 'decimal multiplication: 2.5 × 4 should return 10',
    expression: '2.5*4',
  },
  {
    description: 'decimal division: 7.5 ÷ 2.5 should return 3',
    expression: '7.5/2.5',
  },
  {
    description: 'chained operations: 1 + 2 + 4 should return 7',
    expression: '1+2+4',
  },
  {
    description: 'chained operations: 2 × 5 × 4 should return 40',
    expression: '2*5*4',
  },
  {
    description: 'operator precedence: 2 + 5 × 4 should return 22',
    expression: '2+5*4',
  },
  {
    description: 'operator precedence: 10 − 2 × 3 should return 4',
    expression: '10-2*3',
  },
  {
    description: 'parentheses: (2 + 2) × 4 should return 16',
    expression: '(2+2)*4',
  },
  {
    description: 'parentheses: 10 ÷ (2 + 3) should return 2',
    expression: '10/(2+3)',
  },
  {
    description: 'nested parentheses: ((2 + 2) × 4) × 2 should return 32',
    expression: '((2+2)*4)*2',
  },
  {
    description: 'decimal precision: 10 ÷ 7 should return 1.428571...',
    expression: '10/7',
  },
  {
    description: 'digit entry: 3 should display 3',
    expression: '3',
  },
  {
    description: 'digit entry: 30 + 3 should return 33',
    expression: '30+3',
  },
  {
    description: 'negative result: 5 − 10 should return -5',
    expression: '5-10',
  },
];
