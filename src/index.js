import { form, searchBtn, gallery } from './js/refs';
import {
  renderCards,
  clearCardContainer,
  hiddenLoadMoreBtn,
} from './js/renderCards.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import ImageService from './js/image-service.js';
const imageService = new ImageService();

form.addEventListener('submit', onFormSubmit);
searchBtn.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();
  hiddenLoadMoreBtn();
  clearCardContainer();
  imageService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (imageService.query === '') return lettersNeededMessage();

  imageService.resetPage();
  imageService
    .fetchImages()
    .then(doWithFetchResultOnSubmitBtn)
    .catch(console.log);
}

function onLoadMore() {
  hiddenLoadMoreBtn();

  imageService.fetchImages().then(doWithFetchOnLoadMoreBtn).catch(console.log);
}

function doWithFetchResultOnSubmitBtn(resolve) {
  if (resolve.totalHits < 1) {
    return failMessage();
  }
  quantityMessage(resolve.totalHits);

  renderCards(resolve);
  imageService.simpleLightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function doWithFetchOnLoadMoreBtn(resolve) {
  if (gallery.children.length === resolve.totalHits) {
    return limitMessage();
  }

  renderCards(resolve);
  imageService.simpleLightbox.refresh();
}

function lettersNeededMessage() {
  return Notiflix.Notify.warning('Nice try, but i need some letters...');
}

function failMessage() {
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function quantityMessage(total) {
  return Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}

function limitMessage() {
  return Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
