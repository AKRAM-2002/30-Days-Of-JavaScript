// Selectors
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(localMediaStream =>{
        
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(error=>{
        alert('Oops! Something went wrong\n'+ error);
     })
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

function takePhoto() {
    snap.currenTime = 0;
    snap.play();
    const photo = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = photo;
    link.setAttribute('download', 'handsome');
    link.textContent = 'Downloading'
    strip.insertBefore(link, link.firstChild)

    strip.appendChild(link);

}
getVideo();


// Event Listeners

snap.addEventListener('click', takePhoto);
video.addEventListener('canplay', paintToCanvas);