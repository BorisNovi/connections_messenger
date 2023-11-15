export enum SearchOrder {
  relevance,
  date,
  rating,
  title,
  videoCount,
  viewCount,
}

export interface ISearch {
  q?: string;
  maxResults?: number;
  order?: SearchOrder;
}
