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
  const data = collections.find(item => item.title === collectionName);

  return data.animeList;
};

export const addCollectionList = (collections, collectionCheck, data) => {
  // eslint-disable-next-line
  collectionCheck.map(item => {
    // eslint-disable-next-line
    collections.find(value => {
      const { title, animeList } = value;
      const match = item === title;

      if (match) {
        const isExist = animeList.find(anime => anime.id === data.id);
        
        !isExist && animeList.push(data);
      }
    })
  })

  return collections;
}

export const updateCollectionList = (collectionName, data) => {
  const collections = getFromLocalStorage('collections');

  // eslint-disable-next-line
  collections.map(item => {
    if (item.title === collectionName) {
      item.animeList = data
    }
  })

  return collections;
};

export const createNewCollection = (collections, name) => {
  collections.push({
    title: name,
    animeList: []
  });

  return collections;
};
