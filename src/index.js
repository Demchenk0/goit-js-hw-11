import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
// import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NewsApiService } from "./news-servise";
import { markupGallery } from "./markup-gallery"
// import { LoadMoreBtn } from "./load-more-btn"
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

function onSearch(event) {
    event.preventDefault();
    clearCards();
    
    newsApiService.query = event.currentTarget.elements.searchQuery.value;

    newsApiService.resetPage();
    newsApiService.fetchArticles().then(({ hits, totalHits }) => {
        
        if (totalHits === 0) {
            loadMoreBtn.classList.add("is-hidden")
            Notify.failure('"Sorry, there are no images matching your search query. Please try again."')
            return;
        }
        Notify.info(`Hooray! We found ${totalHits} images.`)
        markupGallery(hits);
        loadMoreBtn.classList.remove("is-hidden");
        lightbox.refresh();
    }
        
    );
}

function onLoadMore() {
    newsApiService.fetchArticles().then(({ hits, totalHits }) => {
        markupGallery(hits);
        console.log(totalHits);
        if (newsApiService.per_page * newsApiService.page > totalHits) {
            loadMoreBtn.classList.add("is-hidden");
            Notify.failure(`"We're sorry, but you've reached the end of search results`);
        }
        
        lightbox.refresh();
        myScroll()
    }
        
    );   
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


