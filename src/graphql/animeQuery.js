import { gql } from "@apollo/client";

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
        coverImage {
          large
          color
        }
        title {
          romaji
        }
      }
    }
  }
`;

export const ANIME_DETAIL_QUERY = gql`
  query ($id: Int) {
    Media(id: $id) {
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
