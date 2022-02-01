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

  const getPositon = function(){
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(resolve, reject );
      // position => resolve(position), err => reject(err)
     
    });
  };


  const whereAmI = async function(){
      const pos  = await getPositon();
    const {latitude: lat,  langitude: lng} =  pos.coords;
    const resGeo = await  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    const res = await  fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
    const data = await res.json();
    // console.log(data);
    renderCountery(data[0]);

  };

  whereAmI();