let filter = [];

// Frontend
const listenToFilterTab = function(){
    document.querySelector('.js-filterbtn').addEventListener("click", function(){
        document.querySelector(".js-filter").classList.toggle("c-filter__show");

        const filters = document.querySelectorAll(".js-toggle");
        for (const filter of filters){
            if (filter.hasAttribute("tabindex")){
                filter.removeAttribute("tabindex");
            } else {
                filter.setAttribute("tabindex", "0");
            }
        }
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

const listenToOneModal = function(){
    const modaltriggers = document.querySelectorAll(".js-modaltrigger");
    for (const trigger of modaltriggers){
        trigger.addEventListener("click", function(){
            const data = this.dataset.json;
            const type = this.dataset.type;
            showOneModalData(data, type);
            document.querySelector(".js-modal").showModal();
        })
    }
}

const listenToCheckbox = function(){
    const toggles = document.querySelectorAll(".js-toggle");
    for (const toggle of toggles){
        toggle.addEventListener("keydown", function(e){
            if (e.code === "Enter" || e.code === "Space"){
                const checkbox = toggle.querySelector(".js-checkbox")
                checkbox.checked = !checkbox.checked;
            }
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
const calculatePin = function(percentage){
    const rotatie = (percentage - 50) * 1.8;
    return rotatie;
}

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
    document.querySelector(".js-today__grass--pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.graspollen_info.percentage)}deg)`;
    // Boom
    document.querySelector(".js-today__boom--description").innerHTML = data.today.pollen_info.boompollen_info.long_description;
    document.querySelector(".js-today__boom--percent").innerHTML = data.today.pollen_info.boompollen_info.percentage + "%";
    document.querySelector(".js-today__boom--word").innerHTML = data.today.pollen_info.boompollen_info.concentration;
    document.querySelector(".js-today__boom--words").innerHTML = data.today.pollen_info.boompollen_info.short_description;
    document.querySelector(".js-today__boom--pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.boompollen_info.percentage)}deg)`;
    // Onkruid
    document.querySelector(".js-today__onkruid--description").innerHTML = data.today.pollen_info.onkruidpollen_info.long_description;
    document.querySelector(".js-today__onkruid--percent").innerHTML = data.today.pollen_info.onkruidpollen_info.percentage + "%";
    document.querySelector(".js-today__onkruid--word").innerHTML = data.today.pollen_info.onkruidpollen_info.concentration;
    document.querySelector(".js-today__onkruid--words").innerHTML = data.today.pollen_info.onkruidpollen_info.short_description;
    document.querySelector(".js-today__onkruid--pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.onkruidpollen_info.percentage)}deg)`;
}

const showOneToday = function(data, type){
    // Remove classes
    document.querySelector(".js-filter1__gauge").classList.remove("u-background__grass");
    document.querySelector(".js-filter1__gauge").classList.remove("u-background__boom");
    document.querySelector(".js-filter1__gauge").classList.remove("u-background__onkruid");
    // Algemeen
    document.querySelector(".js-filter1__date").innerHTML = data.today.date;
    if (type === "grass"){
        // Algmeen
        document.querySelector(".js-filter1__description").innerHTML = data.today.pollen_info.graspollen_info.long_description;
        // Card
        document.querySelector(".js-filter1__gauge").classList.add("u-background__grass");
        document.querySelector(".js-filter1__percent").innerHTML = data.today.pollen_info.graspollen_info.percentage + "%";
        document.querySelector(".js-filter1__word").innerHTML = data.today.pollen_info.graspollen_info.concentration;
        document.querySelector(".js-filter1__words").innerHTML = data.today.pollen_info.graspollen_info.short_description;
        document.querySelector(".js-filter1__pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.graspollen_info.percentage)}deg)`;
        // Chart
        let html = "";
        for (const day of data.forecast){
            html += `<div class="c-chart__bar" style="height: ${day.pollen_info.graspollen_info.percentage}%;"><span class="c-chart__percent">${day.pollen_info.graspollen_info.percentage}%</span></div>`;
        }
        document.querySelector(".js-filter1__chart").innerHTML = html;
    } else if (type === "boom"){
        // Algmeen
        document.querySelector(".js-filter1__description").innerHTML = data.today.pollen_info.boompollen_info.long_description;
        // Card
        document.querySelector(".js-filter1__gauge").classList.add("u-background__boom");
        document.querySelector(".js-filter1__percent").innerHTML = data.today.pollen_info.boompollen_info.percentage + "%";
        document.querySelector(".js-filter1__word").innerHTML = data.today.pollen_info.boompollen_info.concentration;
        document.querySelector(".js-filter1__words").innerHTML = data.today.pollen_info.boompollen_info.short_description;
        document.querySelector(".js-filter1__pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.boompollen_info.percentage)}deg)`;
        // Chart
        let html = "";
        for (const day of data.forecast){
            html += `<div class="c-chart__bar" style="height: ${day.pollen_info.boompollen_info.percentage}%;"><span class="c-chart__percent">${day.pollen_info.boompollen_info.percentage}%</span></div>`;
        }
        document.querySelector(".js-filter1__chart").innerHTML = html;
    } else if (type === "onkruid"){
        // Algmeen
        document.querySelector(".js-filter1__description").innerHTML = data.today.pollen_info.onkruidpollen_info.long_description;
        // Card
        document.querySelector(".js-filter1__gauge").classList.add("u-background__onkruid");
        document.querySelector(".js-filter1__percent").innerHTML = data.today.pollen_info.onkruidpollen_info.percentage + "%";
        document.querySelector(".js-filter1__word").innerHTML = data.today.pollen_info.onkruidpollen_info.concentration;
        document.querySelector(".js-filter1__words").innerHTML = data.today.pollen_info.onkruidpollen_info.short_description;
        document.querySelector(".js-filter1__pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.onkruidpollen_info.percentage)}deg)`;
        // Chart
        let html = "";
        for (const day of data.forecast){
            html += `<div class="c-chart__bar" style="height: ${day.pollen_info.onkruidpollen_info.percentage}%;"><span class="c-chart__percent">${day.pollen_info.onkruidpollen_info.percentage}%</span></div>`;
        }
        document.querySelector(".js-filter1__chart").innerHTML = html;
    }

    // Show
    document.querySelector(".js-overview").classList.add("u-hidden");
    document.querySelector(".js-filter1").classList.remove("u-hidden");
}

const showForecast = function(data){
    let html = "";
    for (const day of data.forecast){
        html += `<button data-json='${JSON.stringify(day)}' class="c-scroll__item js-modaltrigger"><h3 class="c-forecast__title">${day.date}</h3><p class="c-forecast__description">${day.short_description}</p><div class="c-forecast__1 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info.graspollen_info.percentage)}deg)"></div></div></div><h5>Graspollen</h5><p>${day.pollen_info.graspollen_info.concentration}</p></div><div class="c-forecast__2 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info.boompollen_info.percentage)}deg)"></div></div></div><h5>Boompollen</h5><p>${day.pollen_info.boompollen_info.concentration}</p></div><div class="c-forecast__3 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info.onkruidpollen_info.percentage)}deg)"></div></div></div><h5>Onkruidpollen</h5><p>${day.pollen_info.onkruidpollen_info.concentration}</p></div></button>`
    }
    document.querySelector(".js-scroll").classList.remove("c-scrollfilter1");
    document.querySelector(".js-scroll").innerHTML = html;
    listenToModal();
}

const showOneForecast = function(data, type){
    console.log(data);
    console.log(type);

    let html = "";

    for (const day of data.forecast){
        console.log(day);
        console.log(day.date)
        let soort, description, percentage, concentration;

        if (type === "grass"){
            soort = "Graspollen";
            description = day.pollen_info.graspollen_info.short_description;
            percentage = day.pollen_info.graspollen_info.percentage;
            concentration = day.pollen_info.graspollen_info.concentration;
        } else if (type === "boom"){
            soort = "Boompollen";
            description = day.pollen_info.boompollen_info.short_description;
            percentage = day.pollen_info.boompollen_info.percentage;
            concentration = day.pollen_info.boompollen_info.concentration;
        } else if (type === "onkruid"){
            soort = "Onkruidpollen";
            description = day.pollen_info.onkruidpollen_info.short_description;
            percentage = day.pollen_info.onkruidpollen_info.percentage;
            concentration = day.pollen_info.onkruidpollen_info.concentration;
        }
        html += `<button data-type="${type}" data-json='${JSON.stringify(day)}' class="c-scroll__item js-modaltrigger"><h3 class="c-forecast__title">${day.date}</h3><p class="c-forecast__description">${description}</p><div class="c-forecast__1 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(percentage)}deg)"></div></div></div><h5>${soort}</h5><p>${concentration}</p></div></button>`
    }
    document.querySelector(".js-scroll").classList.add("c-scrollfilter1");
    document.querySelector(".js-scroll").innerHTML = html;
    listenToOneModal();
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
    document.querySelector(".js-modal__grass--pin").style.transform = `rotate(${calculatePin(data.pollen_info.graspollen_info.percentage)}deg)`;
    // Boom
    document.querySelector(".js-modal__boom--description").innerHTML = data.pollen_info.boompollen_info.long_description;
    document.querySelector(".js-modal__boom--percent").innerHTML = data.pollen_info.boompollen_info.percentage + "%";
    document.querySelector(".js-modal__boom--word").innerHTML = data.pollen_info.boompollen_info.concentration;
    document.querySelector(".js-modal__boom--words").innerHTML = data.pollen_info.boompollen_info.short_description;
    document.querySelector(".js-modal__boom--pin").style.transform = `rotate(${calculatePin(data.pollen_info.boompollen_info.percentage)}deg)`;
    // Onkruid
    document.querySelector(".js-modal__onkruid--description").innerHTML = data.pollen_info.onkruidpollen_info.long_description;
    document.querySelector(".js-modal__onkruid--percent").innerHTML = data.pollen_info.onkruidpollen_info.percentage + "%";
    document.querySelector(".js-modal__onkruid--word").innerHTML = data.pollen_info.onkruidpollen_info.concentration;
    document.querySelector(".js-modal__onkruid--words").innerHTML = data.pollen_info.onkruidpollen_info.short_description;
    document.querySelector(".js-modal__onkruid--pin").style.transform = `rotate(${calculatePin(data.pollen_info.onkruidpollen_info.percentage)}deg)`;
}

const showOneModalData = function(json, type){
    console.log(json);
    console.log(type);
    const data = JSON.parse(json);

    // Remove classes
    document.querySelector(".js-onemodal__gauge").classList.remove("u-background__grass");
    document.querySelector(".js-onemodal__gauge").classList.remove("u-background__boom");
    document.querySelector(".js-onemodal__gauge").classList.remove("u-background__onkruid");
    // Algemeen
    document.querySelector(".js-onemodal__date").innerHTML = data.date;
    if (type === "grass"){
        // Algmeen
        document.querySelector(".js-onemodal__description").innerHTML = data.pollen_info.graspollen_info.long_description;
    } else if (type === "boom"){
        // Algmeen
        document.querySelector(".js-onemodal__description").innerHTML = data.pollen_info.boompollen_info.long_description;
    } else if (type === "onkruid"){
        // Algmeen
        document.querySelector(".js-onemodal__description").innerHTML = data.pollen_info.onkruidpollen_info.long_description;
    }
}

const showdata = function(data){
    if (filter.length === 0){
        showToday(data);
        showForecast(data);    
    } else if (filter.length === 1){
        showOneToday(data, filter[0]);
        showOneForecast(data, filter[0]);
    }
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

// 1 filter
const listenToFilter = function () {
    const checkboxes = document.querySelectorAll(".js-checkbox");
    for (const checkbox of checkboxes) {
        checkbox.addEventListener("change", function () {
            filter = [];
            for (const otherCheckbox of checkboxes) {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            }
            if (checkbox.checked) {
                const value = checkbox.value;
                filter = [value];
            }
            getdata();
        })
    }
}

// 2 filters
// const listenToFilter = function () {
//     const checkboxes = document.querySelectorAll(".js-checkbox");
//     let checkedCount = 0;

//     for (const checkbox of checkboxes) {
//         checkbox.addEventListener("change", function () {
//             if (checkbox.checked) {
//                 checkedCount++;

//                 if (checkedCount > 2) {
//                     checkbox.checked = false;
//                     checkedCount--;
//                 }
//             } else {
//                 checkedCount--;
//             }

//             const values = Array.from(checkboxes)
//                 .filter((checkbox) => checkbox.checked)
//                 .map((checkbox) => checkbox.value);
            
//             console.log(values);
//         })
//     }
// }

// DOM

const init = function(){
    getdata();
    listenToFilterTab();
    listenToFilter();
    listenToCheckbox();
    // listenToModal();
    listenToClose();
}

document.addEventListener('DOMContentLoaded',init);