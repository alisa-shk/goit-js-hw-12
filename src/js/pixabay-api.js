import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44046646-50f8df335e976b654bc240f3a';


export async function searchImage(query, page = 1) {
    
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
    });

    try {
        const response = await axios(BASE_URL, { params });
        return {
            hits: response.data.hits,
            totalHits: response.data.totalHits,
        };
    } catch(err) {
        alert(err.message);
    }
}