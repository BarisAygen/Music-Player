const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');
const duration = document.querySelector('.time #duration');
const currentTime = document.querySelector('.time #current-time');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
const ul = document.querySelector('ul');

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlaying();
});

function displayMusic(music) {
    title.innerText = music.getName();
    image.src = "../img/" + music.img;
    audio.src = "../mp3/" + music.file;
}

play.addEventListener("click", () => {
    if(container.classList.contains("paused")) {
        audio.play();
        container.classList.remove("paused");
        play.querySelector("i").classList = "fa-solid fa-pause"
    }
    else {
        audio.pause();
        container.classList.add("paused");
        play.querySelector("i").classList = "fa-solid fa-play"
    }
});

prev.addEventListener("click", () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    if(container.classList.contains("paused")) {
        audio.play();
        container.classList.remove("paused");
        play.querySelector("i").classList = "fa-solid fa-pause"
    }
    else {
        audio.play();
        container.classList.add("paused");
        play.querySelector("i").classList = "fa-solid fa-pause"
    }
    isPlaying();
});

next.addEventListener("click", () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    if(container.classList.contains("paused")) {
        audio.play();
        container.classList.remove("paused");
        play.querySelector("i").classList = "fa-solid fa-pause"
    }
    else {
        audio.play();
        container.classList.add("paused");
        play.querySelector("i").classList = "fa-solid fa-pause"
    }
    isPlaying();
});

function calculateTime(time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const newSecond = second < 10 ? `0${second}` : `${second}`;
    const finalTime = `${minute}:${newSecond}`;
    return finalTime;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
    progressBar.step = 1;
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

let volumeState = "unmuted"

volume.addEventListener("click", () => {
    if(volumeState === "unmuted") {
        audio.muted = true;
        volumeState = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0;
    }
    else {
        audio.muted = false;
        volumeState = "unmuted"
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100;
    }
});

volumeBar.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
    if(e.target.value == 0) {
        audio.muted = true;
        volumeState = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
    }
    else 
    {
        audio.muted = false;
        volumeState = "unmuted"
        volume.classList = "fa-solid fa-volume-high"
    }
});

const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++){
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="../mp3/${list[i].file}"></audio>
            </li>
        `;
        ul.insertAdjacentHTML("beforeend", liTag);
        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);
        liAudioTag.addEventListener("loadeddata", () => { 
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });
    }
}

function selectedMusic(li) {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    if(container.classList.contains("paused")) {
        audio.play();
        container.classList.remove("paused");
        play.querySelector("i").classList = "fa-solid fa-pause"
    }
    else {
        audio.play();
        container.classList.add("paused");
        play.querySelector("i").classList = "fa-solid fa-pause"
    }
    isPlaying();
}

const isPlaying = () => {
    for(let li of ul .querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index") == player.index){
            li.classList.add("playing");
        }
    }
}