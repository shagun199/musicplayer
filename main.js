let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressbar = document.getElementById("progressbar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songplaypause = Array.from(document.getElementsByClassName("songItemPlay")); 
let next = document.getElementById("forward");
let prev = document.getElementById("backward");
let poster = document.querySelector(".poster");

let songs = [
    {songName: "Save Your tears", filePath: "Songs/1.mp3", coverPath: "banners/saveyourtears.jpg" },
    {songName: "Night Changes", filePath: "Songs/2.mp3", coverPath: "banners/nightchanges.jpg" },
    {songName: "Unstoppable", filePath: "Songs/3.mp3", coverPath: "banners/unstoppable.jpg" },
    {songName: "As it was", filePath: "Songs/4.mp3", coverPath: "banners/asitwas.jpg" },
    {songName: "Counting Stars", filePath: "Songs/5.mp3", coverPath: "banners/countingstars.jpg" },
    {songName: "Talking to the Moon", filePath: "Songs/6.mp3", coverPath: "banners/talkingmoon.jpg" },
    {songName: "Make you mine", filePath: "Songs/7.mp3", coverPath: "banners/makeyoumine.jpg" },
]

// updating songs on html
songItems.forEach((song,i) =>{
    song.getElementsByTagName('img')[0].src = songs[i].coverPath;
    song.getElementsByClassName('song')[0].innerText = songs[i].songName;
})


// play/pause
masterPlay.addEventListener("click", function() {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    } 
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");  
    }
    
})

document.addEventListener("keyup", function(e) {
    if(e.code === "Space") {
        if(audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
        } 
        else{
            audioElement.pause();
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");  
        }
    }
})


// updating progressbar
audioElement.addEventListener('timeupdate', () =>{    
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressbar.value = progress;
})

// changing time on progressbar
myProgressbar.addEventListener('change', () =>{
    audioElement.currentTime = (myProgressbar.value * audioElement.duration )/ 100;
})

// Toggle play pause for songs
const makeplays = () =>{
    songplaypause.forEach((btn) =>{
        btn.classList.remove("fa-pause");
        btn.classList.add("fa-play");
    })
}

songplaypause.forEach((btn) =>{
    btn.addEventListener("click", (e) => {
        makeplays();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        songIndex = e.target.id;
        audioElement.src = 'Songs/' + songIndex + '.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");

        poster.src = songs[songIndex-1].coverPath;
        
        makewhites();
        
        if(e.target.classList.contains("fa-pause")){
            songItems[songIndex-1].style.backgroundColor = "black";
            songItems[songIndex-1].style.color = "white";
        }
            
    })

})

// toggling next and prev buttons
next.addEventListener("click", () =>{
    if(songIndex >= songs.length ) {
        songIndex = 1;
    }
    else {
        songIndex++;
    }
    poster.src = songs[songIndex-1].coverPath;
    audioElement.src = 'Songs/' + songIndex + '.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})

prev.addEventListener("click", () =>{
    if(songIndex <= 1) {
        songIndex = 7;
    }
    else {
        songIndex--;
    }
    poster.src = songs[songIndex-1].coverPath;
    audioElement.src = 'Songs/' + songIndex + '.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})

const makewhites = () =>{
    songItems.forEach((song) =>{
        song.style.backgroundColor = "white";
        song.style.color = "black";
    })
}