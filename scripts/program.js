const promotion_text = document.getElementById('promotion-text');
const video = document.getElementById('promotion-video');

function text_cycle(){
    console.log('new cycle');
    let array_text = ["Join Hong Kong Industrial University's College of Science for world-class education and research opportunities in science and technology! 20 QUOTAS LEFT!", "Join the future of engineering with Hong Kong Industrial University's College of Engineering, offering innovative programs and world-class faculty to prepare you for success in the field! 40 QUOTAS LEFT!", "Join the future of interdisciplinary studies with Hong Kong Industrial University's College of Interdisciplinary Studies, offering innovative programs and world-class faculty to prepare you for success in various fields! 30 QUOTAS LEFT!"];
    let randint = Math.floor(3*Math.random());
    promotion_text.innerHTML =  array_text[randint];
    array_text.splice(randint, 1);
    setTimeout(function (){
        promotion_text.innerHTML = array_text[0];
        console.log(array_text[0]);
    }, 3000);
    setTimeout(function (){
        promotion_text.innerHTML = array_text[1];
        console.log(array_text[1]);
    }, 6000);
}

let state = true //true is the default state of the video
video.addEventListener('ended', function video_loop() {
    if (state) {
        video.src = 'https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video2.mp4';
        state = false;
    }
    else {
        video.src = 'https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video1.mp4';
        state = true;
    }
});

window.onload = function() {
    text_cycle();
    setInterval(text_cycle, 9000);
}