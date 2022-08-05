import { fetchImages } from './js/fetch';

const form = document.querySelector('#search-form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const searchingImg = e.currentTarget.elements.searchQuery.value.trim();

  fetchImages(searchingImg).then(console.log).catch(console.log);
}
