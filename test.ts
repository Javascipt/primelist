import {
    isPrime,
    getNthPrime,
    getPrimeIndex,
    primesInRange,
    getNextPrime,
    getPrevPrime,
    getNextNPrimes,
    getPrevNPrimes
  } from './src/';
  
  console.log(isPrime(7));           // true
  console.log(getNthPrime(100));     // returns the 100th prime number
  console.log(getPrimeIndex(7));     // returns 4 (1-indexed position)
  console.log(primesInRange(50, 100)); // returns all primes between 50 and 100
  console.log(getNextPrime(97));     // returns the next prime after 97
  console.log(getPrevPrime(97));     // returns the previous prime before 97
  console.log(getNextNPrimes(97, 5));  // returns the next 5 primes after 97
  console.log(getPrevNPrimes(97, 5));  // returns the previous 5 primes before 97