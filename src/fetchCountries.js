import Notiflix from 'notiflix';

export function fetchCountries(url) {
  return fetch(url).then(response => {
    if (response.status === 404) {
      throw new Error();
    } else {
      return response.json();
    }
  });
}

export function constructErrorMessage(message) {
  Notiflix.Notify.failure(message, {
    timeout: 2000,
  });
}

export function constructExcessMessage(message) {
  Notiflix.Notify.info(message, {
    timeout: 2000,
  });
}
