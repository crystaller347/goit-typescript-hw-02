import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async (topic, page) => {
    const response = await axios.get(`search/photos/?client_id=sp7jnaNwRdJ4Bx4yl9iIFvVmS05c2yLjWYjzwEep3t0&query=${topic}&page=${page}&per_page=12`);
    return response.data;
}