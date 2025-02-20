import { Loader } from './Loader';
import { Map } from './Map';
import { Primes } from './Primes';
import { Metadata } from './IMetadata';
import { PrimeError } from './PrimeError';
import metadata from '../data/metadata.json';

const loader = new Loader();
const map = new Map(metadata as unknown as Metadata[], loader);
const primesInstance = new Primes(map);

export const isPrime = (n: number): boolean => primesInstance.isPrime(n);
export const getNthPrime = (n: number): number => primesInstance.getNthPrime(n);
export const getPrimeIndex = (n: number): number | undefined => primesInstance.getPrimeIndex(n);
export const primesInRange = (min: number, max: number): number[] =>
  primesInstance.primesInRange(min, max);
export const getNextPrime = (n: number): number => primesInstance.getNextPrime(n);
export const getPrevPrime = (n: number): number => primesInstance.getPrevPrime(n);
export const getNextNPrimes = (n: number, count: number): number[] =>
  primesInstance.getNextNPrimes(n, count);
export const getPrevNPrimes = (n: number, count: number): number[] =>
  primesInstance.getPrevNPrimes(n, count);

export default {
  isPrime,
  getNthPrime,
  getPrimeIndex,
  primesInRange,
  getNextPrime,
  getPrevPrime,
  getNextNPrimes,
  getPrevNPrimes,
  PrimeError,
};
