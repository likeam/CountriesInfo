'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCounteryDate = function(countery){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${countery}` );
request.send();

request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>Populaion: ${data.population}</p>
      <p class="country__row"><span> </span>Language: ${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>Currency:${data.currencies[0].name}</p>
      <p class="country__row"><span>👫</span>Capital: ${data.capital}</p>

    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});
};
getCounteryDate('pakistan');
getCounteryDate('afganistan');
