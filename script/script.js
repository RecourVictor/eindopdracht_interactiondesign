const listenToFilter = function(){
    document.querySelector('.js-filterbtn').addEventListener("click", function(){
        document.querySelector(".js-filter").classList.toggle("c-filter__show");
    })
}

const init = function(){
    listenToFilter();
}

document.addEventListener('DOMContentLoaded',init);