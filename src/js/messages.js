import Notiflix from 'notiflix';

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

export { lettersNeededMessage, failMessage, quantityMessage, limitMessage };
