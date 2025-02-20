import { Metadata } from './IMetadata';

export interface ILoader {
  load(chunk: Metadata): number[];
}