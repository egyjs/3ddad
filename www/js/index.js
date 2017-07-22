/*Not function*/
if(localStorage.getItem("chose") != null){
     document.getElementById('Cthekr').innerHTML = localStorage.getItem("chose");
    
}//localStorage.removeItem("chose");
  
/* End Not function*/
String.prototype.toARnum = function(){
 var id= ['۰',
          '۱',
          '۲',
          '۳',
          '٤',
          '٥',
          '٦',
          '۷',
          '۸',
          '۹'];
 return this.replace(/[0-9]/g, function(w){
  return id[+w]
 });
}

function arabictonum(arabicnumstr) {
     arabicnumstr = Number(arabicnumstr.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
         return d.charCodeAt(0) - 1632;                
         }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) { return d.charCodeAt(0) - 1776; })
     );
     return arabicnumstr;
}
    
function getPhoneGapPath() {

var path = window.location.pathname;
path = path.substr( path, path.length - 10 ); //strip off index.html
return 'file://' + path;

};

function playAudio(id) {
    var audioElement = document.getElementById(id);
    var url = getPhoneGapPath() + audioElement.getAttribute('src');  //OR MP3 

    var my_media = new Media(url,
            // success callback
             function () { console.log("playAudio():Audio Success:" + url); }, // url - divice LOG.txt
            // error callback
             function (err) { 
                console.log("playAudio():Audio Error: " + JSON.stringify(err)); 
                location.reload();
             }
    );
    // Play audio
    my_media.play();
    console.log("playAudio():Audio Success:" + url);
    
}
    
var prs = 100;
function incrementValue(){
    var value = parseInt(arabictonum(document.getElementById('number').innerHTML), 10);
    value = isNaN(value) ? 0 : value;
    value++;

    if(value === prs) {
    Materialize.toast(value.toString().toARnum(), 2000);
        prs += 100;
        navigator.vibrate(1000);
        playAudio('Blob'); //PopCork.mp3 OR blop.mp3
    }else{
//none yet        
    }
    
    
    
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
            localStorage.setItem("valueAR",  value.toString().toARnum());

        // Retrieve
        document.getElementById('number').innerHTML = localStorage.getItem("valueAR");
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

    
    
    
    
   // document.getElementById('number').innerHTML = value.toString().toARnum();
    document.title = value.toString().toARnum();
    


}


function longClicks() {
    var bottomMenu = document.getElementById('bottom-menu');
    var reset = document.getElementById('reset');
    
    if(reset.style.display == 'none'){
        bottomMenu.style.display = "block";
        reset.style.display = "block";
    }else{
        bottomMenu.style.display = "none";
        reset.style.display = "none";
    }   
}

function nightly(){
    if(document.getElementById('filled-in-box').checked) {
        $("#nightly").show();
        $('#number').css({
            color: '#adadad'
        });
        $('#Cthekr').css({
            color: '#adadad'
        });
    } else {
        $("#nightly").hide();
        $('#number').css({
            color: '#000'
        });
        $('#Cthekr').css({
            color: '#1338ff'
        });
    }
}

function chose(zval){
    if(zval == ""){
        localStorage.setItem("chose","اضغط مع كل تسبيحة");
    }else{
    localStorage.setItem("chose",  zval);
    }
    localStorage.setItem('valueAR', '۰');
    window.location = "index.html";

}

function shareApp(){
    window.plugins.socialsharing.share(
        '*#عداد_الذكر والتسبيح ..* \n'
            +'تطبيق رائع خاص للجوال عبارة عن مسبحة الكترونية وهو برنامج صغير الحجم يشبه خاتم التسبيح لكن على جهازك الخاص \n'
            +'ميزاته : \n'
            +'✔ الحجم : خفيف جدا .. \n'
            +'✔ سريع\n'
            +'✔ به ميزة الاحتفاظ بالعدد الذي وقفت عنده حتى لو اغلقت البرنامج\n'
            +'✔ المنظر البسيط الجميل \n'
            +'✔  الضغط بأي مكان بالشاشة \n'
            +'✔✔ وانتظرو المزيد في التحديثات القادمة \n'
            +'ولا يحتاج انترنت ،، ممتاز 👍🌿🌿 \n'
            +'أرسلها للكل خلال دقيقه ويبقى أﻷجر جاري لك ولي بإذن الله تعالى..\n \n \n',
             'عداد الذكر والتسبيح',
             '',
             'https://play.google.com/store/apps/details?id=com.el3zahaby.addad');
}



var myElement = document.getElementById('number');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);
mc.get("press").set({time: 550});
// listen to events...
mc.on("press", function(ev) {
    longClicks();
});
mc.on("tap", function(ev) {
    incrementValue();
});

document.addEventListener('deviceready', function(){
    var package = "com.el3zahaby.addad"; // facebook app.
    $("#openStore").click(function(){
        cordova.plugins.market.open(package); 
    });
}, false);