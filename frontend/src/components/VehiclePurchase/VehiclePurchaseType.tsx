export interface Page {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

export interface PageParam {
  pageParam?: number;
}

export interface SearchType {
  sortType: string;
}

export interface Props {
  searchInfo: SearchType;
  setSearchInfo: React.Dispatch<React.SetStateAction<SearchType>>;
}
