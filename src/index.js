import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from './fetchCountries'

const DEBOUNCE_DELAY = 1000;
const refs = {
searchForm:document.querySelector('input'),
listCountry: document.querySelector('.country-list'),
countryCard: document.querySelector('.country-info'),
}



refs.searchForm.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY))     
function getCountry (event) {
    const inputValue = event.target.value.trim()
    if (!inputValue) {
        cleanMarkup()
        return
    }
    fetchCountries(inputValue)
    .then (response => {
        if (response.length){
            manyMatches(response);
        } else {
            throw new Error("No Data");
        }
        })
        .catch ((err) => {
            cleanMarkup()
            return Notify.failure("Oops, there is no country with that name")})
        
    }

// common functions 
function manyMatches (countryObj){
    const responseLength = countryObj.length
    if (responseLength > 10) {
     return Notify.warning("Too many matches found. Please enter a more specific name.");
    }
    if (responseLength > 2 && responseLength <= 10){
       const listMarkup = createList(countryObj)
       cleanMarkup()
       insertMarkupList(listMarkup)
    
} else {
    const cardMarkup = createCard(countryObj)
    cleanMarkup()
    insertMarkupCard(cardMarkup)}
    
    }

function createList(array){
    const listMarkup = array.map(({flags, name}) => {
        return `<li class="list-item"><img class="flag-svg" src="${flags.svg}">${name.official}</li>`
    }).join('');
    return listMarkup
}
function createCard(array){
    const cardMarkup = array.map(({name, capital, population, flags, languages}) => {
        return `
        <img class="flag-svg" src = "${flags.svg}">
        <h2>${name.official}</h2>
        <p><span class = "bold">Capital: </span>${capital}</p>
        <p><span class = "bold">Language: </span>${Object.values(languages)}</p>
        <p><span class = "bold">Population: </span>${population}</p>`
    }).join('')
    
    return cardMarkup
}

function insertMarkupList (listMarkup){
    refs.listCountry.innerHTML = listMarkup
}

function insertMarkupCard(cardMarkup){
    refs.countryCard.innerHTML = cardMarkup
}

function cleanMarkup () {
    refs.listCountry.innerHTML = ''
    refs.countryCard.innerHTML = ''
}
// ==========================================



