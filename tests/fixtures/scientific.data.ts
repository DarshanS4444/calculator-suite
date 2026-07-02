import { CalculationCase } from './types';

export const scientificTestCases: CalculationCase[] = [
  {
    description: 'sin function: sin(0) should return 0',
    expression: 'sin(0)',
  },
  {
    description: 'sin function: sin(1.5708) should return 1',
    expression: 'sin(1.5708)',
  },
  {
    description: 'cos function: cos(0) should return 1',
    expression: 'cos(0)',
  },
  {
    description: 'cos function: cos(3.14159) should return -1',
    expression: 'cos(3.14159)',
  },
  {
    description: 'tan function: tan(0) should return 0',
    expression: 'tan(0)',
  },
  {
    description: 'tan function: tan(0.7854) should return 1',
    expression: 'tan(0.7854)',
  },
  {
    description: 'sqrt function: sqrt(4) should return 2',
    expression: 'sqrt(4)',
  },
  {
    description: 'sqrt function: sqrt(9) should return 3',
    expression: 'sqrt(9)',
  },
  {
    description: 'sqrt function: sqrt(16) should return 4',
    expression: 'sqrt(16)',
  },
  {
    description: 'sqrt function: sqrt(2) should return 1.414',
    expression: 'sqrt(2)',
  },
  {
    description: 'log function: log(1) should return 0',
    expression: 'log(1)',
  },
  {
    description: 'log function: log(10) should return 1',
    expression: 'log(10)',
  },
  {
    description: 'log function: log(100) should return 2',
    expression: 'log(100)',
  },
  {
    description: 'sqrt function edge case: sqrt(-4) should return NaN or Error',
    expression: 'sqrt(-4)',
  },
  {
    description: 'log function edge case: log(0) should return -Infinity or Error',
    expression: 'log(0)',
  },
];
