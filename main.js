scoreLeftWrist = 0
ScoreRightWrist = 0
status = ""
status2 = ""
song1 = ""
song = ''
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
function preload() {
    song = loadSound('believer_remix.mp3')
    song1 = loadSound('music.mp3')
}

function setup() {
    canvas = createCanvas(500, 600)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw() {
    image(video, 0, 0, 600, 500)
    status = song.isPlaying()
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20)
        song1.stop()
        if (status == false) {
            song.play()
            document.getElementById('songName').innerHTML = "Playing Beliver"
        }
    }

        if (scorerightWrist > 0.2) {
            circle(rightWristX, rightWristY, 20)
            song.stop()
            if (status2 == false) {
                song1.play()
                document.getElementById('songName').innerHTML = "Playing ringtone"
            }



        }
    }

    function play() {
        song.play()
        song.setVolume(1)
        song.rate(1)

    }

    function modelLoaded() {
        console.log('PoseNet Is Initialized')

    }

    function gotPoses(results) {
        if (results > 0) {
            console.log(results)

            leftWristX = results[0].pose.leftWrist.x
            leftWristY = results[0].pose.leftWrist.y
            console.log('leftWristX' + leftWristX, 'leftWristY' + leftWristY)
            scoreLeftWrist = results[0].pose.keypoints[9].score

            ScoreRightWrist = results[0].pose.keypoints[10].score
            rightWristX = results[0].pose.rightWrist.x
            rightWristY = results[0].pose.leftWrist.y
            console.log('rightWristX' + rightWristX, 'rightWristY' + rightWristY)
        }
    }