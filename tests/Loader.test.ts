import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as zlib from 'zlib';
import { Loader } from '../src/Loader';
import { Metadata } from '../src/IMetadata';

describe('Loader', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'loader-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  const createJsonFile = (dir: string, name: string, data: unknown): void => {
    const filePath = path.join(dir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
  };

  const createCompressedFile = (dir: string, name: string, data: unknown): void => {
    const filePath = path.join(dir, `${name}.br`);
    const compressed = zlib.brotliCompressSync(JSON.stringify(data));
    fs.writeFileSync(filePath, compressed);
  };

  test('should load list from JSON file if it exists', () => {
    const chunkName = 'testChunk';
    const testData = [1, 2, 3];
    createJsonFile(tempDir, chunkName, testData);

    const loader = new Loader(tempDir);
    const metadata: Metadata = { name: chunkName, first: 1, last: 3, count: 3 };
    const result = loader.load(metadata);

    expect(result).toEqual(testData);
  });

  test('should load list from compressed file if JSON does not exist', () => {
    const chunkName = 'testChunk';
    const testData = [4, 5, 6];
    createCompressedFile(tempDir, chunkName, testData);

    const loader = new Loader(tempDir);
    const metadata: Metadata = { name: chunkName, first: 4, last: 6, count: 3 };
    const result = loader.load(metadata);
    expect(result).toEqual(testData);

    const jsonPath = path.join(tempDir, `${chunkName}.json`);
    expect(fs.existsSync(jsonPath)).toBe(true);
    const content = fs.readFileSync(jsonPath, 'utf8');
    expect(JSON.parse(content)).toEqual(testData);
  });

  test('should throw an error if neither JSON nor compressed file exist', () => {
    const chunkName = 'missingChunk';
    const loader = new Loader(tempDir);
    const metadata: Metadata = { name: chunkName, first: 7, last: 9, count: 3 };

    const compPath = path.join(tempDir, `${chunkName}.br`);
    expect(() => loader.load(metadata)).toThrow(`File not found: ${compPath}`);
  });

  test('should use cache on subsequent loads', () => {
    const chunkName = 'testChunk';
    const testData = [7, 8, 9];
    createJsonFile(tempDir, chunkName, testData);

    const loader = new Loader(tempDir);
    const metadata: Metadata = { name: chunkName, first: 7, last: 9, count: 3 };

    const result1 = loader.load(metadata);
    expect(result1).toEqual(testData);

    fs.unlinkSync(path.join(tempDir, `${chunkName}.json`));

    const result2 = loader.load(metadata);
    expect(result2).toEqual(testData);
  });
});
