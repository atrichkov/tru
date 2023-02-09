const video = document.querySelector("#videoContainer")
const startCameraButton = document.querySelector("#startCam")
const snapButton = document.querySelector("#snap")
const camConfig = {
    audio: false,
    video: true
}

window.addEventListener('DOMContentLoaded', async () => {
    checkMediaAccess = async () => {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.enumerateDevices().then(devicesList => {
                devicesList.forEach(device => {
                    if (device.kind == 'videoinput') resolve()
                })
    
                reject()
            })
        })
    }

    try {
        await checkMediaAccess()
        startCameraButton.removeAttribute('disabled')
    } catch {
        const rows = document.getElementsByClassName("row")
        rows[0].insertAdjacentHTML('afterend', `<div class="row">
                <div class="alert alert-danger center-block" role="alert">
                    It seems that your camera is not connected, please connect it and reload the page!
                </div>
            </div>
        `)
    }
})


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
    .catch(function(err) {
        console.error(err)
    });
})

snapButton.addEventListener("click", async () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = canvas.toDataURL('image/jpeg', '1.0')

    // data url of the image
    console.debug(imageData)

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