'use strict';

let socket = io();

window.addEventListener('load', ()=> {
    let button = document.querySelector('.btn');

    button.addEventListener('click', textRutaValidering);
});

function textRutaValidering (event) {
    try {
        event.preventDefault();
        //chattflödet
        socket.emit('newContent', { "contentId" : document.querySelector('#msg') } );

        if(document.getElementById('msg').value.length<=2){
            throw "Texten måste vara minst 2 tecken";
        }
    }
    catch(error) {
        const div  = document.querySelector('.row');
        if(!div.querySelector('p')){
            const errorP = document.createElement('p');
            errorP.setAttribute('style','color:red;');
            const errorMessage = document.createTextNode(error);
            errorP.appendChild(errorMessage);
            div.appendChild(errorP);
        }
    }
}

socket.on('addContent', function(data) {

    //skriv ut content
    let flow = document.querySelector('#flow');

    let text = document.createElement('p');
    text.setAttribute('style','text-align: left');
    text.textContent = data.name + ': ' + data.time;

    flow.appendChild(text);

});
