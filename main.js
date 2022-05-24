song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("model loaded by Tejas.D")
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("FF0000");
    if ( scorerightWrist > 0.2) {
    circle(rightWristx, rightWristy, 20);
    if (rightWristy > 0 && rightWristy <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    } else if (rightWristy > 100 && rightWristy <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    } else if (rightWristy > 200 && rightWristy <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    } else if (rightWristy > 300 && rightWristy <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    } else if (rightWristy > 400 && rightWristy <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

    if (scoreleftWrist > 0.2) {
        circle(leftWristx, leftWristy, 20);
        nlwy = Number(leftWristy);
        rd = floor(nlwy);
        console.log(rd);
        volume = rd / 500;
        document.getElementById("volume").innerHTML = " volume - " + volume;
        song.setVolume(volume);
    }
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        scoreleftWrist = results[0].pose.keypoints[9].score;
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristx + "leftWristy = " + leftWristy);
        
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scorerigtWrist = " + scorerightWrist + "scoreleftWrist = " + scoreleftWrist);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rigtWristx = " + rightWristx + "rightWristy = " + rightWristy);
    }
}