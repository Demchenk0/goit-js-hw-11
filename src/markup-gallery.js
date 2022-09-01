import { myGallery } from "./index";


export function markupGallery(cards) {
    const allDiv = cards.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
<img src="${webformatURL}" alt="${tags}" loading="lazy" />
</a>
<div class="info">
    <p class="info-item">
    <b>Likes <br/> ${likes}</b>
    </p>
    <p class="info-item">
    <b>Views <br/>${views}</b>
    </p>
    <p class="info-item">
    <b>Comments <br/>${comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads <br/>${downloads}</b>
    </p>
</div>
</div>`;
    })
    myGallery.insertAdjacentHTML('beforeend', allDiv.join(''))
} 


