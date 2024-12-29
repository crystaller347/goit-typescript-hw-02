import axios from 'axios';
import { type FetchImages } from './types.ts';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async(topic: string, page: number): Promise<FetchImages> => {
    const response = await axios.get<FetchImages>(`search/photos/?client_id=sp7jnaNwRdJ4Bx4yl9iIFvVmS05c2yLjWYjzwEep3t0&query=${topic}&page=${page}&per_page=12`);
    return response.data;
}