/*
==========================================================
Project Kitty
Sprint 2.4 - music.js

Music Controller

Responsibilities:
1) Start music after intro interaction
2) Keep background music looping
3) Fade volume for emotional chapters
4) Render premium mini player with playback controls
==========================================================
*/

const Music = {

	defaultTrack:{

		filePath:
			"assets/music/Jab Koi Baat Bigad Jaye _ AI Reimagined _ Late Night 90s Classics _ Bombay Blues (online-audio-converter.com).mp3",

		title:"Bombay Blues",

		label:"Jab Koi Baat Bigad Jaye"

	},

	finalTrack:{

		filePath:
			"assets/music/Baar Baar Din Yeh Aaye _ no names without Sunita _ Happy Birthday _ Sonu Nigam Shifa Asgarali (online-audio-converter.com).mp3",

		title:"Birthday Special",

		label:"Baar Baar Din Yeh Aaye"

	},

	finalSceneId:"happybirthday",

	activeTrackType:"default",

	defaultVolume:.42,

	emotionalVolume:.24,

	fadeStep:.015,

	fadeIntervalMs:90,

	isStarted:false,

	isMuted:false,

	isCollapsed:true,

	targetVolume:.42,

	fadeTimer:null,

	audio:null,

	player:null,

	playPauseBtn:null,

	collapseBtn:null,

	muteBtn:null,

	progress:null,

	timeLabel:null,

	wave:null

};

const emotionalSceneIds = new Set([

	"wedding",
	"birthday2022",
	"birthday2026",
	"happybirthday"

]);

function createAudio(){

	const audio = new Audio(Music.defaultTrack.filePath);

	audio.loop = true;

	audio.preload = "auto";

	audio.volume = Music.defaultVolume;

	Music.audio = audio;

}

function createMiniPlayer(){

	const player = document.createElement("div");

	player.className = "music-player";

	player.innerHTML = `
		<div class="music-player-head">
			<div class="music-player-meta">
				<div class="music-player-title">${Music.defaultTrack.title}</div>
				<div class="music-player-track">${Music.defaultTrack.label}</div>
			</div>
			<button id="musicCollapseBtn" type="button" class="music-collapse-btn" aria-label="Expand music player">▴</button>
		</div>
		<div class="music-wave" aria-hidden="true">
			<span></span><span></span><span></span><span></span><span></span>
		</div>
		<div class="music-controls">
			<button id="musicPlayPauseBtn" type="button">Play</button>
			<button id="musicMuteBtn" type="button">Mute</button>
		</div>
		<div class="music-timeline">
			<input id="musicProgress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Music progress">
			<div id="musicTimeLabel">0:00 / 0:00</div>
		</div>
	`;

	document.body.appendChild(player);

	document.body.classList.add("has-music-player");

	document.body.classList.add("music-player-collapsed");

	Music.player = player;

	Music.playPauseBtn = document.getElementById("musicPlayPauseBtn");

	Music.collapseBtn = document.getElementById("musicCollapseBtn");

	Music.muteBtn = document.getElementById("musicMuteBtn");

	Music.progress = document.getElementById("musicProgress");

	Music.timeLabel = document.getElementById("musicTimeLabel");

	Music.wave = player.querySelector(".music-wave");

	setCollapsed(true);

}

function formatSeconds(seconds){

	if(!Number.isFinite(seconds) || seconds < 0){

		return "0:00";

	}

	const mins = Math.floor(seconds / 60);

	const secs = Math.floor(seconds % 60);

	return `${mins}:${String(secs).padStart(2,"0")}`;

}

function updateTimeline(){

	if(!Music.audio || !Music.progress || !Music.timeLabel){

		return;

	}

	const duration = Number.isFinite(Music.audio.duration) ? Music.audio.duration : 0;

	const current = Number.isFinite(Music.audio.currentTime) ? Music.audio.currentTime : 0;

	if(duration > 0){

		Music.progress.value = String((current / duration) * 100);

	}

	else{

		Music.progress.value = "0";

	}

	Music.timeLabel.textContent = `${formatSeconds(current)} / ${formatSeconds(duration)}`;

}

function updatePlayerState(){

	if(!Music.player || !Music.playPauseBtn || !Music.muteBtn){

		return;

	}

	const playing = Music.isStarted && !Music.audio.paused;

	Music.playPauseBtn.textContent = playing ? "Pause" : "Play";

	Music.muteBtn.textContent = Music.isMuted ? "Unmute" : "Mute";

	Music.player.classList.toggle("is-playing",playing && !Music.isMuted);

	Music.player.classList.toggle("is-muted",Music.isMuted);

	Music.player.classList.toggle("is-collapsed",Music.isCollapsed);

	document.body.classList.toggle("music-player-collapsed",Music.isCollapsed);

	if(Music.collapseBtn){

		Music.collapseBtn.textContent = Music.isCollapsed ? "▾" : "▴";

		Music.collapseBtn.setAttribute(

			"aria-label",

			Music.isCollapsed ? "Expand music player" : "Collapse music player"

		);

	}

}

function setCollapsed(shouldCollapse){

	Music.isCollapsed = Boolean(shouldCollapse);

	updatePlayerState();

}

function toggleCollapsed(){

	setCollapsed(!Music.isCollapsed);

}

function startMusic(){

	if(!Music.audio || Music.isMuted){

		return;

	}

	Music.audio.play()
		.then(() => {

			Music.isStarted = true;

			updatePlayerState();

			updateTimeline();

		})
		.catch(() => {

			updatePlayerState();

		});

}

function pauseMusic(){

	if(!Music.audio){

		return;

	}

	Music.audio.pause();

	updatePlayerState();

}

function togglePlayPause(){

	if(!Music.audio){

		return;

	}

	if(Music.audio.paused){

		startMusic();

		applySceneVolume(getCurrentSceneId());

		return;

	}

	pauseMusic();

}

function fadeToVolume(target){

	if(!Music.audio){

		return;

	}

	Music.targetVolume = Math.max(0,Math.min(1,target));

	if(Music.fadeTimer){

		clearInterval(Music.fadeTimer);

	}

	Music.fadeTimer = setInterval(() => {

		const current = Music.audio.volume;

		const delta = Music.targetVolume - current;

		if(Math.abs(delta) <= Music.fadeStep){

			Music.audio.volume = Music.targetVolume;

			clearInterval(Music.fadeTimer);

			Music.fadeTimer = null;

			return;

		}

		Music.audio.volume = current + Math.sign(delta) * Music.fadeStep;

	},Music.fadeIntervalMs);

}

function applySceneVolume(sceneId){

	if(!Music.audio || Music.isMuted){

		return;

	}

	const nextVolume = emotionalSceneIds.has(sceneId)

		? Music.emotionalVolume

		: Music.defaultVolume;

	fadeToVolume(nextVolume);

}

function updateTrackMeta(track){

	if(!Music.player){

		return;

	}

	const titleNode = Music.player.querySelector(".music-player-title");

	const labelNode = Music.player.querySelector(".music-player-track");

	if(titleNode){

		titleNode.textContent = track.title;

	}

	if(labelNode){

		labelNode.textContent = track.label;

	}

}

function setTrackForScene(sceneId){

	if(!Music.audio){

		return;

	}

	const shouldUseFinalTrack = sceneId === Music.finalSceneId;

	const nextTrackType = shouldUseFinalTrack ? "final" : "default";

	if(Music.activeTrackType === nextTrackType){

		return;

	}

	const wasPlaying = !Music.audio.paused;

	const nextTrack = shouldUseFinalTrack ? Music.finalTrack : Music.defaultTrack;

	Music.audio.src = nextTrack.filePath;

	Music.audio.currentTime = 0;

	Music.audio.load();

	Music.activeTrackType = nextTrackType;

	updateTrackMeta(nextTrack);

	if(wasPlaying && !Music.isMuted){

		Music.audio.play().catch(() => {});

	}

	updateTimeline();

}

function toggleMute(){

	if(!Music.audio){

		return;

	}

	if(Music.isMuted){

		Music.isMuted = false;

		startMusic();

		applySceneVolume(getCurrentSceneId());

		updatePlayerState();

		return;

	}

	Music.isMuted = true;

	pauseMusic();

	updatePlayerState();

}

function getCurrentSceneId(){

	if(typeof Engine !== "undefined" && typeof CHAPTERS !== "undefined"){

		const current = CHAPTERS[Engine.currentScene];

		return current ? current.id : "";

	}

	return "";

}

function bindAudioEvents(){

	if(!Music.audio){

		return;

	}

	Music.audio.addEventListener("timeupdate",updateTimeline);

	Music.audio.addEventListener("loadedmetadata",updateTimeline);

	Music.audio.addEventListener("play",updatePlayerState);

	Music.audio.addEventListener("pause",updatePlayerState);

}

function bindPlayerControls(){

	if(Music.playPauseBtn){

		Music.playPauseBtn.addEventListener("click",togglePlayPause);

	}

	if(Music.muteBtn){

		Music.muteBtn.addEventListener("click",toggleMute);

	}

	if(Music.collapseBtn){

		Music.collapseBtn.addEventListener("click",toggleCollapsed);

	}

	if(Music.progress){

		Music.progress.addEventListener("input",() => {

			if(!Music.audio || !Number.isFinite(Music.audio.duration) || Music.audio.duration <= 0){

				return;

			}

			const percent = Number(Music.progress.value) / 100;

			Music.audio.currentTime = Music.audio.duration * percent;

			updateTimeline();

		});

	}

}

function bindMusicStartGestures(){

	const beginBtn = document.getElementById("beginBtn");

	if(beginBtn){

		beginBtn.addEventListener("click",startMusic);

	}

	document.addEventListener("keydown",(event) => {

		if(event.key !== "Enter"){

			return;

		}

		const intro = document.getElementById("intro");

		if(intro && !intro.classList.contains("hidden")){

			startMusic();

		}

	});

}

function bindSceneVolumeHandler(){

	document.addEventListener("kitty:scene-change",(event) => {

		const scene = event.detail && event.detail.scene;

		if(!scene){

			return;

		}

		setTrackForScene(scene.id);

		applySceneVolume(scene.id);

	});

}

function initializeMusic(){

	createAudio();

	createMiniPlayer();

	bindAudioEvents();

	bindPlayerControls();

	bindMusicStartGestures();

	bindSceneVolumeHandler();

	setTrackForScene(getCurrentSceneId());

	updatePlayerState();

	updateTimeline();

}

initializeMusic();

window.Music = Music;

