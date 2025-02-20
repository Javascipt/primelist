import { Primes } from '../src/Primes';
import { FakeMap } from './utils/FakeMap';
import { Map } from '../src/Map';

describe('Primes', () => {
  const chunks: number[][] = [
    [2, 3, 5, 7],
    [11, 13, 17, 19],
    [23, 29, 31, 37]
  ];

  let primes: Primes;

  beforeEach(() => {
    const fakeMap = new FakeMap(chunks);
    primes = new Primes(fakeMap as unknown as Map);
  });

  test('isPrime returns true for a prime and false for a non-prime', () => {
    expect(primes.isPrime(3)).toBe(true);
    expect(primes.isPrime(4)).toBe(false);
  });

  test('getNthPrime returns correct primes', () => {
    // Ordered list: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
    expect(primes.getNthPrime(1)).toBe(2);
    expect(primes.getNthPrime(4)).toBe(7);
    expect(primes.getNthPrime(5)).toBe(11);
    expect(primes.getNthPrime(8)).toBe(19);
    expect(primes.getNthPrime(9)).toBe(23);
    expect(primes.getNthPrime(12)).toBe(37);
  });

  test('primesInRange returns all primes within the inclusive range', () => {
    expect(primes.primesInRange(4, 20)).toEqual([5, 7, 11, 13, 17, 19]);
  });

  test('getNextPrime returns the first prime greater than n', () => {
    expect(primes.getNextPrime(7)).toBe(11);
    expect(primes.getNextPrime(15)).toBe(17);
  });

  test('getPrevPrime returns the first prime less than n', () => {
    expect(primes.getPrevPrime(11)).toBe(7);
    expect(primes.getPrevPrime(13)).toBe(11);
  });

  test('getNextNPrimes returns the next n primes', () => {
    expect(primes.getNextNPrimes(7, 3)).toEqual([11, 13, 17]);
  });

  test('getPrevNPrimes returns the previous n primes', () => {
    expect(primes.getPrevNPrimes(23, 3)).toEqual([13, 17, 19]);
  });

  test('getNthPrime throws an error for invalid n', () => {
    expect(() => primes.getNthPrime(0)).toThrow("n must be >= 1");
    expect(() => primes.getNthPrime(13)).toThrow("n exceeds total number of primes available");
  });

  test('getNextPrime throws an error if no next prime is found', () => {
    expect(() => primes.getNextPrime(37)).toThrow("No next prime found");
  });

  test('getPrevPrime throws an error if no previous prime is found', () => {
    expect(() => primes.getPrevPrime(2)).toThrow("No previous prime found");
  });

  test('getPrimeIndex returns correct 1-indexed prime positions', () => {
    // chunk0: [2, 3, 5, 7] -> positions 1,2,3,4
    // chunk1: [11, 13, 17, 19] -> positions 5,6,7,8
    // chunk2: [23, 29, 31, 37] -> positions 9,10,11,12
    expect(primes.getPrimeIndex(2)).toBe(1);
    expect(primes.getPrimeIndex(7)).toBe(4);
    expect(primes.getPrimeIndex(11)).toBe(5);
    expect(primes.getPrimeIndex(19)).toBe(8);
    expect(primes.getPrimeIndex(23)).toBe(9);
    expect(primes.getPrimeIndex(37)).toBe(12);
  });

  test('getPrimeIndex returns undefined for non-prime input', () => {
    expect(primes.getPrimeIndex(4)).toBeUndefined();
    expect(primes.getPrimeIndex(8)).toBeUndefined();
    expect(primes.getPrimeIndex(20)).toBeUndefined();
  });
});
