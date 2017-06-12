video = document.getElementById('video');
canvas = document.getElementById('cam-image');
console.log('hi');
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
    return JSON.stringify(pixels);
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
    u.lang = 'en-US';
    u.voice = voices[0];
    u.onend = callback;
    speechSynthesis.speak(u);
}

$(document).ready(function() {
  $('#detect-form').submit(function() {
    data = $(this).serialize();
    // data += '&hi="hi"';
    data += `&screen=${screenShotAndDetect()}`;
    $('#detect-btn').toggleClass('disabled');
    $('#detect-btn').html('Detecting...');
    $('#preloader').toggleClass('active');
    $('#result').html('');
    $('#cam-image').css('display', 'block');
    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: data,
      success: function (data) {
        if (!data) {
          $('#result').html('failed to detect');
        } else {
          $('#result').html(data);
          speak('we see! ' + data);
        }
        $('#detect-btn').toggleClass('disabled');
        $('#detect-btn').html('Detect');
        $('#preloader').toggleClass('active');
      },
      error: function(data) {
        $('#result').html('error');
        $('#detect-btn').toggleClass('disabled');
        $('#detect-btn').html('Detecting');
        $('#preloader').toggleClass('active');
      }
    });
    return false;
  });
})

// speak("狗屎");
