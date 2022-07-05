import { createNewCollection } from './collectionUtils';

describe('Collection Utils', () => {
  describe('createNewCollection', () => {
    it('should return correct new collection', () => {
      const actual = createNewCollection([], 'test');
      const expected = [{ title: 'test', animeList: [] }];

      expect(actual).toEqual(expected);
    });
  });
});
