import { ObjectDetector, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2";
const demosSection = document.getElementById("demos");
let objectDetector;
let runningMode = "IMAGE";
// Initialize the object detector
const initializeObjectDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm");
    objectDetector = await ObjectDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `./model.tflite`,
            delegate: "GPU"
        },
        scoreThreshold: 0.2,
        runningMode: runningMode
    });
    demosSection.classList.remove("invisible");
};
initializeObjectDetector();
/********************************************************************
 // Demo 1: Image upload and object detection
 ********************************************************************/
const imageUpload = document.getElementById("imageUpload");
const uploadedImage = document.getElementById("uploadedImage");
// Listen for image upload
imageUpload.addEventListener("change", handleImageUpload);
// Handle image upload
async function handleImageUpload(event) {
    const target = event.target;
    const file = target.files ? target.files[0] : null;
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        uploadedImage.src = imageUrl;
        uploadedImage.onload = async () => {
            handleClick({ target: uploadedImage });
        };
    }
}
/**
 * Detect objects in the uploaded image
 */
async function handleClick(event) {
    const target = event.target;
    // Clear previous highlights and info
    const highlighters = target.parentNode.getElementsByClassName("highlighter");
    while (highlighters[0]) {
        highlighters[0].parentNode.removeChild(highlighters[0]);
    }
    const infos = target.parentNode.getElementsByClassName("info");
    while (infos[0]) {
        infos[0].parentNode.removeChild(infos[0]);
    }
    if (!objectDetector) {
        alert("Object Detector is still loading. Please try again.");
        return;
    }
    // if video mode is initialized, set runningMode to image
    if (runningMode === "VIDEO") {
        runningMode = "IMAGE";
        await objectDetector.setOptions({ runningMode: "IMAGE" });
    }
    const ratio = target.height / target.naturalHeight;
    // Detect objects in the uploaded image
    const detections = await objectDetector.detect(target);
    displayImageDetections(detections, target);
}
/**
 * Display object detections for images
 */
function displayImageDetections(result, resultElement) {
    const ratio = resultElement.height / resultElement.naturalHeight;
    for (let detection of result.detections) {
        // Description text
        const p = document.createElement("p");
        p.setAttribute("class", "info");
        p.innerText =
            detection.categories[0].categoryName +
                " - with " +
                Math.round(parseFloat(detection.categories[0].score) * 100) +
                "% confidence.";
        p.style =
            "left: " +
                detection.boundingBox.originX * ratio +
                "px;" +
                "top: " +
                detection.boundingBox.originY * ratio +
                "px;" +
                "width: " +
                (detection.boundingBox.width * ratio - 10) +
                "px;";
        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style =
            "left: " +
                detection.boundingBox.originX * ratio +
                "px;" +
                "top: " +
                detection.boundingBox.originY * ratio +
                "px;" +
                "width: " +
                detection.boundingBox.width * ratio +
                "px;" +
                "height: " +
                detection.boundingBox.height * ratio +
                "px;";
        resultElement.parentNode.appendChild(highlighter);
        resultElement.parentNode.appendChild(p);
    }
}
/********************************************************************
 // Demo 2: Continuously grab image from webcam stream and detect it.
 ********************************************************************/
let video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
let enableWebcamButton;
// Check if webcam access is supported.
function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
// Keep a reference of all the child elements we create
// so we can remove them easilly on each render.
var children = [];
// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
}
else {
    console.warn("getUserMedia() is not supported by your browser");
}
// Enable the live webcam view and start detection.
async function enableCam(event) {
    if (!objectDetector) {
        console.log("Wait! objectDetector not loaded yet.");
        return;
    }
    // Hide the button.
    enableWebcamButton.classList.add("removed");
    // getUsermedia parameters
    const constraints = {
        video: true
    };
    // Activate the webcam stream.
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    })
        .catch((err) => {
        console.error(err);
        /* handle the error */
    });
}
let lastVideoTime = -1;
async function predictWebcam() {
    // if image mode is initialized, create a new classifier with video runningMode.
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await objectDetector.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    // Detect objects using detectForVideo.
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        const detections = objectDetector.detectForVideo(video, startTimeMs);
        displayVideoDetections(detections);
    }
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
}
function displayVideoDetections(result) {
    // Remove any highlighting from previous frame.
    for (let child of children) {
        liveView.removeChild(child);
    }
    children.splice(0);
    // Iterate through predictions and draw them to the live view
    for (let detection of result.detections) {
        const p = document.createElement("p");
        p.innerText =
            detection.categories[0].categoryName +
                " - with " +
                Math.round(parseFloat(detection.categories[0].score) * 100) +
                "% confidence.";
        p.style =
            "left: " +
                (video.offsetWidth -
                    detection.boundingBox.width -
                    detection.boundingBox.originX) +
                "px;" +
                "top: " +
                detection.boundingBox.originY +
                "px; " +
                "width: " +
                (detection.boundingBox.width - 10) +
                "px;";
        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style =
            "left: " +
                (video.offsetWidth -
                    detection.boundingBox.width -
                    detection.boundingBox.originX) +
                "px;" +
                "top: " +
                detection.boundingBox.originY +
                "px;" +
                "width: " +
                (detection.boundingBox.width - 10) +
                "px;" +
                "height: " +
                detection.boundingBox.height +
                "px;";
        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        // Store drawn objects in memory so they are queued to delete at next call.
        children.push(highlighter);
        children.push(p);
    }
}