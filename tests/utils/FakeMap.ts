import { Metadata } from '../../src/IMetadata';

export class FakeMap {
  private chunks: number[][];

  constructor(chunks: number[][]) {
    this.chunks = chunks;
  }

  public getListForNumber(n: number): number[] {
    if (n <= 7) return this.chunks[0];
    else if (n <= 19) return this.chunks[1];
    else return this.chunks[2];
  }

  public getListForIndex(index: number): number[] {
    if (index < 0 || index >= this.chunks.length) {
      throw new Error("Index out of bounds");
    }
    return this.chunks[index];
  }

  public getListsForRange(min: number, max: number): number[][] {
    return this.chunks.filter(chunk => {
      if (chunk[chunk.length - 1] < min || chunk[0] > max) return false;
      return true;
    });
  }

  public getChunkIndexForPrimeIndex(n: number): { chunkIndex: number; offset: number } {
    if (n < 1) throw new Error("n must be >= 1");
    let cumulative = 0;
    for (let i = 0; i < this.chunks.length; i++) {
      const count = this.chunks[i].length;
      if (n <= cumulative + count) {
        return { chunkIndex: i, offset: n - cumulative - 1 };
      }
      cumulative += count;
    }
    throw new Error("n exceeds total number of primes available");
  }

  public getChunkCount(): number {
    return this.chunks.length;
  }

  /**
   * Returns metadata built from the fake chunks.
   */
  public getMetadata(): Metadata[] {
    return this.chunks.map((chunk, index) => ({
      name: `chunk${index}`,
      first: chunk[0],
      last: chunk[chunk.length - 1],
      count: chunk.length,
    }));
  }
}
