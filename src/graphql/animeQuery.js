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
