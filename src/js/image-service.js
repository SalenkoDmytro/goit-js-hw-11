const axios = require('axios');

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29082110-259fa3573f07e09f564e9c4c2';

export default class ImageService {
  constructor() {
    this.searchingImg = '';
    this.page = 1;
    this.simpleLightbox = null;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=${KEY}&q=${this.searchingImg}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.page += 1;
        return data;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchingImg;
  }

  set query(newSearchingImg) {
    this.searchingImg = newSearchingImg;
  }
}
