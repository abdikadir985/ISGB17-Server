//Laboration 1
/*har vi skapat 5 stycken konstanter. en express, body-parser, jsdom, fs och blogPosts
    som vi tycker använda. Därefter har vi skapat en variabel som heter app som kopplas till express.
    app lyssnar på porten 3000. 
*/
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
/**parsa postdata som kommer från formuläret i metoden post */
app.use(bodyParser.urlencoded({extended:true}));
/*
    Här använder sig app utav public som ligger inom laboration1 under en statisk miljö.
*/
app.use('/public',express.static(__dirname+'/public'));
app.get('/',function(request,response){
    /**
     * app skickar en get request till servern och server skickar tillbaka index.html fil. 
     * Sen man skapar en virtuell DOM av html fil
     * */ 
    response.sendFile(__dirname + '/index.html');
    let htmlCode = fs.readFileSync(__dirname +'/index.html');
    serverDOM = new jsDOM.JSDOM(htmlCode);
    sectionRef = serverDOM.window.document.querySelector('section');
    let postNode='', postTextNode;
    /**
     * loopa igenom vektor som finns i objekten blogPosts och sen spara dem som HTML element 
     */
    for(let i =0;i<blogPosts.blogPosts.length;i++){
       /* postNode = serverDOM.window.document.createTextNode(blogPosts.blogPosts[i].msgSubject + ' '+ 
        blogPosts.blogPosts[i].timeStamp +' ' + blogPosts.blogPosts[i].msgBody + ' '+ 
        blogPosts.blogPosts[i].nickName
        );*/
        /*postNode = postNode + '<article><span>'+blogPosts.blogPosts[i].msgSubject + '</span> ' + 
        blogPosts.blogPosts[i].timeStamp +' <div>' + blogPosts.blogPosts[i].msgBody + '</div><span> '+ 
        blogPosts.blogPosts[i].nickName+'</span></article>';*/
        postNode = postNode + '<article class="clearfix border border-info p-2"><div><span class="font-weight-bold">'+blogPosts.blogPosts[i].msgSubject + '</span> <p class="float-right">' + 
        blogPosts.blogPosts[i].timeStamp +'</p></div> <p class="border-top border-bottom m-0 p-2">' + blogPosts.blogPosts[i].msgBody + 
        '</p> <div><span class="font-weight-bold float-right"> '+ blogPosts.blogPosts[i].nickName+'</span></div></article>';
    }
    sectionRef.innerHTML=postNode;
    /*virtuell Dom returnerar en fullständig HTML dokumentation 
    och sen server skickar HTML koden till webbläsare*/
    htmlCode = serverDOM.serialize();
    response.send(htmlCode);
});
/**
 * när urlen är localhost:port/skriv och servern returnerar skriv.html fil 
 */
app.get('/skriv',function(request,response){
   response.sendFile(__dirname + '/skriv.html');
});

/**
 *  När man skickar en post request till /skriv, funktionen hämtar värde av 
 *  subject, textarea och nickname. Sen kollar funktionen värdes längd för att validera. 
 *  Om valideringen lyckas inte sidan omdirigerar skriv.html 
 */
app.post('/skriv',function(request,response){
    let subject = request.body.subject;
    let textarea = request.body.msgbody;
    let nickname = request.body.nickname;
    if(subject.length<3 || textarea.length<10 || nickname.length<3){
        response.redirect('/skriv');
    }
    /**
     * skapar en date objekt.
     *  Om date eller month är mindre än 10, lägg till 0 framför värde
     */
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    let month = dateObject.getMonth()+1;
    let date = dateObject.getDate();
    if(month<10){
        month = '0'+month;
    }
    if(date<10){
        date='0'+date;
    }
    const dateInText = year+'-'+month+'-'+date;
    /**
     * Skapa en objekt med fyra attributer respektive nickName, msgSubject, msgBody och timeStamp
     * med sina egna värden som i sin tur pushas intill vektorn som heter blogPosts som ligger i 
     * objekt blogPosts. 
     */
    blogPosts.blogPosts.push({
        nickName:nickname,
        msgSubject:textarea,
        msgBody:textarea,
        timeStamp:dateInText
    });
    // tar oss tillbaks till startsidan 
    response.redirect('/');
});
