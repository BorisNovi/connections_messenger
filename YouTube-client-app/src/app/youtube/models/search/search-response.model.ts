import { SearchItemModel } from './search-item.model';

export interface SearchResponseModel {
  TODO: string;
  kind: string;
  etag: string;
  pageInfo: IpageInfo;
  items: SearchItemModel[];
}

interface IpageInfo {
  totalResults: number;
  resultsPerPage: number;
}
