video = document.getElementById('video');
canvas = document.getElementById('cam-image');

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = { audio: false, video: true };

function successCallback(stream) {
    window.stream = stream; // stream available to console
    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream;
    }
}

function errorCallback(error) {
    console.log("navigator.getUserMedia error: ", error);
}

video.addEventListener('canplay', function() {
    canvas.width = 128;
    canvas.height = 128;
    screenShotAndDetect();
    //setInterval(screenShotAndDetect,300);
}, false);

navigator.getUserMedia(constraints, successCallback, errorCallback);

function screenShotAndDetect(){
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video,0,0,128,128);
    var pixels = ctx.getImageData(0,0,128,128).data;
    console.log(pixels);
    //detectImage(pixels);
}

function detectImage(pixels){
    $.post('/detect',{pixels:pixels},function(response){

    });
}

function testDetect(){
    screenShotAndDetect();
}

function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  voices = speechSynthesis.getVoices();
}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(text, callback) {
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'zh-TW';
    u.voice = voices[0];
    console.log(voices);
    u.onend = callback;
    speechSynthesis.speak(u);
}

speak("狗屎");