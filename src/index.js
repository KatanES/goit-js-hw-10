import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_VOS8H6eE1bRo0KX7MvmqaEz5e9rv9Tb2hSM26T9bxv56LWqx7GPaW4LhtRe2U6ms';

// import './styles.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

//створюємо options
function getAllCats(arr) {
  const options = arr.map(breed => {
    const { id, name } = breed;
    return `<option value="${id}">${name}</option>`;
  });

  refs.selector.innerHTML = options.join('');
}

addCats();

// робимо фетч та додаємо options
function addCats() {
  refs.loader.classList.add('visible');

  fetchBreeds()
    .then(getAllCats)
    .catch(error => {
      console.log(error);
      refs.error.classList.add('visible');
    })
    .finally(() => {
      refs.loader.classList.remove('visible');
    });
}

refs.selector.addEventListener('change', createModalCat);

// функція, що прослуховує селект + додає розмітку з даними
function createModalCat() {
  const breedId = refs.selector.value;

  clearCatContent();
  refs.loader.classList.add('visible');

  fetchCatByBreed(breedId)
    .then(data => {
      markup(data);
    })
    .catch(error => {
      console.log(error);
      refs.error.classList.add('visible');
    })
    .finally(() => {
      refs.loader.classList.remove('visible');
    });
}

//Функція, що робить робить розмітку
function markup(data) {
  const { url, breeds } = data[0];
  const { description, temperament } = breeds[0];

  const imageElement = document.createElement('img');
  imageElement.classList.add('cat-img');
  imageElement.src = url;
  imageElement.width = '600';

  const descElement = document.createElement('p');
  descElement.innerHTML = `<b>Description:</b> ${description}`;

  const tempElement = document.createElement('p');
  tempElement.innerHTML = `<b>Temperament:</b> ${temperament}`;

  refs.divCatInfo.appendChild(imageElement);
  refs.divCatInfo.appendChild(descElement);
  refs.divCatInfo.appendChild(tempElement);
}

// Видаляє попередній контент

function clearCatContent() {
  while (refs.divCatInfo.firstChild) {
    refs.divCatInfo.removeChild(refs.divCatInfo.firstChild);
  }
}

addCats();
