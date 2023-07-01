const API_KEY = "{API KEY HERE}"

let form = document.querySelector('.form');

let sunny = "<i class=\"fa fa-sun-o fa-2x\" style=\"margin-right:1rem\"></i>"
let cloudy = "<i class=\"fa fa-cloud fa-2x\" style=\"margin-right:1rem\"></i>"

const populateElements = (data, city) => {

    // console.log(data);
    const date = new Date().toGMTString('en-IN');
    document.querySelector('.cityName').innerText = city;
    document.querySelector('.date').innerText = date;
    document.querySelector('.tempHigh').innerHTML = data.max_temp;
    document.querySelector('.tempLow').innerText = data.min_temp;
    // document.querySelector('.weatherType').innerHTML = weather;
    document.querySelector('.humidity').innerText = data.humidity;
    document.querySelector('.cloudPer').innerText = data.cloud_pct;
    document.querySelector('.windSpeed').innerText = data.wind_speed;
    document.querySelector('.windDir').innerText = data.wind_degrees;
    document.querySelector('.tempFeel').innerText = data.feels_like;

    if (data.cloud_pct > 60) {
        document.querySelector('.temparature').innerHTML = cloudy + data.temp + "<i class=\"fa fa-circle-o\"style=\"font-size: .7rem;margin-right: 5px;margin-bottom: 10px;\"></i>C";
    } else {
        document.querySelector('.temparature').innerHTML = sunny + data.temp + "<i class=\"fa fa-circle-o\"style=\"font-size: .7rem;margin-right: 5px;margin-bottom: 10px;\"></i>C";
    }

    if (data.temp > 35) {
        document.querySelector('.weatherType').innerHTML = "Sunny";
    } else if (data.temp < 22) {
        document.querySelector('.weatherType').innerHTML = "Cloudy";
    } else {
        document.querySelector('.weatherType').innerHTML = "Gentle Breeze";
    }

}

const getWeather = async (event) => {
    event.preventDefault();

    const city = form[0].value || 'kolkata';

    url = 'https://api.api-ninjas.com/v1/weather?city=' + city;

    const modal = document.getElementById('modal-wrapper');
    modal.style.display = "block";

    const data = await fetch(url, {
        method: 'GET',
        headers: { 'X-Api-Key': API_KEY },
        contentType: 'application/json'
    }).then(data => data.json())

    let minTemp = data.min_temp;
    let maxTemp = data.max_temp;
    let cldper = data.cloud_pct;
    let humidity = data.humidity;
    let temp = data.temp;
    let wdir = data.wind_degrees;
    let wspeed = data.wind_speed;

    form[0].value = '';

    populateElements(data, city);
    modal.style.display = "none";
}

form.addEventListener('submit', getWeather)

