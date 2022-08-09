import { gallery, searchBtn } from './refs';

function renderCards({ hits, totalHits }) {
  if (totalHits > 0) {
    createMarkup(hits);
    showLoadMoreBtn();
  }
}

function createMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `
    <div class="photo-card">
    <a href="${largeImageURL}">  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
</a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoadMoreBtn() {
  searchBtn.classList.remove('is-hidden');
}

function clearCardContainer() {
  gallery.innerHTML = '';
}

function hiddenLoadMoreBtn() {
  searchBtn.classList.add('is-hidden');
}

export { renderCards, clearCardContainer, hiddenLoadMoreBtn };
