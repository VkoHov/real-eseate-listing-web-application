import { SearchParams } from './';

export const generateQueryFromParams = (
  params: Record<string, any>,
): string => {
  const queryParams: string[] = [];
  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key]) {
      // Only add non-empty values to query params
      if (key === 'priceRange') {
        queryParams.push(`price_gte=${params[key][0]}`);
        queryParams.push(`price_lte=${params[key][1]}`);
        continue;
      } else if (key === 'propertyType') {
        queryParams.push(`type=${params[key]}`);
        continue;
      }
      queryParams.push(`${key}_like=${params[key]}`);
    }
  }
  return queryParams.join('&');
};
