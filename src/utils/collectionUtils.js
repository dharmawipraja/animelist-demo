import { getFromLocalStorage } from './localStorage';

export const getCollectionList = (collectionList, id) => {
  const collections = getFromLocalStorage('collections');

  // eslint-disable-next-line
  collections.map(item => {
    const { title, animeList } = item;  
  
    // eslint-disable-next-line
    animeList.find(anime => {
      const isMatch = anime.id === parseInt(id)
  
      if (isMatch) {
        collectionList.push(title)
      }
    })
  });

  return collectionList;
};

export const getAnimeList = (collectionName) => {
  const collections = getFromLocalStorage('collections');

  collections.find(item => {
    const animeList = item.title === collectionName;

    return animeList;
  });
};
