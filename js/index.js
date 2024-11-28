import {getWeather} from './APIWork.js'
import {getWeatherFetch} from './APIWork.js'
const searchLineNode = document.querySelector('#search-line')
const weatherCards = document.querySelectorAll('.ciy-card')

let cities = [
    ['sq', 'Albania'],
    ['af', 'Afrika'],
    ['ar', 'Arab'],
    ['az', 'Azerbaijan'],
    ['eu', 'Basque'],
    ['be', 'Belarusia'],
    ['bg', 'Bulgaria'],
    ['ca', 'Catalan'],
    ['zh_cn', 'China'],
    ['zh_tw', 'China'],
    ['hr', 'Croatia'],
    ['cz', 'Czech'],
    ['da', 'Denmark'],
    ['nl', 'Holland'],
    ['en', 'English'],
    ['fi', 'Finland'],
    ['fr', 'French'],
    ['gl', 'Galicia'],
    ['de', 'German'],
    ['el', 'Greece'],
    ['hi', 'Hindi'],
    ['hu', 'Hungaria'],
    ['is', 'Iceland'],
    ['id', 'Indonesia'],
    ['it', 'Italia'],
    ['ja', 'Japan'],
    ['kr', 'Korea'],
    ['ku', 'Kurdistan'],
    ['la', 'Latvia'],
    ['lt', 'Lithuania'],
    ['mk', 'Macedonia'],
    ['no', 'Norwegia'],
    ['fa', 'Persia'],
    ['pl', 'Poland'],
    ['pt', 'Portugal'],
    ['pt_br', 'Português', 'Brasil'],
    ['ro', 'Romania'],
    ['ru', 'Russia'],
    ['sr', 'Serbia'],
    ['sk', 'Slovak'],
    ['sl', 'Slovenia'],
    ['sp', 'es', 'Spanish'],
    ['sv', 'se', 'Sweden'],
    ['th', 'Thailand'],
    ['tr', 'Turkey'],
    ['ua', 'uk', 'Ukraine'],
    ['vi', 'Vietnam'],
    ['zu', 'Zulu']
]

fillCards(cities)

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && searchLineNode.value != null && searchLineNode.value != '')
        promiseWork(searchLineNode.value)
})

function promiseWork(city) {
    getWeather(city)
        .then(answer => {showWeather(answer, city)})
        .catch(answer => {console.log(`ERROR: ${answer}`)})
}

function fillCards(arr) {
    let fillData = fillCardsData()
    for (let i = 0; i <= 2; i++) {
        let randI = Math.floor(Math.random() * arr.length);
        getWeatherFetch(arr[randI].at(-1))
            .then(answer => fillData(answer[0]))
            .catch(answer => {console.log(`ERROR: ${answer}`)})
    }
}

function fillCardsData() {
    let i = 0
    return function(t) {
        let card = weatherCards[i].querySelector('.temperature')
        card.innerHTML = Math.floor(t) + '<span class="celcie">°C</span>'
        if (i === 3) i = 0
        i++
        
    }

}

function showWeather(arr, cityName) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = yyyy + '.' + mm + '.' + dd;
    let weatherDiv = document.createElement('div')
    weatherDiv.classList.add('content-wrapper')
    weatherDiv.innerHTML = `
                <div class='container-fluid h-100 inner-part'>
                <div class='row row-cols-1 h-100'>
                    <div class='col h-75 text-center upper-part'>
                        <div class='upper-holder'>
                            <span class='description-text'>${tempComment(arr[0])}</span>
                            <div class='close'><img src='../icons/close.svg'>
                        </div>
                        </div>
                        <img src='../icons/${tempComment(arr[0]).toLowerCase()}.svg' class='weather-icon'>
                    </div>
                    <div class='col h-25 lower-part'>
                        <div class='row lower-part-content h-100'>
                            <div class="col-7 center-content weather-description">
                                <span class='city-name'>${cityName}</span>
                                ${formattedDate}
                            </div>
                            <div class="col-2 buttons center-content">
                                <div class='row h-50 w-100 arrow-button' data-entity='change-data-button-up'><div class='col x-center upward'><img class='arrow' src='../icons/arrow_upward_24dp_E8EAED.svg'></div></div>
                                <div class='row h-50 w-100 arrow-button' data-entity='change-data-button-down'><div class='col x-center downward'><img class='arrow' src='../icons/arrow_downward_24dp_E8EAED.svg'></div></div>
                            </div>
                            <div class="col-3 center-content weather-value"><span>${arr[0]}°C</span></div>
                        </div>
                    </div>
                </div>
            </div>
    `
    let dataSlider = slideData()
    weatherDiv.querySelector('.buttons').addEventListener('click', function (e) {
        dataSlider(e, arr, weatherDiv, cityName, formattedDate)
    });

    weatherDiv.querySelector('.close').addEventListener('click', function () {
        weatherDiv.remove();
    });

    document.body.appendChild(weatherDiv)
}   

function slideData() {

    let counter = 0 

    return function(e, arr, htmlElem, cityNm, formatDate) {
        console.log(counter)
        let changeDirection = e.target.closest('.row').getAttribute('data-entity')
        let weatherDescriptionNode = htmlElem.querySelector('.weather-description')
        let weatherDescriptionNodeVal = htmlElem.querySelector('.weather-value')
        let htmlForElemDescription = ``
        let htmlForElemValue = ``
        if (changeDirection.split('-')[3] == 'up') {
            if (counter <= 0) return
            counter-=1
        } 
        else if (changeDirection.split('-')[3] == 'down') {
            if (counter >= 2) return
            counter+=1
        }

        switch (counter) {
            case 0: 
                htmlForElemDescription = `<span class='city-name'>${cityNm}</span>
                                ${formatDate}`
                htmlForElemValue = `<span>${arr[0]}°C</span>`
                break
            case 1: 
                htmlForElemDescription = `<span class='city-name'>Feels like</span>`
                htmlForElemValue = `<span>${arr[1]}°C</span>`
                break
            case 2:
                htmlForElemDescription = `<span class='city-name'>wind speed</span>`
                htmlForElemValue = `<span>${Math.floor((arr[2] / 1000) * 3600)} km/h</span>`
                break
        }
        
        weatherDescriptionNode.innerHTML = htmlForElemDescription
        weatherDescriptionNodeVal.innerHTML = htmlForElemValue
        

    }
}


function tempComment(tmp) {
    if (tmp >= -15 && tmp <= 0) return 'slightly cold';
    else if (tmp >= -30 && tmp < -15) return 'cold';
    else if (tmp >= -60 && tmp < -30) return 'very cold';
    else if (tmp > 0 && tmp <= 15) return 'slightly warm';
    else if (tmp > 15 && tmp <= 30) return 'hot';
    else if (tmp > 30 && tmp <= 60) return 'very hot';
}





