
//Laboration 1
const express = require('express');
const bodyParser = require('body-parser');
const jsDOM = require('jsdom');
const fs = require('fs');
const blogPosts = require('./blogPosts');
let app = express();
let sectionRef;
let serverDOM;
app.listen(3000,function(){
    console.log('server is running on port 3000');
});
app.get('/',function(request,response){
    response.sendFile(__dirname + '/index.html');
    let htmlCode = fs.readFileSync(__dirname +'/index.html');
    serverDOM = new jsDOM.JSDOM(htmlCode);
    sectionRef = serverDOM.window.document.querySelector('section');
    let postNode =  serverDOM.window.document.createTextNode(blogPosts.blogPosts[0].nickName
        + ' '+ blogPosts.blogPosts[0].msgSubject +' ' + blogPosts.blogPosts[0].timeStamp + 
        ' '+blogPosts.blogPosts[0].msgBody
    );
    sectionRef.appendChild(postNode);
    htmlCode = serverDOM.serialize();
    response.send(htmlCode);
});

app.get('/skriv',function(request,response){
   response.sendFile(__dirname + '/skriv.html');
});
