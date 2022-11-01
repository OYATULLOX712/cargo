// nav
const navBtn = document.querySelector('.nav-btn');
const navContent = document.querySelector('.nav-content');
navBtn.addEventListener('click',function () {
    navContent.classList.toggle('active')
    this.classList.toggle('active')
})

// slider

const sliderItems = document.querySelectorAll('.slider__item');
const sliderBtns = document.querySelectorAll('[data-target]');
let activeSlide = 0

for (let i = 0; i < sliderItems.length; i++) {
    if (sliderItems[i].classList.contains('active')) {
        activeSlide = i
    }
}
for (let i = 0; i < sliderBtns.length; i++) {
    sliderBtns[i].addEventListener('click',function (e) {
        move(e.target.getAttribute('data-target'))
    })
}
function move(btn) {
    if (btn === 'next') {
        if (activeSlide < sliderItems.length-1) {
            activeSlide++
        } else {
            activeSlide = 0
        }
    }else{
        if (activeSlide > 0) {
            activeSlide--
        } else {
            activeSlide = sliderItems.length-1
        }
    }
    sliderItems.forEach(item=>{
        item.classList.remove('active')
    })
    sliderItems[activeSlide].classList.add('active')
}

// apply

const applyStep = document.querySelectorAll('.apply-step');
const applyForm = document.querySelectorAll('.apply-form');
const applyBtn = document.querySelectorAll('.apply-btn, .apply-back, .apply-next');
for (let i = 0; i < applyBtn.length; i++) {
    applyBtn[i].addEventListener('click', function (e) {
        e.preventDefault()
        if (i === 0) {
            applyStep[1].classList.add('active')
            applyForm[0].classList.remove('active')
            applyForm[1].classList.add('active')
        }else if (i === 1) {
            applyStep[1].classList.remove('active')
            applyForm[0].classList.add('active')
            applyForm[1].classList.remove('active')
        }else if (i === 2) {
            for (let i = 0; i < applyStep.length; i++) {
                applyStep[i].style.display = 'none'
            }
            applyForm[2].classList.add('active')
            applyForm[1].classList.remove('active')
        }
    })
    
}

// video

const video = document.querySelector('.video-mp4');
const speedWatch = document.querySelector('.video__speed-watch');
const speedPrev = document.querySelector('.video__prev-speed');
const prev = document.querySelector('.video__prev');
const play = document.querySelector('.video__play');
const next = document.querySelector('.video__next');
const speedNext = document.querySelector('.video__next-speed');
const videoStart = document.querySelector('#start');
const videoEnd = document.querySelector('#end');
const duration = document.querySelector('.video-duration');
const line = document.querySelector('.video-line');
const volumeIcon = document.querySelector('.video__volume-icon');
const volumeRange = document.querySelector('.video__volume-range');
function playPause() {
    play.classList.toggle('active')
    if (video.paused) {
        video.play()
        setInterval(() => {
            videoStart.innerHTML = formatTime(video.currentTime)
        }, 1000);
        videoEnd.innerHTML = formatTime(video.duration)
    }else{
        video.pause()
    }
}
function videoSpeed(symbol) {
    if (symbol === '-' && video.playbackRate > 0) {
        video.playbackRate -= 0.25
    }else if (symbol === '+' && video.playbackRate < 2) {
        video.playbackRate += 0.25
    }
    speedWatch.style.display = 'flex'
    speedWatch.innerHTML = video.playbackRate + 'x'
    setTimeout(() => {
        speedWatch.style.display = 'none'
    }, 1500);
}
function formatTime(time) {
    const noll = (num)=> num < 10 ? '0'+num : num
    let hour = Math.trunc(time / 3600)
    time = time - (hour * 3600)
    let min = Math.trunc(time / 60)
    time = time - (min*60)
    time = Math.trunc(time)
    return `${noll(min)}:${noll(time)}`
}


play.addEventListener('click', function () {playPause()})
video.addEventListener('click', function () {playPause()})
prev.addEventListener('click',function () {alert('no video!!!')})
next.addEventListener('click',function () {alert('no video!!!')})
speedPrev.addEventListener('click',function () {videoSpeed('-')})
speedNext.addEventListener('click',function () {videoSpeed('+')})

duration.addEventListener('click',function (e) {
    let videoTime = (e.offsetX / duration.clientWidth) * video.duration
    video.currentTime = videoTime
})
video.addEventListener('timeupdate', function () {
    let lineWidth = (video.currentTime / video.duration)
    line.style.width = lineWidth * 100 + '%'
})

const volumeClass = ['mute','down','normal','up']

video.onvolumechange = ()=>{
    for (let i = 0; i < volumeClass.length; i++) {
        volumeIcon.classList.remove(volumeClass[i])
    }
    let volume = video.volume * 100
    if (volume.muted) {
        volumeIcon.classList.add('mute')
    }else if(volume > 65){
        volumeIcon.classList.add('up')
    }else if(volume > 30){
        volumeIcon.classList.add('normal')
    }else if(volume > 0){
        volumeIcon.classList.add('down')
    }else if(volume == 0){
        volumeIcon.classList.add('mute')
    }
}
volumeRange.addEventListener('click', function (e) {
    video.volume = e.target.value / 100
})
video.addEventListener('dblclick',function () {
    video.requestFullscreen()
})

// service

const serviceBlock = document.querySelector('.service__block');
const serviceLeft = document.querySelector('.service__left');
const serviceRight = document.querySelector('.service__right');

serviceLeft.addEventListener('click', function () {
    serviceBlock.scrollLeft = serviceBlock.scrollLeft - 180
})
serviceRight.addEventListener('click', function () {
    serviceBlock.scrollLeft = serviceBlock.scrollLeft + 180
})

let serviceWidth = serviceBlock.scrollWidth - serviceBlock.clientWidth

function serviceSlider() {
    if (serviceBlock.scrollLeft > (serviceWidth - 1)) {
        serviceBlock.scrollLeft -= serviceWidth
    }else{
        serviceBlock.scrollLeft += 1
    }
}
setInterval(() => {
    serviceSlider()
}, 15);


const accardion = document.querySelectorAll('.accardion__box');

for (let i = 0; i < accardion.length; i++) {
    accardion[i].addEventListener('click', function () {
        for (let j = 0; j < accardion.length; j++) {
            accardion[j].classList.remove('active')
        }
        accardion[i].classList.add('active')
    })
    
}