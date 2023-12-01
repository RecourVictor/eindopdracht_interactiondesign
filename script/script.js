let filter = [ "grass", "boom", "onkruid" ];

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
            document.body.style.overflowY = "hidden";
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
            document.body.style.overflowY = "hidden";
        })
    }
}

const listenToTwoModal = function(){
    const modaltriggers = document.querySelectorAll(".js-modaltrigger");
    for (const trigger of modaltriggers){
        trigger.addEventListener("click", function(){
            const data = this.dataset.json;
            const type1 = this.dataset.type1;
            const type2 = this.dataset.type2;
            showTwoModalData(data, type1, type2);
            document.querySelector(".js-modal").showModal();
            document.body.style.overflowY = "hidden";
        })
    }
}

const listenToCheckbox = function(){
    const toggles = document.querySelectorAll(".js-toggle");
    for (const toggle of toggles){
        toggle.addEventListener("keydown", function(e){
            if (e.code === "Enter" || e.code === "Space"){
                const checkboxes = document.querySelectorAll(".js-checkbox");
                const checkbox = this.querySelector(".js-checkbox");
                checkbox.checked = !checkbox.checked;
                
                let checkedCount = 0;
                for (const checkbox of checkboxes) {
                    if (checkbox.checked) {
                        checkedCount++;
                    }
                }
                if (checkedCount === 0){
                    checkedCount = 3;
                    filter = [ "grass", "boom", "onkruid"];
                    const checkboxes = document.querySelectorAll(".js-checkbox");
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = true;
                    });
                } else {
                    if (!checkbox.checked) {
                        filter = filter.filter(item => item !== checkbox.value);
                    } else {
                        filter.push(checkbox.value);
                    }
                }
                getdata();
            }
        })
    }
    listenToFilter();
}

const listenToClose = function(){
    const closebtn = document.querySelector(".js-close");
    closebtn.addEventListener("click", function(){
        document.body.style.overflowY = "auto";
        document.querySelector(".js-modal").close();
    })
}

const listenToScroll = function(){
    const scroll = document.querySelector(".js-scroll");
    const visible = scroll.clientWidth;
    const total = scroll.scrollWidth;
    const scrollamount = Math.min(visible, total) / 2;

    const leftbtn = document.querySelector(".js-left");
    const rightbtn = document.querySelector(".js-right");

    leftbtn.addEventListener("click", function(){
        scroll.scrollLeft -= scrollamount;
    })
    rightbtn.addEventListener("click", function(){
        scroll.scrollLeft += scrollamount;
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
    // Show
    document.querySelector(".js-filter1").classList.add("u-hidden");  
    document.querySelector(".js-filter2").classList.add("u-hidden");  
    document.querySelector(".js-overview").classList.remove("u-hidden");
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
    document.querySelector(".js-filter2").classList.add("u-hidden");
    document.querySelector(".js-filter1").classList.remove("u-hidden");
}

const showTwoToday = function(data, type1, type2){
    // Remove classes
    document.querySelector(".js-filter2__gauge1").classList.remove("u-background__grass");
    document.querySelector(".js-filter2__gauge1").classList.remove("u-background__boom");
    document.querySelector(".js-filter2__gauge1").classList.remove("u-background__onkruid");
    document.querySelector(".js-filter2__gauge2").classList.remove("u-background__grass");
    document.querySelector(".js-filter2__gauge2").classList.remove("u-background__boom");
    document.querySelector(".js-filter2__gauge2").classList.remove("u-background__onkruid");

    // Variable
    let variabelefilter1 , variabelefilter2;
    let chartinfo1 = [], chartinfo2 = [];

    // Algemeen
    document.querySelector(".js-filter2__date").innerHTML = data.today.date;
    // Filter 1
    if (type1 === "grass"){
        variabelefilter1 = data.today.pollen_info.graspollen_info;
        chartfilter1 = "graspollen_info";
    } else if (type1 === "boom"){
        variabelefilter1 = data.today.pollen_info.boompollen_info;
        chartfilter1 = "boompollen_info";
    } else if (type1 === "onkruid"){
        variabelefilter1 = data.today.pollen_info.onkruidpollen_info;
        chartfilter1 = "onkruidpollen_info";
    }
    document.querySelector(".js-filter2__description1").innerHTML = variabelefilter1.long_description;
    document.querySelector(".js-filter2__gauge1").classList.add(`u-background__${type1}`);
    document.querySelector(".js-filter2__type1").innerHTML = variabelefilter1.type;
    document.querySelector(".js-filter2__percent1").innerHTML = variabelefilter1.percentage + "%";
    document.querySelector(".js-filter2__word1").innerHTML = variabelefilter1.concentration;
    document.querySelector(".js-filter2__words1").innerHTML = variabelefilter1.short_description;
    document.querySelector(".js-filter2__pin1").style.transform = `rotate(${calculatePin(variabelefilter1.percentage)}deg)`;
    document.querySelector(".js-filter2__chartinfo1").innerHTML = variabelefilter1.type;
    // Filter 2
    if (type2 === "grass"){
        variabelefilter2 = data.today.pollen_info.graspollen_info;
        chartfilter2 = "graspollen_info";
    } else if (type2 === "boom"){
        variabelefilter2 = data.today.pollen_info.boompollen_info;
        chartfilter2 = "boompollen_info";
    } else if (type2 === "onkruid"){
        variabelefilter2 = data.today.pollen_info.onkruidpollen_info;
        chartfilter2 = "onkruidpollen_info";
    }
    document.querySelector(".js-filter2__description2").innerHTML = variabelefilter2.long_description;
    document.querySelector(".js-filter2__gauge2").classList.add(`u-background__${type2}`);
    document.querySelector(".js-filter2__type2").innerHTML = variabelefilter2.type;
    document.querySelector(".js-filter2__percent2").innerHTML = variabelefilter2.percentage + "%";
    document.querySelector(".js-filter2__word2").innerHTML = variabelefilter2.concentration;
    document.querySelector(".js-filter2__words2").innerHTML = variabelefilter2.short_description;
    document.querySelector(".js-filter2__pin2").style.transform = `rotate(${calculatePin(variabelefilter2.percentage)}deg)`;
    document.querySelector(".js-filter2__chartinfo2").innerHTML = variabelefilter2.type;
    // Chart
    for (const day of data.forecast){
        chartinfo1.push(day.pollen_info[chartfilter1].percentage);
        chartinfo2.push(day.pollen_info[chartfilter2].percentage);
    }
    let html = "";
    let teller = 0;
    for (const day of chartinfo1){
        html += `<div class="c-chart__group"><div class="c-chart__bar" style="height: ${day}%;"><span class="c-chart__percent">${day}%</span></div><div class="c-chart__bar c-chart__bar--2" style="height: ${chartinfo2[teller]}%;"><span class="c-chart__percent">${chartinfo2[teller]}%</span></div></div>`;
        teller++;
    }
    document.querySelector(".js-filter2__chart").innerHTML = html;
    // Show
    document.querySelector(".js-overview").classList.add("u-hidden");
    document.querySelector(".js-filter1").classList.add("u-hidden");
    document.querySelector(".js-filter2").classList.remove("u-hidden");
}

const showForecast = function(data){
    let html = "";
    for (const day of data.forecast){
        html += `<button data-json='${JSON.stringify(day)}' class="c-scroll__item js-modaltrigger"><h3 class="c-forecast__title">${day.date}</h3><p class="c-forecast__description">${day.short_description}</p><div class="c-forecast__1 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info.graspollen_info.percentage)}deg)"></div></div></div><h5>Graspollen</h5><p>${day.pollen_info.graspollen_info.concentration}</p></div><div class="c-forecast__2 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info.boompollen_info.percentage)}deg)"></div></div></div><h5>Boompollen</h5><p>${day.pollen_info.boompollen_info.concentration}</p></div><div class="c-forecast__3 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info.onkruidpollen_info.percentage)}deg)"></div></div></div><h5>Onkruidpollen</h5><p>${day.pollen_info.onkruidpollen_info.concentration}</p></div></button>`
    }
    document.querySelector(".js-scroll").classList.remove("c-scrollfilter1");
    document.querySelector(".js-scroll").classList.remove("c-scrollfilter2");
    document.querySelector(".js-scroll").innerHTML = html;
    listenToModal();
    listenToScroll();
}

const showOneForecast = function(data, type){
    let html = "";

    for (const day of data.forecast){
        let soort, description, percentage, concentration;

        const json = {
            today : day,
            forecast  : data.forecast
        }

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
        html += `<button data-type="${type}" data-json='${JSON.stringify(json)}' class="c-scroll__item js-modaltrigger"><h3 class="c-forecast__title">${day.date}</h3><p class="c-forecast__description">${description}</p><div class="c-forecast__1 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(percentage)}deg)"></div></div></div><h5>${soort}</h5><p>${concentration}</p></div></button>`
    }
    document.querySelector(".js-scroll").classList.remove("c-scrollfilter2");
    document.querySelector(".js-scroll").classList.add("c-scrollfilter1");
    document.querySelector(".js-scroll").innerHTML = html;
    listenToOneModal();
}

const showTwoForecast = function(data, type1, type2){
    let type1info, type2info;

    if (type1 === "grass"){
        type1info = "graspollen_info";
    } else if (type1 === "boom"){
        type1info = "boompollen_info";
    } else if (type1 === "onkruid"){
        type1info = "onkruidpollen_info";
    }
    if (type2 === "grass"){
        type2info = "graspollen_info";
    } else if (type2 === "boom"){
        type2info = "boompollen_info";
    } else if (type2 === "onkruid"){
        type2info = "onkruidpollen_info";
    }

    let html = "";
    for (const day of data.forecast){

        const json = {
            today : day,
            forecast  : data.forecast
        }

        html += `<button data-type1="${type1}" data-type2="${type2}" data-json='${JSON.stringify(json)}' class="c-scroll__item js-modaltrigger"><h3 class="c-forecast__title">${day.date}</h3><p class="c-forecast__description">${day.pollen_info[type1info].short_description}<br>${day.pollen_info[type2info].short_description}</p><div class="c-forecast__1 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info[type1info].percentage)}deg)"></div></div></div><h5>${day.pollen_info[type1info].type}</h5><p>${day.pollen_info[type1info].concentration}</p></div><div class="c-forecast__2 c-forecast__gauge"><div class="c-gauge"><div class="c-gauge__body"><div class="c-gauge__fill c-gauge__fill--high"></div><div class="c-gauge__fill c-gauge__fill--medium"></div><div class="c-gauge__fill c-gauge__fill--low"></div><div class="c-gauge__cover"></div><div class="c-gauge__pin" style="transform: rotate(${calculatePin(day.pollen_info[type2info].percentage)}deg)"></div></div></div><h5>${day.pollen_info[type2info].type}</h5><p>${day.pollen_info[type2info].concentration}</p></div></button>`;
    }
    document.querySelector(".js-scroll").classList.remove("c-scrollfilter1");
    document.querySelector(".js-scroll").classList.add("c-scrollfilter2");
    document.querySelector(".js-scroll").innerHTML = html;
    listenToTwoModal();
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
    // Show
    document.querySelector(".js-onemodal").classList.add("u-hidden");
    document.querySelector(".js-twomodal").classList.add("u-hidden");
    document.querySelector(".js-modaloverview").classList.remove("u-hidden");
}

const showOneModalData = function(json, type){
    const data = JSON.parse(json);
    // Remove classes
    document.querySelector(".js-onemodal__gauge").classList.remove("u-background__grass");
    document.querySelector(".js-onemodal__gauge").classList.remove("u-background__boom");
    document.querySelector(".js-onemodal__gauge").classList.remove("u-background__onkruid");
    // Algemeen
    document.querySelector(".js-onemodal__date").innerHTML = data.today.date;
    if (type === "grass"){
        // Algmeen
        document.querySelector(".js-onemodal__description").innerHTML = data.today.pollen_info.graspollen_info.long_description;
        // Card
        document.querySelector(".js-onemodal__gauge").classList.add("u-background__grass");
        document.querySelector(".js-onemodal__percent").innerHTML = data.today.pollen_info.graspollen_info.percentage + "%";
        document.querySelector(".js-onemodal__word").innerHTML = data.today.pollen_info.graspollen_info.concentration;
        document.querySelector(".js-onemodal__words").innerHTML = data.today.pollen_info.graspollen_info.short_description;
        document.querySelector(".js-onemodal__pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.graspollen_info.percentage)}deg)`;
        // Chart
        let html = "";
        for (const day of data.forecast){
            html += `<div class="c-chart__bar" style="height: ${day.pollen_info.graspollen_info.percentage}%;"><span class="c-chart__percent">${day.pollen_info.graspollen_info.percentage}%</span></div>`;
        }
        document.querySelector(".js-onemodal__chart").innerHTML = html;
    } else if (type === "boom"){
        // Algmeen
        document.querySelector(".js-onemodal__description").innerHTML = data.today.pollen_info.boompollen_info.long_description;
        // Card
        document.querySelector(".js-onemodal__gauge").classList.add("u-background__boom");
        document.querySelector(".js-onemodal__percent").innerHTML = data.today.pollen_info.boompollen_info.percentage + "%";
        document.querySelector(".js-onemodal__word").innerHTML = data.today.pollen_info.boompollen_info.concentration;
        document.querySelector(".js-onemodal__words").innerHTML = data.today.pollen_info.boompollen_info.short_description;
        document.querySelector(".js-onemodal__pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.boompollen_info.percentage)}deg)`;
        // Chart
        let html = "";
        for (const day of data.forecast){
            html += `<div class="c-chart__bar" style="height: ${day.pollen_info.boompollen_info.percentage}%;"><span class="c-chart__percent">${day.pollen_info.boompollen_info.percentage}%</span></div>`;
        }
        document.querySelector(".js-onemodal__chart").innerHTML = html;
    } else if (type === "onkruid"){
        // Algmeen
        document.querySelector(".js-onemodal__description").innerHTML = data.today.pollen_info.onkruidpollen_info.long_description;
        // Card
        document.querySelector(".js-onemodal__gauge").classList.add("u-background__onkruid");
        document.querySelector(".js-onemodal__percent").innerHTML = data.today.pollen_info.onkruidpollen_info.percentage + "%";
        document.querySelector(".js-onemodal__word").innerHTML = data.today.pollen_info.onkruidpollen_info.concentration;
        document.querySelector(".js-onemodal__words").innerHTML = data.today.pollen_info.onkruidpollen_info.short_description;
        document.querySelector(".js-onemodal__pin").style.transform = `rotate(${calculatePin(data.today.pollen_info.onkruidpollen_info.percentage)}deg)`;
        // Chart
        let html = "";
        for (const day of data.forecast){
            html += `<div class="c-chart__bar" style="height: ${day.pollen_info.onkruidpollen_info.percentage}%;"><span class="c-chart__percent">${day.pollen_info.onkruidpollen_info.percentage}%</span></div>`;
        }
        document.querySelector(".js-onemodal__chart").innerHTML = html;
    }
    document.querySelector(".js-modaloverview").classList.add("u-hidden");
    document.querySelector(".js-twomodal").classList.add("u-hidden");
    document.querySelector(".js-onemodal").classList.remove("u-hidden");
}

const showTwoModalData = function(json, type1, type2){
    const data = JSON.parse(json);
    // Remove classes
    document.querySelector(".js-twomodal__gauge1").classList.remove("u-background__grass");
    document.querySelector(".js-twomodal__gauge1").classList.remove("u-background__boom");
    document.querySelector(".js-twomodal__gauge1").classList.remove("u-background__onkruid");
    document.querySelector(".js-twomodal__gauge2").classList.remove("u-background__grass");
    document.querySelector(".js-twomodal__gauge2").classList.remove("u-background__boom");
    document.querySelector(".js-twomodal__gauge2").classList.remove("u-background__onkruid");

    // Variable
    let variabelefilter1 , variabelefilter2;
    let chartinfo1 = [], chartinfo2 = [];

    // Algemeen
    document.querySelector(".js-twomodal__date").innerHTML = data.today.date;
    // Filter 1
    if (type1 === "grass"){
        variabelefilter1 = data.today.pollen_info.graspollen_info;
        chartfilter1 = "graspollen_info";
    } else if (type1 === "boom"){
        variabelefilter1 = data.today.pollen_info.boompollen_info;
        chartfilter1 = "boompollen_info";
    } else if (type1 === "onkruid"){
        variabelefilter1 = data.today.pollen_info.onkruidpollen_info;
        chartfilter1 = "onkruidpollen_info";
    }
    document.querySelector(".js-twomodal__description1").innerHTML = variabelefilter1.long_description;
    document.querySelector(".js-twomodal__gauge1").classList.add(`u-background__${type1}`);
    document.querySelector(".js-twomodal__type1").innerHTML = variabelefilter1.type;
    document.querySelector(".js-twomodal__percent1").innerHTML = variabelefilter1.percentage + "%";
    document.querySelector(".js-twomodal__word1").innerHTML = variabelefilter1.concentration;
    document.querySelector(".js-twomodal__words1").innerHTML = variabelefilter1.short_description;
    document.querySelector(".js-twomodal__pin1").style.transform = `rotate(${calculatePin(variabelefilter1.percentage)}deg)`;
    document.querySelector(".js-twomodal__chartinfo1").innerHTML = variabelefilter1.type;
    // // Filter 2
    if (type2 === "grass"){
        variabelefilter2 = data.today.pollen_info.graspollen_info;
        chartfilter2 = "graspollen_info";
    } else if (type2 === "boom"){
        variabelefilter2 = data.today.pollen_info.boompollen_info;
        chartfilter2 = "boompollen_info";
    } else if (type2 === "onkruid"){
        variabelefilter2 = data.today.pollen_info.onkruidpollen_info;
        chartfilter2 = "onkruidpollen_info";
    }
    document.querySelector(".js-twomodal__description2").innerHTML = variabelefilter2.long_description;
    document.querySelector(".js-twomodal__gauge2").classList.add(`u-background__${type2}`);
    document.querySelector(".js-twomodal__type2").innerHTML = variabelefilter2.type;
    document.querySelector(".js-twomodal__percent2").innerHTML = variabelefilter2.percentage + "%";
    document.querySelector(".js-twomodal__word2").innerHTML = variabelefilter2.concentration;
    document.querySelector(".js-twomodal__words2").innerHTML = variabelefilter2.short_description;
    document.querySelector(".js-twomodal__pin2").style.transform = `rotate(${calculatePin(variabelefilter2.percentage)}deg)`;
    document.querySelector(".js-twomodal__chartinfo2").innerHTML = variabelefilter2.type;
    // // Chart
    for (const day of data.forecast){
        chartinfo1.push(day.pollen_info[chartfilter1].percentage);
        chartinfo2.push(day.pollen_info[chartfilter2].percentage);
    }
    let html = "";
    let teller = 0;
    for (const day of chartinfo1){
        html += `<div class="c-chart__group"><div class="c-chart__bar" style="height: ${day}%;"><span class="c-chart__percent">${day}%</span></div><div class="c-chart__bar c-chart__bar--2" style="height: ${chartinfo2[teller]}%;"><span class="c-chart__percent">${chartinfo2[teller]}%</span></div></div>`;
        teller++;
    }
    document.querySelector(".js-twomodal__chart").innerHTML = html;
    // Show
    document.querySelector(".js-modaloverview").classList.add("u-hidden");
    document.querySelector(".js-onemodal").classList.add("u-hidden");
    document.querySelector(".js-twomodal").classList.remove("u-hidden");

}

const showdata = function(data){
    if (filter.length >= 3){
        showToday(data);
        showForecast(data);    
    } else if (filter.length === 1){
        showOneToday(data, filter[0]);
        showOneForecast(data, filter[0]);
    } else if (filter.length === 2){
        showTwoToday(data, filter[0], filter[1]);
        showTwoForecast(data, filter[0], filter[1]);
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
// const listenToFilter = function () {
//     const checkboxes = document.querySelectorAll(".js-checkbox");
//     for (const checkbox of checkboxes) {
//         checkbox.addEventListener("change", function () {
//             filter = [];
//             for (const otherCheckbox of checkboxes) {
//                 if (otherCheckbox !== checkbox) {
//                     otherCheckbox.checked = false;
//                 }
//             }
//             if (checkbox.checked) {
//                 const value = checkbox.value;
//                 filter = [value];
//             }
//             getdata();
//         })
//     }
// }

// 2 filters
const listenToFilter = function () {
    const checkboxes = document.querySelectorAll(".js-checkbox");
    for (const checkbox of checkboxes) {
        checkbox.addEventListener("change", function () {
            let checkedCount = 0;
            for (const checkbox of checkboxes) {
                if (checkbox.checked) {
                    checkedCount++;
                }
            }
            if (checkedCount === 0){
                checkedCount = 3;
                filter = [ "grass", "boom", "onkruid"];
                const checkboxes = document.querySelectorAll(".js-checkbox");
                checkboxes.forEach(checkbox => {
                    checkbox.checked = true;
                });
            } else {
                if (!checkbox.checked) {
                    filter = filter.filter(item => item !== checkbox.value);
                } else {
                    filter.push(checkbox.value);
                }
            }
            getdata();
        })
    }
}

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