import Notiflix from 'notiflix';

function fetchImages(searchingImg) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '29082110-259fa3573f07e09f564e9c4c2';

  const url = `${BASE_URL}?key=${KEY}&q=${searchingImg}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchImages };
