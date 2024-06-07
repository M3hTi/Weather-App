//Weather App
let getButtonElement = document.querySelector('.js-getWeather');
console.log(getButtonElement);
let cityInputElement = document.querySelector('.js-cityInput');
console.log(cityInputElement);
let cardElement = document.querySelector(".js-card");
console.log(cardElement);
let apiKey = "d5aa971b36ef3cfed3825241a3daef56";


getButtonElement.onclick = async function () {
    const city = cityInputElement.value;
    // console.log(city);
    if(city){
        try{
            let weatherData =  await getWeatherData(city);
            // console.log(weatherData);
            displayWeatherData(weatherData);

        }
        catch(error){
            console.error(error);
            errorDisplay(error);
        }
    }else{
        errorDisplay("Pls Enter a city")
    }
}


function displayWeatherData(data) {
    console.log(data);
    const{name , main : {humidity , temp} , weather : [{id, description}]} = data;
    // console.log(name);
    // console.log(humidity);
    // console.log(temp);
    // console.log(id);
    // console.log(description);
    cardElement.innerHTML = '';
    cardElement.classList.remove('none');
    cardElement.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.innerHTML = name;
    tempDisplay.innerHTML = `${(temp - 273).toFixed(2)}°C`;
    humidityDisplay.innerHTML = `Humidity : ${humidity}%`;
    descDisplay.innerHTML = description;
    weatherEmoji.innerHTML = getWeatherEmoji(id);





    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");



    cardElement.appendChild(cityDisplay);
    cardElement.appendChild(tempDisplay);
    cardElement.appendChild(humidityDisplay);
    cardElement.appendChild(descDisplay);
    cardElement.appendChild(weatherEmoji);


    document.querySelector('.js-cityInput').innerHTML = '';
}





function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️"
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"
        case (weatherId === 800):
            return "☀️"
        case (weatherId >= 801 && weatherId < 805):
            return "☁️"  
        default:
            break;
    }
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch (apiUrl);
    console.log(response);
    const data = await response.json();
    if(!response.ok){
        throw new Error("Pls Enter valid city");
    }
    return data ;
}
function errorDisplay(message) {
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = message;
    errorMessage.classList.add('errorDisplay');
    
    
    cardElement.classList.remove("none");
    cardElement.innerHTML= '';
    cardElement.appendChild(errorMessage);
    
}