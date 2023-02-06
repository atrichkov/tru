const video = document.querySelector("#videoContainer")
const startCameraButton = document.querySelector("#startCam")
const snapButton = document.querySelector("#snap")
const camConfig = {
    audio: false,
    video: true
}

startCameraButton.addEventListener("click", () => {
    const allMediaDevices = navigator.mediaDevices

    if (!allMediaDevices || !allMediaDevices.getUserMedia) {
        console.debug("getUserMedia() not supported.")
        alert("Your browser does not support media devices")

        return
    }

    allMediaDevices.getUserMedia(camConfig)
    .then(function(vidStream) {
        if ("srcObject" in video) {
            video.srcObject = vidStream;
        } else {
            video.src = window.URL.createObjectURL(vidStream);
        }

        video.onloadedmetadata = (e) => {
            video.play();
            snapButton.removeAttribute('disabled')
        }
    })
    .catch(function(e) {
        console.error(e.name + ": " + e.message)
    });
})

snapButton.addEventListener("click", () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg', '1.0');

    // data url of the image
    console.debug(imageData);

    axios.post('/save', {
        params: {
            url: imageData
        }
    })
    .then((response) => {
        alert(response.data)
    })
    .catch((err) => {
        console.debug(err);
    })
})