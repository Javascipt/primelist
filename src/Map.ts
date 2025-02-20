import { ILoader } from './ILoader';
import { Metadata } from './IMetadata';
import { PrimeError } from './PrimeError';

export class Map {
  private metadata: Metadata[];
  private loader: ILoader;

  constructor(metadata: Metadata[], loader: ILoader) {
    this.metadata = metadata.sort((a, b) => a.first - b.first);
    this.loader = loader;
  }

  private loadList(chunkIndex: number): number[] {
    return this.loader.load(this.metadata[chunkIndex]);
  }

  private findChunkIndexForNumber(n: number): number {
    for (let i = 0; i < this.metadata.length; i++) {
      const chunk = this.metadata[i];
      if (n >= chunk.first && n <= chunk.last) {
        return i;
      }
    }

    return n < this.metadata[0].first ? 0 : this.metadata.length - 1;
  }

  public getListForNumber(n: number): number[] {
    const idx = this.findChunkIndexForNumber(n);

    return this.loadList(idx);
  }

  public getListForIndex(index: number): number[] {
    if (index < 0 || index >= this.metadata.length) {
      throw new PrimeError(
        `Index out of bounds. Must be between 0 and ${this.metadata.length - 1}`
      );
    }

    return this.loadList(index);
  }

  public getListsForRange(min: number, max: number): number[][] {
    if (min > max) {
      throw new PrimeError('Invalid range: min should be less than or equal to max');
    }

    const startIdx = this.findChunkIndexForNumber(min);
    const endIdx = this.findChunkIndexForNumber(max);
    const lists: number[][] = [];

    for (let i = startIdx; i <= endIdx; i++) {
      lists.push(this.loadList(i));
    }

    return lists;
  }

  public getChunkIndexForPrimeIndex(n: number): { chunkIndex: number; offset: number } {
    if (n < 1) {
      throw new PrimeError("n must be >= 1");
    }

    let cumulative = 0;
    for (let i = 0; i < this.metadata.length; i++) {
      const count = this.metadata[i].count;
      if (n <= cumulative + count) {
        return { chunkIndex: i, offset: n - cumulative - 1 };
      }
      cumulative += count;
    }

    throw new PrimeError("n exceeds total number of primes available");
  }

  public getChunkCount(): number {
    return this.metadata.length;
  }

  public getMetadata(): Metadata[] {
    return this.metadata;
  }
}
