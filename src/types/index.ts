export interface Anime {
  id: number | string;
  // Allow other properties for now, will be refined as components are typed
  [key: string]: any;
}

export interface Collection {
  title: string;
  animeList: Anime[];
}

export type SetErrorFunction = (name: string, error: { type: string; message: string } | Record<string, never>) => void;

export interface WindowDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

export type PageChangeHandler = (event: unknown, page: number) => void;

export interface CoverImage {
  large: string;
  color: string | null;
}

export interface MediaTitle {
  romaji: string;
}

export interface MediaDetail {
  id: number;
  bannerImage: string | null;
  coverImage: CoverImage;
  title: MediaTitle;
  description: string;
}

export interface MediaDetailData {
  Media: MediaDetail;
}

export interface MediaDetailVars {
  id: number;
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface MediaPage {
  pageInfo: PageInfo;
  media: MediaDetail[]; // Using MediaDetail directly as items in the list
}

export interface MediaListPageData {
  Page: MediaPage;
}

export interface MediaListPageVars {
  page?: number;
  perPage?: number;
}
