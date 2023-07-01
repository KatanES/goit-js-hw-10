const url = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_9DXEg4Lh2chY88wyj3bubsvvhA1yqqWDwllwOi10UakXQykqShGzO9Gw8MyIBcsl';

// Функція, яка виконує HTTP-запит  і повертає проміс із масивом порід

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

// Функція, яка виконує HTTP-запит по ідентифікатору породи  і повертає проміс із даними про кота

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
