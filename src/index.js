import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NewsApiService } from "./news-servise";
import { markupGallery } from "./markup-gallery"

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
export const myGallery = document.querySelector('.gallery');

const newsApiService = new NewsApiService();

console.log(newsApiService);

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
// myGallery.addEventListener()
// let sertchQuery = '';
// buttonNone();

async function onSearch(event) {

    event.preventDefault();
    clearCards();

    newsApiService.query = event.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    try {
        const awaitFetch = await newsApiService.fetchArticles();
        console.log(awaitFetch.data);
        console.log(awaitFetch.data.hits);
        console.log(awaitFetch.data.totalHits);

        if (awaitFetch.data.totalHits === 0) {
            loadMoreBtn.classList.add("is-hidden")
            Notify.failure('"Sorry, there are no images matching your search query. Please try again."')
            return;
        }
        Notify.info(`Hooray! We found ${awaitFetch.data.totalHits} images.`)
        markupGallery(awaitFetch.data.hits);
        loadMoreBtn.classList.remove("is-hidden");
        lightbox.refresh();
    } catch (error) {
        console.log(error.message);
    }
}

async function onLoadMore() {
    newsApiService.incrementPage();
    try {
        const awaitFetch = await newsApiService.fetchArticles();
        markupGallery(awaitFetch.data.hits);
        console.log(awaitFetch.data.totalHits);
        if (newsApiService.per_page * newsApiService.page > awaitFetch.data.totalHits) {
            loadMoreBtn.classList.add("is-hidden");
            Notify.failure(`"We're sorry, but you've reached the end of search results`);
        }

        lightbox.refresh();
        myScroll()
    } catch (error) {
        console.log(error.message);
}
    
}


function clearCards() {
    myGallery.innerHTML = '';
}
var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});


function myScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}


