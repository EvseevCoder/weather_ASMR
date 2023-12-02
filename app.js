// 3f5a4ad7aa805114ad8d1e422e17ba85

const API_key = '8af1c5ff989e4ea5a5e154729232611';

const locButton = document.querySelector('.loc-button')
const todayInfo = document.querySelector('.today-info')
const todayWeatherIcon = document.querySelector('.today-weather i')
const todayTemp = document.querySelector('.weather-temp')

const dayList = document.querySelector('.days-list')
const weatherIconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water'
}


function dataPlus(number) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    let tomorrow = date.getDate() + 1;

    if (date.getMonth() == 11 && date.getDate() == 31) {
        tomorrow = new Date().setDate(new Date().getDate() + 2);
    } else {
        tomorrow = date.getDate() + number
    }
    date.setDate(tomorrow);


    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }


    if (day < 10) {
        day = '0' + day;
    }

    // нужен формат год-месяц-
    return (`${year}-${month}-${day}`);
}

function fetchWeatherData(location) {
    const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${location}&days=5&aqi=no&alerts=no`
    fetch(apiURL).then(response => response.json()).then(
        data => {
            todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en', { weekday: 'long' })
            todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })

            // todayWeatherIcon - сделать свою иконку

            todayTemp.textContent = data.current.temp_c

            const locationElement = document.querySelector('.today-info > div > span')
            locationElement.textContent = `${data.location.name}, ${data.location.country}`

            const weatherDescElement = document.querySelector('.today-weather > h3')
            weatherDescElement.textContent = data.current.condition.text

            precipation = data.current.precip_mm * 100 + " %"
            humidity = data.current.humidity + " %"
            windSpeed = data.current.wind_kph + " km/h"

            const dayinfoContainer = document.querySelector('.day-info')
            const dayinform = dayinfoContainer.querySelectorAll('span.value')

            const todayIcon = document.querySelector('.todayIcon')
            todayIcon.src = data.forecast.forecastday[0].day.condition.icon

            dayinform[0].textContent = precipation
            dayinform[1].textContent = humidity
            dayinform[2].textContent = windSpeed

            const nextDays = document.querySelectorAll('.days-list li')

            const next1 = nextDays[0].querySelectorAll('span')
            const next2 = nextDays[1].querySelectorAll('span')
            const next3 = nextDays[2].querySelectorAll('span')
            const next4 = nextDays[3].querySelectorAll('span')

            next1[1].textContent = data.forecast.forecastday[1].day.avgtemp_c
            next2[1].textContent = data.forecast.forecastday[2].day.avgtemp_c
            next3[1].textContent = data.forecast.forecastday[3].day.avgtemp_c
            next4[1].textContent = data.forecast.forecastday[4].day.avgtemp_c


            const day1 = new Date(data.forecast.forecastday[1].date)
            const day2 = new Date(data.forecast.forecastday[2].date)
            const day3 = new Date(data.forecast.forecastday[3].date)
            const day4 = new Date(data.forecast.forecastday[4].date)


            next1[0].textContent = day1.toLocaleDateString('en', { weekday: 'short' });
            next2[0].textContent = day2.toLocaleDateString('en', { weekday: 'short' });
            next3[0].textContent = day3.toLocaleDateString('en', { weekday: 'short' });
            next4[0].textContent = day4.toLocaleDateString('en', { weekday: 'short' });


            for (let index = 0; index < nextDays.length; index++) {
                icon = nextDays[index].querySelector('img')

                icon.src = data.forecast.forecastday[index+1].day.condition.icon
            }
        }
    )
}

fetchWeatherData('Bryansk')

let button = document.querySelector('.loc-button')
button.onclick = function () {
    city = prompt('Введите Данные своего города')
    if (city != '') {
        fetchWeatherData(city)
    }

}