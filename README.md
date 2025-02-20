# Primelist

**Primelist** offers lightning-fast prime lookups and nth prime retrieval by leveraging a precomputed dataset of the first 50 million primes. This eliminates the need for on‑the‑fly prime testing, ensuring constant-time performance for prime checks and retrieval operations.

## Overview

Rather than calculating primes at runtime—a process that can be slow and resource‑intensive for large numbers—**Primelist** loads and caches its precomputed dataset into an efficient internal mapping of prime ranges. This design enables rapid prime verification and nth prime lookups without incurring heavy computation at runtime.

The prime data is provided by [t5k.org](https://t5k.org/lists/small/millions/), and we sincerely thank them for making this prime list available.

## Installation

Install **primelist** via npm:

```bash
npm install primelist
```

Or using yarn:

```bash
yarn add primelist
```

## Usage

Import the API functions into your project:

```typescript
import {
  isPrime,
  getNthPrime,
  getPrimeIndex,
  primesInRange,
  getNextPrime,
  getPrevPrime,
  getNextNPrimes,
  getPrevNPrimes
} from 'primelist';

console.log(isPrime(7));           // true
console.log(getNthPrime(100));     // returns the 100th prime number
console.log(getPrimeIndex(7));     // returns 4 (1-indexed position)
console.log(primesInRange(50, 100)); // returns all primes between 50 and 100
console.log(getNextPrime(97));     // returns the next prime after 97
console.log(getPrevPrime(97));     // returns the previous prime before 97
console.log(getNextNPrimes(97, 5));  // returns the next 5 primes after 97
console.log(getPrevNPrimes(97, 5));  // returns the previous 5 primes before 97

```

## Contributing

Contributions to improve performance, extend the API, or expand the dataset are welcome. Please open issues or pull requests on the repository to discuss improvements.

## License

**Primelist** is distributed under the MIT License. For more details, please refer to the [LICENSE](LICENSE).
