import { gallery } from './refs';

export default function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.55,
    behavior: 'smooth',
  });
}
