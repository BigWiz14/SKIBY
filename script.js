const apiKey = 'b49dee0d182c0131ec6cf3deae6de2bf';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Replace 'London' with your city or
const serchBox = document.querySelector(".search input");
const serchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);  //fetching the data from openweathermap API.
    let data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
    document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "clouds"){
        weatherIcon.src = './img/cloudy.png';
    }else if(data.weather[0].main == "clear"){
        weatherIcon.src = './img/sun.png';
    } else if(data.weather[0].main == 'rain'){
        weatherIcon.src = "img/rainy-day(1).png";
    } else if(data.weather[0].main == 'drizzle'){
        weatherIcon.src = "img/rainy-day.png";
    } else if(data.weather[0].main == 'mist'){
        weatherIcon.src = "img/fog.png";
    }
}

serchBtn.addEventListener( "click", () => { 
    checkWeather(serchBox.value);
});




// checkWeather(city);





