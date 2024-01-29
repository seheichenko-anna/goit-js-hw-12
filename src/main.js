import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');
const loader = document.querySelector('.loader');

let lightbox;
let countPage = 1;
let searchValue;

form.addEventListener('submit', onSearchImages);
loadBtn.addEventListener('click', onLoadImages);

async function onSearchImages(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loader.classList.remove('hidden');
  loadBtn.classList.add('hidden');
  searchValue = form.elements.q.value.trim();

  try {
    if (searchValue !== '') {
      const data = await getImages(searchValue);
      if (data.hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#EF4040',
          titleColor: '#FFFFFF',
          messageColor: '#FFFFFF',
        });
      } else {
        countPage = 1;
        renderGallery(data.hits);
        loadBtn.classList.remove('hidden');
      }
    } else {
      iziToast.show({
        message: 'Please fill out the search field',
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
      });
      loader.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hidden');
    form.reset();
  }
}

function getGalleryItemHeight() {
  const galleryItem = document.querySelector('.gallery-item');
  const { height } = galleryItem.getBoundingClientRect();
  return height;
}

async function onLoadImages() {
  loadBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  const galleryItemHeight = getGalleryItemHeight();

  try {
    const data = await getImages();
    countPage += 1;
    renderGallery(data.hits);
    loadBtn.classList.remove('hidden');
    window.scrollBy({
      top: galleryItemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });
    if (data.totalHits - countPage * 40 <= 0) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#03a9f4',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
      });
      loadBtn.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hidden');
  }
}

const getImages = async function () {
  const API_KEY = '42001706-084c655b89d9d100c07cefb17';
  const url = 'https://pixabay.com/api/';
  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: countPage,
      per_page: 40,
    },
  });
  return response.data;
};

function renderGallery(data) {
  const markup = data.map(item => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = item;
    return `<li class="gallery-item">
                <a class="gallery-link" href=${largeImageURL}>
                <img src=${webformatURL} alt="${tags}" /></a>
                    <ul class="image-desc">
                        <li class="image-desc-item"><p>Likes</p><p>${likes}</p></li>
                        <li class="image-desc-item"><p>Views</p><p>${views}</p></li>
                        <li class="image-desc-item"><p>Comments</p><p>${comments}</p></li>
                        <li class="image-desc-item"><p>Downloads</p><p>${downloads}</p></li>
                    </ul>
            </li>`;
  });

  addMarkup(markup);
  lightbox.refresh();
}

function addMarkup(markup) {
  markup = markup.join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
}
