import { gql } from "@apollo/client";
// import { MediaListPageData, MediaListPageVars, MediaDetailData, MediaDetailVars } from '../types'; // Or from '../types/graphql'

/**
 * Types for this query:
 * Data: MediaListPageData
 * Variables: MediaListPageVars
 */
export const ANIME_LIST_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media {
        id
        bannerImage
        coverImage {
          large
          color
        }
        title {
          romaji
        }
        description
      }
    }
  }
`;

/**
 * Types for this query:
 * Data: MediaDetailData
 * Variables: MediaDetailVars
 */
export const ANIME_DETAIL_QUERY = gql`
  query ($id: Int) {
    Media(id: $id) {
      id
      bannerImage
      coverImage {
        large
        color
      }
      title {
        romaji
      }
      description
    }
  }
`;
