export function imageTemplate(image) {
    return `<li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-image" width="360" src="${image.webformatURL}" alt="${image.tags}"/>
            </a>
            <ul class="captions">
            <li><strong>Likes</strong> ${image.likes}</li>
            <li><strong>Views</strong> ${image.views}</li>
            <li><strong>Comments</strong> ${image.comments}</li>
            <li><strong>Downloads</strong> ${image.downloads}</li>
            </ul>
            </li>
            `
}
    
    
export function imagesTemplate(arr) {
    return arr.map(imageTemplate).join('');
}