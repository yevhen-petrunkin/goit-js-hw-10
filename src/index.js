import './css/styles.css';
import {
  fetchCountries,
  constructErrorMessage,
  constructExcessMessage,
} from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const URL_BASE = 'https://restcountries.com/v3.1';
const EXCESS_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
const ERROR_MESSAGE = 'Oops, there is no country with that name';

const countryRefs = {
  countrySearchBoxRef: document.querySelector('#search-box'),
  countryListRef: document.querySelector('.country-list'),
  countryInfoBoardRef: document.querySelector('.country-info'),
};

countryRefs.countrySearchBoxRef.addEventListener(
  'input',
  debounce(onCountrySearch, DEBOUNCE_DELAY)
);

function onCountrySearch(event) {
  const countryName = event.target.value.trim();
  const url = `${URL_BASE}/name/${countryName}?fields=name,capital,population,flags,languages`;
  resetCountryList();
  resetCountryInfoBoard();
  fetchCountries(url)
    .then(processCountryData)
    .catch(error => constructErrorMessage(ERROR_MESSAGE));
}

function processCountryData(data) {
  if (data.length > 10) {
    constructExcessMessage(EXCESS_MESSAGE);
  }

  if (data.length >= 2 && data.length <= 10) {
    data.forEach(constructCountryList);
  }

  if (data.length === 1) {
    data.forEach(constructCountryInfoBoard);
  }
}

function constructCountryList(country) {
  countryRefs.countryListRef.insertAdjacentHTML(
    'beforeend',
    `<li><img src="${country.flags.svg}" alt="${country.name.official} flag" width="20"><p>${country.name.official}</p></li>`
  );
}

function resetCountryList() {
  countryRefs.countryListRef.innerHTML = '';
}

function constructCountryInfoBoard(country) {
  const countryCapital = country.capital.join(', ');
  const countryLanguages = Object.values(country.languages).join(', ');
  countryRefs.countryInfoBoardRef.insertAdjacentHTML(
    'beforeend',
    `<article><div><img src="${country.flags.svg}" alt="${country.name.official} flag" width="60"><h2>${country.name.official}</h2></div><div><p><span>Capital:</span>${countryCapital}</p></div><div><p><span>Population:</span>${country.population}</p></div><div><p><span>Languages:</span>${countryLanguages}</p></div></article>`
  );
}

function resetCountryInfoBoard() {
  countryRefs.countryInfoBoardRef.innerHTML = '';
}
