import { LISTS_API_URL } from '../constants/apiUrls';

export const fetchListsApi = async () => {
  const response = await fetch(LISTS_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch lists');
  }
  const data = await response.json();
  return data;
};
