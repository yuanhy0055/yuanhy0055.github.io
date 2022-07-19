var video = document.getElementById('video'),       //摄像头
    canvas = document.getElementById('canvas'),     //截取图像
    select = document.getElementById("select"),     //切换摄像头
    exArray = [];                                   //存储设备源ID

//获取设备源ID navigator.getUserMedia需要
if (typeof MediaStreamTrack != 'undefined' && typeof MediaStreamTrack.getSources != 'undefined') {
    MediaStreamTrack.getSources(function (sourceInfos) {
        for (var i = 0; i != sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            //这里会遍历audio,video，所以要加以区分  
            if (sourceInfo.kind === 'video') {
                exArray.push(sourceInfo.id);
            }
        }
    });
}

function getMedia() {
    if(window.stream) {
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
    if (typeof navigator.mediaDevices == 'undefined' && typeof navigator.mediaDevices.getUserMedia == 'undefined') {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (typeof navigator.getUserMedia == 'undefined') {
            return errorFunc({name: "ERROR", message: "navigator.getUserMedia is undefined!"});            
        }
        for(var i = 0; i < exArray.length; i++) {
            var option = document.createElement('option');
            option.text = 'camera ' + (i + 1);
            option.value = exArray[i];
            select.appendChild(option);
        }
        var val = select.value;        
        navigator.getUserMedia({
            'video': {
                'optional': [{
                        'sourceId': val ? val : exArray[0]//0为前置摄像头，1为后置  
                    }]
            },
//            'video': true,
            'audio': true
        }, successFunc, errorFunc)
    } 
    else {
        navigator.mediaDevices.enumerateDevices().then(getDevice).catch(errorFunc);
        var val = select.value;
        var constraints = {
            audio: false,
            video: {deviceId: val ? {exact: val} : undefined}
//            video: {facingMode: {exact : 'environment'}}          //不起效
//            video: true
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                successFunc(stream);
                return navigator.mediaDevices.enumerateDevices();
            }).then(getDevice)
            .catch(function (err) {
                errorFunc(err);
            });
    }
}
function getDevice(deviceInfos) {
    var val = select.value;
    while(select.firstChild) {
        select.removeChild(select.firstChild);
    }
    for(var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
         if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || 'camera ' + (select.length + 1);
            select.appendChild(option);
         }
    }
    if(select.value && select.value !== "") {
        select.value = val;
    }
    
}
//开启摄像头成功回调
function successFunc(stream) {
    window.stream = stream;
    if ("srcObject" in video) {
        video.srcObject = stream;
    } else if (video.mozSrcObject !== undefined) {
//Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持  
        video.mozSrcObject = stream;
    } else {
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        video.src = window.URL && window.URL.createObjectURL(stream) || stream;
    }
    video.onloadedmetadata = function (e) {
        video.play();
    };
}
//开启摄像头错误回调
function errorFunc(e) {
    alert(e.name + ": " + e.message);
}

//截取图像
function screenShot() {
    canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);
    var imgData = canvas.toDataURL("image/png", 0.8);

    var imageElement = document.getElementById("MyPix");  
    imageElement.src = imgData; 
}
