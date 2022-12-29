//Objects of songs in array

let songs = [
    {songName : "Warriyo - Mortals" , filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName : "cielo - Huma-Huma" , filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName : "DEAF KEV- Invincible" , filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName : "Different Heaven & EHIDE" , filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName : "Janji-Heros-Tonight-feat" , filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName : "Rabba - Salam-e-ishq (demo)" , filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName : " Saath - Salam-e-ishq(demo) " , filePath:"songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName : "Bhuladena - Salam-e-ishq (demo) " , filePath:"songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName : "Tumhari- Salam-e-ishq (demo) " , filePath:"songs/9.mp3", coverPath: "covers/9.jpg"},
]

//Initializing variables
let masterPlay = document.getElementById('masterPlay'); //(used for main play key)
let audioElement = new Audio('songs/1.mp3'); //(Preferrable 1st select demo audio)
let gif = document.getElementById('gif'); //(Gif is used for intializing the gif at bottom)
let myProgressBar = document.getElementById('myProgressBar'); //(intilaze the progress bar)
let songIndex = 0; //(intialize the local variables for prior use)
let songItems = Array.from(document.getElementsByClassName('songItem'));  //(Update the list of object items in the respctive places as it wont get retract)
let masterSongName = document.getElementById('masterSongName'); //(upadte the song Name at the below point which song is playing)
// ------------------------------------------------------------------------------
//Progress Bar update Seeker

audioElement.addEventListener('timeupdate', ()=> {
    // console.log((audioElement.duration-audioElement.currentTime).gettime())
    progress = parseInt((audioElement.currentTime / audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

//-------------------------------------------------------------------------------------------------

//Make the object to iterate into the website and play as per the player concerns
//Update the object elements on website like lists of songs

songItems.forEach((element, i ) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

})

//-----------------------------------------------------------------------------------------
///Function is used in making all the other songs to get paused when we click on some song
const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


//Run the All Songs while it clicks on play button

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        Selectbtn();
        makeAllPlays();  ///Function is used in making all the other songs to get paused when we click on some song
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        
    })


})
//=======================================================================================
//Play and pause the song in list
const Selectbtn = ()=>{ Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused){
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
    
        }
    })
})
}
//=======================================================================================
//Update to the next song

document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

//=======================================================================================
//Update to the previous song

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

//Handle main play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }
})

// ------------------------------------------------------------------
