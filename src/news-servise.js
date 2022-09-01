import axios from "axios";

export class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }
    fetchArticles() {
        console.log(this);
        const API_KEY = `29624202-0ace9f1cfbb26d74e2bd1c2da`

        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;
        return axios.get(url)
            // .then(response => response.json())
            // .then(( data ) => {
            //     this.incrementPage();
            //     console.log(data);
            //     return data;
            // });
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



