import { Map } from './Map';
import { PrimeError } from './PrimeError';

export class Primes {
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  public isPrime(n: number): boolean {
    const list = this.map.getListForNumber(n);
    return list.includes(n);
  }

  public getNthPrime(n: number): number {
    if (n < 1) {
      throw new PrimeError("n must be >= 1");
    }

    const { chunkIndex, offset } = this.map.getChunkIndexForPrimeIndex(n);
    const chunk = this.map.getListForIndex(chunkIndex);

    if (offset < chunk.length) {
      return chunk[offset];
    }

    throw new PrimeError("n exceeds total number of primes available");
  }

  public primesInRange(min: number, max: number): number[] {
    const chunks = this.map.getListsForRange(min, max);
    const results: number[] = [];

    for (const chunk of chunks) {
      results.push(...chunk.filter(p => p >= min && p <= max));
    }

    return results;
  }

  public getNextPrime(n: number): number {
    const currentChunkIndex = this.getChunkIndexForValue(n);
    const chunk = this.map.getListForIndex(currentChunkIndex);

    for (const p of chunk) {
      if (p > n) {
        return p;
      }
    }

    if (currentChunkIndex < this.map.getChunkCount() - 1) {
      const nextChunk = this.map.getListForIndex(currentChunkIndex + 1);
      if (nextChunk.length > 0) {
        return nextChunk[0];
      }
    }

    throw new PrimeError("No next prime found");
  }

  public getPrevPrime(n: number): number {
    const currentChunkIndex = this.getChunkIndexForValue(n);
    const chunk = this.map.getListForIndex(currentChunkIndex);

    for (let i = chunk.length - 1; i >= 0; i--) {
      if (chunk[i] < n) {
        return chunk[i];
      }
    }

    if (currentChunkIndex > 0) {
      const prevChunk = this.map.getListForIndex(currentChunkIndex - 1);
      if (prevChunk.length > 0) {
        return prevChunk[prevChunk.length - 1];
      }
    }

    throw new PrimeError("No previous prime found");
  }

  public getNextNPrimes(n: number, count: number): number[] {
    const results: number[] = [];
    let current = n;

    for (let i = 0; i < count; i++) {
      current = this.getNextPrime(current);
      results.push(current);
    }

    return results;
  }

  public getPrevNPrimes(n: number, count: number): number[] {
    const results: number[] = [];
    let current = n;

    for (let i = 0; i < count; i++) {
      current = this.getPrevPrime(current);
      results.unshift(current);
    }

    return results;
  }

  public getPrimeIndex(n: number): number | undefined {
    const metadataArr = this.map.getMetadata();
    let cumulative = 0;

    for (let i = 0; i < metadataArr.length; i++) {
      const meta = metadataArr[i];

      if (n >= meta.first && n <= meta.last) {
        const chunk = this.map.getListForIndex(i);
        const localIndex = chunk.indexOf(n);

        if (localIndex === -1) {
          return undefined;
        }

        return cumulative + localIndex + 1;
      }

      cumulative += meta.count;
    }

    return undefined;
  }

  private getChunkIndexForValue(n: number): number {
    for (let i = 0; i < this.map.getChunkCount(); i++) {
      const chunk = this.map.getListForIndex(i);
      if (n >= chunk[0] && n <= chunk[chunk.length - 1]) {
        return i;
      }
    }

    return n < this.map.getListForIndex(0)[0]
      ? 0
      : this.map.getChunkCount() - 1;
  }
}
