export interface SearchParams {
  description?: string;
  location?: string;
  priceRange?: number[];
  propertyType?: string;
  title?: string;
}

export interface ISearchPostsProps {
  onSearch: (searchParams: SearchParams) => void;
}
