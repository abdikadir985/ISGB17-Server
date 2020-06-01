'use strict';
let socket = io();
window.addEventListener('load',function(){
    const button = document.querySelector('.btn');
    button.addEventListener('click',function(event){
        try{
            event.preventDefault();
            if(document.getElementById('msg').value.length<2){
                throw "Texten måste vara minst 2 tecken";
            }
        }catch(error){
            const div  = document.querySelector('.row');
            if(!div.querySelector('p')){
                const errorP = document.createElement('p');
                errorP.setAttribute('style','color:red;');
                const errorMessage = document.createTextNode(error);
                errorP.appendChild(errorMessage);
                div.appendChild(errorP);
            }
        }
    });
});
