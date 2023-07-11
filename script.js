const api = {
    key: "2cceed6478141d244abc264ebf7377a8",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector('.search-box');
const main = document.querySelector('.main');

searchBox.addEventListener('keypress', setQuerry)


function setQuerry(e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value)
    }
}

function getResults(querry) {
    fetch(`${api.baseUrl}weather?q=${querry}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json()
        })
        .then(displayResults);

}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;


    alert('New Test')
    
    if(weather.sys.cod=='404'){
        alert('error city')
    }else{
        alert('success');
    }

    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);
    
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)+'°C'}`
    
    
    let weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = weather.weather[0].main;
    
    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
    
    main.style.display = 'block'
}








function dateBuilder(b) {
    let months = ['January','Februrary', 'March', 'April' , 'May', 'June' , 'July', 'September', 'October', 'November', 'December',];
    
    let days = ['Sunday', 'Monday', 'Tuesday' , 'Wednesday', 'Thursday' , 'Friday','Saturday'];
    
    let day = days[b.getDay()];
    let date = b.getDate()
    let month = months[b.getMonth()];
    let year = b.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
}

