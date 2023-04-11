export interface SearchParams {
  description?: string;
  location?: string;
  priceRange?: number[];
  propertyType?: string;
  title?: string;
}
export const generateQueryFromParams = (params: SearchParams): string => {
  const queryParams: string[] = [];
  for (const key in params) {
    //@ts-ignore
    if (params.hasOwnProperty(key) && params[key]) {
      // Only add non-empty values to query params
      if (key === 'priceRange') {
        //@ts-ignore
        queryParams.push(`price_gte=${params[key][0]}`);
        //@ts-ignore
        queryParams.push(`price_lte=${params[key][1]}`);
        continue;
      } else if (key === 'propertyType') {
        //@ts-ignore
        queryParams.push(`type=${params[key]}`);
        continue;
      }
      //@ts-ignore
      queryParams.push(`${key}_like=${params[key]}`);
    }
  }
  return queryParams.join('&');
};
