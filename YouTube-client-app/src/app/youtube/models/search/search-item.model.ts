export interface SearchItemModel {
  kind: string;
  etag: string;
  id: Iid;
  snippet: Isnippet;
  statistics: Istatistics;
}

interface Iid {
  kind: string;
  videoId: string;
}

interface Isnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Ithumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Ilocalized;
  defaultAudioLanguage: string;
}

interface Ilocalized {
  title: string;
  description: string;
}

interface Ithumbnails {
  default: Iimages;
  medium: Iimages;
  high: Iimages;
  standard: Iimages;
  maxres: Iimages;
}

interface Iimages {
  url: string;
  width: number;
  height: number;
}

interface Istatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}
