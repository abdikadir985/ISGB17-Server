
'use strict';
// min kod är inte perfekt, säker finns bättre lösningar men det funkar 
const express = require('express');
const cookieParser = require('cookie-parser');
const app = new express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const jsDOM  = require('jsdom');
const fs = require('fs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

let loginSuccess ='';
let errorMessage = '';
let server = http.listen(3001,()=>{
    console.log('server is running');
});
app.get('/',function(request,response){  
    let cookie =  request.cookies.nickName;
    if(cookie){
        response.sendFile(__dirname+'/index.html');
    }else{
        response.sendFile(__dirname+'/loggain.html');
        if(loginSuccess == false&&loginSuccess!==''){
            showLoginStatus(response);
        }
    }
});
app.post('/',function(request,response){
    const htmlCode = fs.readFileSync(__dirname + '/loggain.html');
    const loggaInDom = new jsDOM.JSDOM(htmlCode);
    const input = request.body.nickname;
    try{
        if(input.length<3){
            throw "Nicknamnet måste vara minst 3 tecken"; 
        }
        else{
            response.cookie('nickName',input);
            response.redirect('index.html');
            console.log(request.cookies.nickName);
        }
    }
    catch(error){
        loginSuccess = false;
        errorMessage = error;
        response.redirect('/');
    }
});
app.use('/public',express.static(__dirname+'/public'));
app.use('/',express.static(__dirname+'/'));
app.use('/clientscripts',express.static(__dirname+'/clientscripts'));

function showLoginStatus(response){
    let htmlCode = fs.readFileSync(__dirname + '/loggain.html');
    const loginDOM  =  new jsDOM.JSDOM(htmlCode);
    const display3 = loginDOM.window.document.querySelector('.display-3');
    display3.innerHTML = errorMessage;
    htmlCode = loginDOM.serialize();
    response.send(htmlCode);
}

