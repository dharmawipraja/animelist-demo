import { getFromLocalStorage } from './localStorage';
import { Anime, Collection } from '../types';

export const getCollectionList = (currentCollectionTitles: string[], animeId: string | number): string[] => {
  const collections: Collection[] = getFromLocalStorage<Collection[]>('collections') || [];
  const newCollectionTitles = [...currentCollectionTitles];

  collections.forEach(collection => {
    const { title, animeList } = collection;
    const foundAnime = animeList.find(anime => anime.id === (typeof animeId === 'string' ? parseInt(animeId, 10) : animeId));
    if (foundAnime) {
      if (!newCollectionTitles.includes(title)) {
        newCollectionTitles.push(title);
      }
    }
  });

  return newCollectionTitles;
};

export const getAnimeList = (collectionName: string): Anime[] | undefined => {
  const collections: Collection[] = getFromLocalStorage<Collection[]>('collections') || [];
  const data = collections.find(item => item.title === collectionName);

  return data?.animeList;
};

export const addCollectionList = (currentCollections: Collection[], collectionCheckTitles: string[], animeData: Anime): Collection[] => {
  const updatedCollections = currentCollections.map(collection => {
    if (collectionCheckTitles.includes(collection.title)) {
      const isAnimeAlreadyInList = collection.animeList.find(anime => anime.id === animeData.id);
      if (!isAnimeAlreadyInList) {
        return {
          ...collection,
          animeList: [...collection.animeList, animeData],
        };
      }
    }
    return collection;
  });

  return updatedCollections;
}

export const updateCollectionList = (collectionName: string, animeListData: Anime[]): Collection[] => {
  const collections: Collection[] = getFromLocalStorage<Collection[]>('collections') || [];

  return collections.map(collection => {
    if (collection.title === collectionName) {
      return { ...collection, animeList: animeListData };
    }
    return collection;
  });
};

export const createNewCollection = (currentCollections: Collection[], newCollectionName: string): Collection[] => {
  const newCollection: Collection = {
    title: newCollectionName,
    animeList: []
  };
  return [...currentCollections, newCollection];
};
