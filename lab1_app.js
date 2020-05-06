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
app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static(__dirname+'/public'));
app.get('/',function(request,response){
    response.sendFile(__dirname + '/index.html');
    let htmlCode = fs.readFileSync(__dirname +'/index.html');
    serverDOM = new jsDOM.JSDOM(htmlCode);
    sectionRef = serverDOM.window.document.querySelector('section');
    let postNode='', postTextNode;
    console.log('just for checking');
    for(let i =0;i<blogPosts.blogPosts.length;i++){
       /* postNode = serverDOM.window.document.createTextNode(blogPosts.blogPosts[i].msgSubject + ' '+ 
        blogPosts.blogPosts[i].timeStamp +' ' + blogPosts.blogPosts[i].msgBody + ' '+ 
        blogPosts.blogPosts[i].nickName
        );*/
        postNode = postNode + '<article><div><span>'+blogPosts.blogPosts[i].msgSubject + '</span> ' + 
        blogPosts.blogPosts[i].timeStamp +'</div> <p>' + blogPosts.blogPosts[i].msgBody + '</p> <div><span> '+ 
        blogPosts.blogPosts[i].nickName+'</span></div></article>';
    }
    sectionRef.innerHTML=postNode;
    htmlCode = serverDOM.serialize();
    response.send(htmlCode);
});

app.get('/skriv',function(request,response){
   response.sendFile(__dirname + '/skriv.html');
});

app.post('/skriv',function(request,response){
    let subject = request.body.subject;
    let textarea = request.body.msgbody;
    let nickname = request.body.nickname;
    if(subject.length<3 || textarea.length<10 || nickname.length<3){
        response.redirect('/skriv');
    }
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth()+1;
    const date = dateObject.getDate();
    const dateInText = year+'-'+month+'-'+date;

    blogPosts.blogPosts.push({
        nickName:nickname,
        msgSubject:textarea,
        msgBody:textarea,
        timeStamp:dateInText
    });
    response.redirect('/');
});
