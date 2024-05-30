export function searchImage(query) {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '44046646-50f8df335e976b654bc240f3a',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });
    const url = `${BASE_URL}?${params}`;

    return fetch(url).then(res => res.json());
}