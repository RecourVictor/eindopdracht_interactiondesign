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
            document.querySelector(".js-modal").showModal();
        })
    }
}

const listenToClose = function(){
    const closebtn = document.querySelector(".js-close");
    closebtn.addEventListener("click", function(){
        console.log("close");
        document.querySelector(".js-modal").close();
    })
}

const init = function(){
    listenToFilter();
    listenToModal();
    listenToClose();
}

document.addEventListener('DOMContentLoaded',init);