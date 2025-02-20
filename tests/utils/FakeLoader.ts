import { Metadata } from '../../src/IMetadata';

export class FakeLoader {
  load(chunk: Metadata): number[] {
    return [chunk.first, chunk.last];
  }
}