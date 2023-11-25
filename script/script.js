let data;

// Frontend
const listenToFilter = function(){
    document.querySelector('.js-filterbtn').addEventListener("click", function(){
        document.querySelector(".js-filter").classList.toggle("c-filter__show");
    })
}

const listenToModal = function(){
    const modaltriggers = document.querySelectorAll(".js-modaltrigger");
    for (const trigger of modaltriggers){
        trigger.addEventListener("click", function(){
            const data = this.dataset.json;
            showModalData(data);
            document.querySelector(".js-modal").showModal();
        })
    }
}

const listenToClose = function(){
    const closebtn = document.querySelector(".js-close");
    closebtn.addEventListener("click", function(){
        document.querySelector(".js-modal").close();
    })
}

// Backend
const showToday = function(data){
    // Algemeen
    document.querySelector('.js-today__description').innerHTML = data.today.long_description;
    document.querySelector('.js-today__date').innerHTML = data.today.date;
    document.querySelector(".js-today__temp").innerHTML = data.today.weather_conditions.temperature;
    document.querySelector(".js-today__neerslag").innerHTML = data.today.weather_conditions.rainfall;
    document.querySelector(".js-today__wind").innerHTML = data.today.weather_conditions.wind_speed;
    document.querySelector(".js-today__uv").innerHTML = data.today.uv_index;
    // Grass
    document.querySelector(".js-today__grass--description").innerHTML = data.today.pollen_info.graspollen_info.long_description;
    document.querySelector(".js-today__grass--percent").innerHTML = data.today.pollen_info.graspollen_info.percentage + "%";
    document.querySelector(".js-today__grass--word").innerHTML = data.today.pollen_info.graspollen_info.concentration;
    document.querySelector(".js-today__grass--words").innerHTML = data.today.pollen_info.graspollen_info.short_description;
        // PIN TOEVEOGEN
    // Boom
    document.querySelector(".js-today__boom--description").innerHTML = data.today.pollen_info.boompollen_info.long_description;
    document.querySelector(".js-today__boom--percent").innerHTML = data.today.pollen_info.boompollen_info.percentage + "%";
    document.querySelector(".js-today__boom--word").innerHTML = data.today.pollen_info.boompollen_info.concentration;
    document.querySelector(".js-today__boom--words").innerHTML = data.today.pollen_info.boompollen_info.short_description;
        // PIN TOEVEOGEN
    // Onkruid
    document.querySelector(".js-today__onkruid--description").innerHTML = data.today.pollen_info.onkruidpollen_info.long_description;
    document.querySelector(".js-today__onkruid--percent").innerHTML = data.today.pollen_info.onkruidpollen_info.percentage + "%";
    document.querySelector(".js-today__onkruid--word").innerHTML = data.today.pollen_info.onkruidpollen_info.concentration;
    document.querySelector(".js-today__onkruid--words").innerHTML = data.today.pollen_info.onkruidpollen_info.short_description;
        // PIN TOEVEOGEN
}

const showForecast = function(data){
    let html = "";
    for (const day of data.forecast){
        // console.log(day.pollen_info.graspollen_info.percentage)
        // console.log(day.pollen_info.boompollen_info.percentage)
        // console.log(day.pollen_info.onkruidpollen_info.percentage)
            // PIN TOEVEOGEN    
        html += `<button data-json='${JSON.stringify(day)}' class="c-scroll__item js-modaltrigger"><h3 class="c-forecast__title">${day.date}</h3><p class="c-forecast__description">${day.short_description}</p><div class="c-forecast__1 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin"></div></div></div><h5>Graspollen</h5><p>${day.pollen_info.graspollen_info.concentration}</p></div><div class="c-forecast__2 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin"></div></div></div><h5>Boompollen</h5><p>${day.pollen_info.boompollen_info.concentration}</p></div><div class="c-forecast__3 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin"></div></div></div><h5>Onkruidpollen</h5><p>${day.pollen_info.onkruidpollen_info.concentration}</p></div></button>`
    }
    document.querySelector(".js-scroll").innerHTML = html;
    listenToModal();
}

const showModalData = function(json){
    const data = JSON.parse(json);
    document.querySelector(".js-modal__date").innerHTML = data.date;
    document.querySelector(".js-modal__description").innerHTML = data.long_description;
    document.querySelector(".js-modal__temp").innerHTML = data.weather_conditions.temperature;
    document.querySelector(".js-modal__neerslag").innerHTML = data.weather_conditions.rainfall;
    document.querySelector(".js-modal__wind").innerHTML = data.weather_conditions.wind_speed;
    document.querySelector(".js-modal__uv").innerHTML = data.uv_index;
    // Grass
    document.querySelector(".js-modal__grass--description").innerHTML = data.pollen_info.graspollen_info.long_description;
    document.querySelector(".js-modal__grass--percent").innerHTML = data.pollen_info.graspollen_info.percentage + "%";
    document.querySelector(".js-modal__grass--word").innerHTML = data.pollen_info.graspollen_info.concentration;
    document.querySelector(".js-modal__grass--words").innerHTML = data.pollen_info.graspollen_info.short_description;
        // PIN TOEVEOGEN
    // Boom
    document.querySelector(".js-modal__boom--description").innerHTML = data.pollen_info.boompollen_info.long_description;
    document.querySelector(".js-modal__boom--percent").innerHTML = data.pollen_info.boompollen_info.percentage + "%";
    document.querySelector(".js-modal__boom--word").innerHTML = data.pollen_info.boompollen_info.concentration;
    document.querySelector(".js-modal__boom--words").innerHTML = data.pollen_info.boompollen_info.short_description;
        // PIN TOEVEOGEN
    // Onkruid
    document.querySelector(".js-modal__onkruid--description").innerHTML = data.pollen_info.onkruidpollen_info.long_description;
    document.querySelector(".js-modal__onkruid--percent").innerHTML = data.pollen_info.onkruidpollen_info.percentage + "%";
    document.querySelector(".js-modal__onkruid--word").innerHTML = data.pollen_info.onkruidpollen_info.concentration;
    document.querySelector(".js-modal__onkruid--words").innerHTML = data.pollen_info.onkruidpollen_info.short_description;
        // PIN TOEVEOGEN
}

const showdata = function(data){
    showToday(data);
    showForecast(data);
}  

const getdata = function(){
    fetch('../assets/json/pollenradar.json')
    .then(function(response){
        return response.json();
    })
    .then(function(myJson){
        showdata(myJson);
    })
}

// DOM

const init = function(){
    getdata();
    listenToFilter();
    listenToModal();
    listenToClose();
}

document.addEventListener('DOMContentLoaded',init);