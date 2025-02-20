import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { LRUCache } from 'lru-cache';
import { Metadata } from './IMetadata';
import { ILoader } from './ILoader';

export class Loader implements ILoader {
  private cache: LRUCache<string, number[]>;
  private dataDir: string;

  constructor(dataDir?: string) {
    this.dataDir = dataDir || path.resolve(__dirname, '../data');
    this.cache = new LRUCache<string, number[]>({ max: 10 });
  }

  public load(chunk: Metadata): number[] {
    const key = chunk.name;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const jsonPath = path.join(this.dataDir, `${chunk.name}.json`);
    let list: number[];

    if (fs.existsSync(jsonPath)) {
      list = this.readJsonFile(jsonPath);
    } else {
      const compPath = path.join(this.dataDir, `${chunk.name}.br`);

      if (!fs.existsSync(compPath)) {
        throw new Error(`File not found: ${compPath}`);
      }

      const decompressed = this.decompressFile(compPath);
      list = JSON.parse(decompressed);
      this.writeJsonFile(jsonPath, decompressed);
    }

    this.cache.set(key, list);

    return list;
  }

  private readJsonFile(filePath: string): number[] {
    const content = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(content);
  }

  private decompressFile(compPath: string): string {
    const compContent = fs.readFileSync(compPath);
    const decompressedBuffer = zlib.brotliDecompressSync(compContent);

    return decompressedBuffer.toString('utf8');
  }

  private writeJsonFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}
