const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
// const playBtn = player.querySelector('.player__button');
const progress = player.querySelector('.progress');
const progressBar = progress.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const zoomBtn = document.querySelector('.zoom');

const togglePlay = () => {
    video.paused ? video.play() : video.pause();
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis =`${percent}%`;
}

function drag (e){
    // console.log(e);
    const dragTime = (e.offsetX/ progress.offsetWidth) * video.duration;
    video.currentTime = dragTime;
}

function fullScreen(){
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
}

//making video clickable to play and pause video
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipBtns.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', drag);
progress.addEventListener('mousemove', (e) => mousedown && drag(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

zoomBtn.addEventListener('click', fullScreen);
