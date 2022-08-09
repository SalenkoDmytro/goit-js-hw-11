import './sass/styles.scss';
import './css/styles.css';
import { form, searchBtn, gallery } from './js/refs';
import {
  renderCards,
  clearCardContainer,
  hiddenLoadMoreBtn,
} from './js/renderCards.js';
import {
  lettersNeededMessage,
  failMessage,
  quantityMessage,
  limitMessage,
} from './js/messages';
import smoothScroll from './js/smoothScroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImageService from './js/image-service.js';
const imageService = new ImageService();
export const axios = require('axios');

form.addEventListener('submit', onFormSubmit);
searchBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  hiddenLoadMoreBtn();
  clearCardContainer();
  imageService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (imageService.query === '') return lettersNeededMessage();

  imageService.resetPage();
  try {
    const data = await imageService.fetchImages();
    checkAndRenderOnSubmitBtn(data);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMoreClick() {
  hiddenLoadMoreBtn();
  try {
    const data = await imageService.fetchImages();
    checkAndAddLightbox(data);
  } catch (error) {
    console.log(error);
  }
}

function checkAndRenderOnSubmitBtn(resolve) {
  if (resolve.totalHits < 1) {
    return failMessage();
  }
  quantityMessage(resolve.totalHits);

  renderCards(resolve);

  imageService.simpleLightbox = new SimpleLightbox('.gallery a');
}

function checkAndAddLightbox(resolve) {
  if (gallery.children.length === resolve.totalHits) {
    return limitMessage();
  }

  renderCards(resolve);
  imageService.simpleLightbox.refresh();
  smoothScroll();
}
