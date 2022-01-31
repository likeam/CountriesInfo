'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////
const renderCountery= function(data, className = ''){
  const html = `<article class="country ${className}+">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span> ${data.population}</p>
      <p class="country__row"><span>:</span>Language: ${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>Currency:${data.currencies[0].name}</p>
      <p class="country__row"><span>👫</span>Capital: ${data.capital}</p>
      <p></p>

    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
const getCounteryAndNaighbour = function(countery){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${countery}` );
request.send();

request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountery(data);

     const [neighbour] = data.borders;
     if (!neighbour) return;
     const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}` );
    request2.send();
    request2.addEventListener('load', function(){
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountery(data2, 'neighbour');
    });

});
};
getCounteryAndNaighbour('pakistan');
// getCounteryAndNaighbour('uae');
