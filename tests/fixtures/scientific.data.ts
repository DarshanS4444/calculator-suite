import { CalculationCase } from './types';

export const scientificTestCases: CalculationCase[] = [
  {
    description: 'sin function: sin(0) should return 0',
    expression: 'sin(0)',
  },
  {
    description: 'sin function: sin(π/6) ≈ sin(0.5236) should return 0.5',
    expression: 'sin(0.5236)',
  },
  {
    description: 'sin function: sin(π/4) ≈ sin(0.7854) should return 0.707',
    expression: 'sin(0.7854)',
  },
  {
    description: 'sin function: sin(π/2) ≈ sin(1.5708) should return 1',
    expression: 'sin(1.5708)',
  },
  {
    description: 'sin function: sin(π) ≈ sin(3.14159) should return 0',
    expression: 'sin(3.14159)',
  },
  {
    description: 'sin function: sin(3π/2) ≈ sin(4.7124) should return -1',
    expression: 'sin(4.7124)',
  },
  {
    description: 'sin function: sin(-π/2) ≈ sin(-1.5708) should return -1',
    expression: 'sin(-1.5708)',
  },
  {
    description: 'sin function: sin(2π) ≈ sin(6.2832) should return 0',
    expression: 'sin(6.2832)',
  },
  {
    description: 'cos function: cos(0) should return 1',
    expression: 'cos(0)',
  },
  {
    description: 'cos function: cos(π/6) ≈ cos(0.5236) should return 0.866',
    expression: 'cos(0.5236)',
  },
  {
    description: 'cos function: cos(π/4) ≈ cos(0.7854) should return 0.707',
    expression: 'cos(0.7854)',
  },
  {
    description: 'cos function: cos(π/2) ≈ cos(1.5708) should return 0',
    expression: 'cos(1.5708)',
  },
  {
    description: 'cos function: cos(π) ≈ cos(3.14159) should return -1',
    expression: 'cos(3.14159)',
  },
  {
    description: 'cos function: cos(3π/2) ≈ cos(4.7124) should return 0',
    expression: 'cos(4.7124)',
  },
  {
    description: 'cos function: cos(-π) ≈ cos(-3.14159) should return -1',
    expression: 'cos(-3.14159)',
  },
  {
    description: 'cos function: cos(2π) ≈ cos(6.2832) should return 1',
    expression: 'cos(6.2832)',
  },
  {
    description: 'tan function: tan(0) should return 0',
    expression: 'tan(0)',
  },
  {
    description: 'tan function: tan(π/6) ≈ tan(0.5236) should return 0.577',
    expression: 'tan(0.5236)',
  },
  {
    description: 'tan function: tan(π/4) ≈ tan(0.7854) should return 1',
    expression: 'tan(0.7854)',
  },
  {
    description: 'tan function: tan(π/3) ≈ tan(1.0472) should return 1.732',
    expression: 'tan(1.0472)',
  },
  {
    description: 'tan function: tan(-π/4) ≈ tan(-0.7854) should return -1',
    expression: 'tan(-0.7854)',
  },
  {
    description: 'sqrt function: sqrt(1) should return 1',
    expression: 'sqrt(1)',
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
    description: 'sqrt function: sqrt(25) should return 5',
    expression: 'sqrt(25)',
  },
  {
    description: 'sqrt function: sqrt(2) should return 1.414',
    expression: 'sqrt(2)',
  },
  {
    description: 'sqrt function: sqrt(5) should return 2.236',
    expression: 'sqrt(5)',
  },
  {
    description: 'sqrt function: sqrt(0.5) should return 0.707',
    expression: 'sqrt(0.5)',
  },
  {
    description: 'sqrt function: sqrt(0.25) should return 0.5',
    expression: 'sqrt(0.25)',
  },
  {
    description: 'log function (base 10): log(1) should return 0',
    expression: 'log(1)',
  },
  {
    description: 'log function (base 10): log(2) should return 0.301 [calculator uses log base 10, not natural log]',
    expression: 'log(2)',
  },
  {
    description: 'log function (base 10): log(5) should return 0.699 [calculator uses log base 10, not natural log]',
    expression: 'log(5)',
  },
  {
    description: 'log function (base 10): log(10) should return 1',
    expression: 'log(10)',
  },
  {
    description: 'log function (base 10): log(100) should return 2',
    expression: 'log(100)',
  },
  {
    description: 'log function (base 10): log(1000) should return 3',
    expression: 'log(1000)',
  },
  {
    description: 'log function (base 10): log(0.1) should return -1',
    expression: 'log(0.1)',
  },
  {
    description: 'log function (base 10): log(0.01) should return -2',
    expression: 'log(0.01)',
  },
  {
    description: 'sqrt function edge case: sqrt(-4) should return NaN',
    expression: 'sqrt(-4)',
  },
  {
    description: 'sqrt function edge case: sqrt(-1) should return NaN',
    expression: 'sqrt(-1)',
  },
  {
    description: 'log function edge case: log(0) should return -Infinity [base 10]',
    expression: 'log(0)',
  },
  {
    description: 'log function edge case: log(-1) should return NaN [base 10, cannot log negative]',
    expression: 'log(-1)',
  },
  {
    description: 'log function edge case: log(-10) should return NaN [base 10, cannot log negative]',
    expression: 'log(-10)',
  },
];
