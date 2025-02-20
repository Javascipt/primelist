import { Map } from '../src/Map';
import { Metadata } from '../src/IMetadata';
import { FakeLoader } from './utils/FakeLoader';

describe('Map', () => {
  const metadata: Metadata[] = [
    { name: 'chunk1', first: 2, last: 100, count: 2 },
    { name: 'chunk2', first: 101, last: 200, count: 2 },
    { name: 'chunk3', first: 201, last: 300, count: 2 },
  ];

  let mapInstance: Map;

  beforeEach(() => {
    const loader = new FakeLoader();
    mapInstance = new Map(metadata, loader);
  });

  describe('getListForNumber', () => {
    it('should return the first chunk for a number below the first chunk', () => {
      expect(mapInstance.getListForNumber(1)).toEqual([2, 100]);
    });

    it('should return the correct chunk when the number is within a chunk', () => {
      expect(mapInstance.getListForNumber(150)).toEqual([101, 200]);
      expect(mapInstance.getListForNumber(250)).toEqual([201, 300]);
    });

    it('should return the last chunk for a number above the last chunk', () => {
      expect(mapInstance.getListForNumber(350)).toEqual([201, 300]);
    });
  });

  describe('getListForIndex', () => {
    it('should return the correct list for a valid index', () => {
      expect(mapInstance.getListForIndex(0)).toEqual([2, 100]);
      expect(mapInstance.getListForIndex(1)).toEqual([101, 200]);
      expect(mapInstance.getListForIndex(2)).toEqual([201, 300]);
    });

    it('should throw an error for an invalid index', () => {
      expect(() => mapInstance.getListForIndex(-1)).toThrow();
      expect(() => mapInstance.getListForIndex(3)).toThrow();
    });
  });

  describe('getListsForRange', () => {
    it('should return all lists spanning multiple chunks', () => {
      const result = mapInstance.getListsForRange(50, 250);
      expect(result).toEqual([[2, 100], [101, 200], [201, 300]]);
    });

    it('should return a single list if the range falls within one chunk', () => {
      const result = mapInstance.getListsForRange(120, 180);
      expect(result).toEqual([[101, 200]]);
    });

    it('should throw an error for an invalid range', () => {
      expect(() => mapInstance.getListsForRange(200, 100)).toThrow('Invalid range');
    });
  });
});
