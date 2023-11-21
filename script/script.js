const listenToFilter = function(){
    document.querySelector('.js-filterbtn').addEventListener("click", function(){
        document.querySelector(".js-filter").classList.toggle("c-filter__show");
    })
}

const listenToModal = function(){
    const modaltriggers = document.querySelectorAll(".js-modaltrigger");
    console.log(modaltriggers);
    for (const trigger of modaltriggers){
        trigger.addEventListener("click", function(){
            document.querySelector(".js-modal").classList.toggle("c-modal__show");
            document.querySelector(".c-modal__close").focus();
        })
    }
}

const init = function(){
    listenToFilter();
    listenToModal();
}

document.addEventListener('DOMContentLoaded',init);