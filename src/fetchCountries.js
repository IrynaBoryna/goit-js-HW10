const url = `https://restcountries.com/v3.1/name/`;
const queryParams = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  

  return fetch(`${url}${name}${queryParams}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
     }

// export function fetchCountries
