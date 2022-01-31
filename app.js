'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountery= function(data, className = ''){
    const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span> ${data.population}</p>
        <p class="country__row"><span>  </span>Language: ${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>Currency:${data.currencies[0].name}</p>
        <p class="country__row"><span>👫</span>Capital: ${data.capital}</p>
        <p></p>
  
      </div>
    </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  };




const request = fetch(`https://restcountries.com/v2/name/pakistan`);
console.log(request);


const getCountryData = function(country){
    fetch(`https://restcountries.com/v2/name/${country}`).then(response => response.json()).then(data => {
         renderCountery(data[0]);
         const neighbour = data[0].borders[0];
         if (!neighbour) return;
        
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
      
        }
    ).then(response =>response.json()).then(data => renderCountery(data, 'neighbour'));
};

const getPositon = function(){
  return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject );
    // position => resolve(position), err => reject(err)
   
  });
};
 getPositon().then(pos => console.log(pos));


const whereAmI = function(){

  
   getPositon().then(pos => {
    const {latitude: lat,  langitude: lng} =  pos.coords;
    return  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  }).then(res => res.json()).then(data => {
  console.log(data);
  console.log(`You are in ${data.city}, ${data.country}`);
  return  fetch(`https://restcountries.com/v2/name/${data.country}`);
  } ).then(res => {
      if (!res.ok) throw new Error(`Countery not found (${res.status})`);
      return res.json();
  }).then(data => renderCountery(data[0])).catch(err => console.error(`${err.massage} `));
};


btn.addEventListener('click', whereAmI);
  
    // getCountryData('nepal');
    // getCountryData('sri lanka');
    // getCountryData('bangladesh');
    // getCountryData('iran');
    // getCountryData('Republic of India   ');




