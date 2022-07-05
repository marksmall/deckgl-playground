import { useQuery } from 'react-query';

export const useAppConfig = () => {
  return useQuery('posts', async () => {
    const response = await fetch('/api/app/config');

    const data = await response.json();

    return data;
  });
};
