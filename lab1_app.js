//Laboration 1

'use strict';

const express = require( 'express' );
const bodyParser = require('body-parser');
const jsDOM = require('jsdom');
const fs = require('fs');
const blogPosts = require('./blogPosts');

let app = express();
let serverDom;

app.listen('81', function() {
    console.log('now runs port 81!');
});

app.get('/', function( request, response) {
    response.sendFile( __dirname + '/index.html' );

    let htmlCode = fs.readFileSync(__dirname + '/index.html');
    let serverDom = new jsDOM.JSDOM(htmlCode);

    let sectionRef = serverDom.window.document.querySelector('section');

    let postNode;
    for(let i=0;i<blogPosts.blogPosts.length;i++) {
        postNode = serverDom.window.document.createTextNode(blogPosts.blogPosts[i].nickname + ' ' +
    blogPosts.blogPosts[i].msgSubject + ' ' + blogPosts.blogPosts[i].timeStamp + ' ' +
    blogPosts.blogPosts[i].msgBody);
    }
    sectionRef.appendChild(postNode);
    htmlCode = serverDom.serialize();
    response.send(htmlCode);

});

app.get('/skriv', function(request, response){
    response.sendFile(__dirname + '/skriv.html');
});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/skriv', function(request, response) {
    let htmlCode = fs.readFileSync(__dirname + '/index.html');
    let serverDom = new jsDOM.JSDOM(htmlCode);
    let bodyNodeRef = serverDom.window.document.querySelector('body');

    let divNodeRef;
    let divTextNodeRef;

    let text = request.body.subject;
    let textarea = request.body.msgBody;
    let nickname = request.body.nickname;

    for(let i = 1;i<=nickname;i++) {
        
    }
});

