const END_POINT = "https://restcountries.com/v3.1/name/"


export function fetchCountries(country) {
    return fetch(`${END_POINT}${country}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
}


