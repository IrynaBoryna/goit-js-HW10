import debounce from 'lodash.debounce';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

let inputSearch = "";
let countriesArray = [];


const refs = {
  input: document.querySelector('input#search-box'),
  countryInfoCard: document.querySelector(".country-info"),
  countryList: document.querySelector(".country-list"),
}

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch (e) {
 e.preventDefault();
 inputSearch = e.target.value?.trim();

 if(inputSearch === "") {
  refs.countryList.innerHTML = "";
  refs.countryInfoCard.innerHTML= "";
  return
 }
// clearForm();

fetchCountries(inputSearch)
.then(countriesArray => {
    if(countriesArray.length > 10) {
    Notify.info("Too many matches found. Please enter a more specific name.");
 
  } 
  else  
   if (countriesArray.length === 1) {
    
   const markupCard = countryCard(countriesArray); 
    refs.countryInfoCard.insertAdjacentHTML("beforeend", markupCard);  
 } 
 else {
  
    const markup = countryList(countriesArray); 
   refs.countryList.insertAdjacentHTML("beforeend", markup);
};
})
.catch(() => {
  Notify.failure("Oops, there is no country with that name"); 
  
}); 

}



   function countryCard (countriesArray) {
    return countriesArray
    .map(({name, flags, capital, population, languages }) => {
     return `
      <h2 class="country-title" >
   <img src=${flags.svg} alt="name.common" width = 40px>
   ${name.official}
   </h2>
   <p class="country-capital" style = "font-size: 18px"> Capital: <span style = "font-style: italic">${capital}</span></p>
   <p class="country-population" style = "font-size: 18px">Population:<span style = "font-style: italic"> ${population}</span></p>
   <p class="country-languages" style = "font-size: 18px">Languages: <span style = "font-style: italic">${Object.values(languages).join(", ")}</span></p>
     `;
      }).join('');
  }

  function countryList (countriesArray) {
    return countriesArray
        .map(({name, flags }) => {
    return `
    <li class = "countryListElem" style = "list-style: none">
    <h3 class="country-title" style = "font-style: italic">
   <img src=${flags.svg} alt="${name.common}" width = 40px margin = 15px>
   ${name.official}</h3>
   </li>
    `;
    })
    .join('');
    }

    // function clearForm () {
    //   if(inputSearch === "") {
    //     refs.countryList.innerHTML = "";
    //     refs.countryInfoCard.innerHTML= "";
    //     return
    //    }
    //   };  


      