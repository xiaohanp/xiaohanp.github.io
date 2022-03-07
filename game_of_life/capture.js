const RED_INTENCITY_COEF = 0.2126;
const GREEN_INTENCITY_COEF = 0.7152;
const BLUE_INTENCITY_COEF = 0.0722;
const captureVideoButton = document.querySelector(
    "#capture-video-button"
);
const screenshotButton = document.querySelector("#screenshot-button");
const stopVideoButton = document.querySelector("#stop-video-button");
const screenshotImage = document.querySelector("#screenshot-image");
const canvas = document.createElement("canvas");
const video = document.querySelector("#screenshot-video");

var viewport = document.getElementById('viewport');
var ctx = viewport.getContext('2d');
var imageToProcess = new Image;
var row = 16;
var column = 32;
var pixelVal = new Array(column);
for(var i = 0; i < column; i++){
  pixelVal[i] = new Array(row);
}
var pixelFillFlag = false;  //to communicate with sketch.js
const constraints = {
    video: true,
};

captureVideoButton.onclick = function () {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        screenshotButton.disabled = false;
        video.srcObject = stream;
    });
};

stopVideoButton.onclick = function () {

    video.srcObject.getTracks().forEach( (track) => {
        track.stop();
    });
};

screenshotButton.onclick = video.onclick = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    screenshotImage.src = canvas.toDataURL("image/webp");
    imageToProcess.src = canvas.toDataURL("image/webp");
    pixelFillFlag = true;

};

var openFile = function(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        var output = document.getElementById('screenshot-image');
        output.src = dataURL;
        imageToProcess.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
    pixelFillFlag = true;
};

function hist(context, w, h) {
    var imageData = context.getImageData(0, 0, w, h);
    var data = imageData.data;
    var brightness;
    var brightness256Val;
    var histArray = Array.apply(null, new Array(256)).map(Number.prototype.valueOf,0);

    for (var i = 0; i < data.length; i += 4) {
        brightness = RED_INTENCITY_COEF * data[i] + GREEN_INTENCITY_COEF * data[i + 1] + BLUE_INTENCITY_COEF * data[i + 2];
        brightness256Val = Math.floor(brightness);
        histArray[brightness256Val] += 1;
    }

    return histArray;
};

function otsu(histogram, total) {
    var sum = 0;
    for (var i = 1; i < 256; ++i)
        sum += i * histogram[i];
    var sumB = 0;
    var wB = 0;
    var wF = 0;
    var mB;
    var mF;
    var max = 0.0;
    var between = 0.0;
    var threshold1 = 0.0;
    var threshold2 = 0.0;
    for (var i = 0; i < 256; ++i) {
        wB += histogram[i];
        if (wB == 0)
            continue;
        wF = total - wB;
        if (wF == 0)
            break;
        sumB += i * histogram[i];
        mB = sumB / wB;
        mF = (sum - sumB) / wF;
        between = wB * wF * Math.pow(mB - mF, 2);
        if ( between >= max ) {
            threshold1 = i;
            if ( between > max ) {
                threshold2 = i;
            }
            max = between;
        }
    }
    return ( threshold1 + threshold2 ) / 2.0;
};

function binarize(threshold, context, w, h) {
    var imageData = context.getImageData(0, 0, w, h);
    var data = imageData.data;
    context.width = w;
    context.height = h;
    var val;

    for(var i = 0; i < data.length; i += 4) {
        var brightness = RED_INTENCITY_COEF * data[i] + GREEN_INTENCITY_COEF * data[i + 1] + BLUE_INTENCITY_COEF * data[i + 2];
        val = ((brightness > threshold) ? 255 : 0);
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
    }

    context.putImageData(imageData, 0, 0);

    for(var m = 0; m < column; m++){
        for(var n = 0; n < row; n++){
            //need changes here: red is the colour indicator probably needs an array
            var red = context.getImageData(m, n, w, h).data[0];
            if(red == 0){
              pixelVal[m][n] = 1;
            }else{
              pixelVal[m][n] = 0;
            }
        }
    }
    console.log(pixelVal);
}


imageToProcess.onload = function() {
    var w = imageToProcess.width, h = imageToProcess.height;
    viewport.height = h;
    viewport.width = w;
    ctx.drawImage(imageToProcess, 0, 0,32,16);
    var histogram = hist(ctx, w, h);
    var threshold = otsu(histogram, w*h);
    binarize(threshold, ctx, w, h);

};
