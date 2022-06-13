//Elementos
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

//Músicas
const songs = [
'Arctic Monkeys - I Wanna Be Yours',
'Audioslave - Show Me How to Live',
'BTS - Baepsae (Silver Spoon)',
'Bury the Light',
'Dreamcatcher - Fly High',
'Metallica - Sad But True',
'Omori Version - Bo ens My Time'];

//Variável que define as músicas
let songIndex = 0;

//Carrega inicialmente as informações da música para o documento (DOM)
loadSong(songs[songIndex]);


//Atualiza a música e seus detalhes
function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//Função que cria a lista de músicas
function createSongList(){
    const list = document.createElement("ol");
    
    for(let i = 0; i < songs.length; i++){
        const item = document.createElement("li")
        item.appendChild(document.createTextNode(songs[i]))
        list.appendChild(item)
    }

    return list;
}



//Toca a música
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

//Pausa a música
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

//Avança para a música anterior
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

//Avança para a próxima música
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

//Atualiza a barra de duração da música
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//Configura a barra de progresso de acordo com a música
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Adquire a duração e o tempo real da música
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	//Define o tempo real em minutos
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	//Define o tempo real em segundos
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	//Muda o tempo real da DOM
	currTime.innerHTML = min +':'+ sec;

	//Define a duração dos minutos
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	//Define a duração dos segundos
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

//Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Troca de músicas
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Atualização da música e tempo atual
audio.addEventListener('timeupdate', updateProgress);

//Click da barra de progresso da música
progressContainer.addEventListener('click', setProgress);

//Quando a música acaba
audio.addEventListener('ended', nextSong);

//Tempo da música
audio.addEventListener('timeupdate',DurTime);

//Função que seleciona a música
const songList = document.getElementById("songList");
songList.appendChild(createSongList());
const links = document.querySelectorAll("li");
for (const link of links) {	
  setSong = () => {loadSong(link.innerText); playSong(); songIndex = songs.indexOf(link.innerText)}
  link.addEventListener("click",setSong);
}