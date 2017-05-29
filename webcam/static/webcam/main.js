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
    if (!streaming) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        streaming = true;
    }

}, false);

navigator.getUserMedia(constraints, successCallback, errorCallback);