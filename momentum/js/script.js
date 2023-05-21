import tranlateMap from "../js/translate.js";
import bacgroundSourse from "../js/background.js";
let currentLanguage = 0;
let currentBackground = 0;
window.addEventListener('load', loadAll)

function loadAll() {
	const promise = new Promise((res) => {
		loadSettings()
		res(true)
	}).then(() => {
		showGreeting()
		setBackground()
		loadWether()
		quote()
		loadTodoList()
	})

}

//1-----------------------//

const timeViewport = document.querySelector('.time');
const dateViewport = document.querySelector('.date');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


function showTime() {
	const date = new Date();
	const dateLang = tranlateMap[currentLanguage].date;
	const currentTime = date.toLocaleTimeString();
	const currentDate = date.toLocaleDateString(dateLang, options);

	timeViewport.innerHTML = currentTime;
	dateViewport.innerHTML = currentDate;
	return setTimeout(showTime, 1000);
}
showTime();

//2-----------------------//

const greetingViewport = document.querySelector('.greeting');

function showGreeting() {
	const timeKey = tranlateMap[currentLanguage].timeKey;
	const greetingStart = tranlateMap[currentLanguage].greetingStart;
	const date = new Date();
	const hour = date.getHours();
	let greeting = '';
	for (let key in timeKey) {
		if (timeKey[key].includes(+hour))
			greeting = `${greetingStart}${key}`;
	}
	greetingViewport.innerHTML = greeting;
	return setTimeout(showGreeting, 600000);
}
// setTimeout(showGreeting, 300);

const inputName = document.querySelector('.name');

function saveName() {
	localStorage.setItem('name', inputName.value);
	saveSettings()
	saveTodoListDone()
}
window.addEventListener('beforeunload', saveName);

function loadName() {
	const name = localStorage.getItem('name');
	if (name && name.length != 0) {
		inputName.value = name;
	} else {
		inputName.value = '[Enter Name]';
	}
	// setTimeout(setBackground, 100);
	// setTimeout(loadWether, 100);

}
window.addEventListener('load', loadName);

//3-----------------------//

const body = document.querySelector('body');
let numbImg = 0;

body.style.backgroundPosition = 'center';
body.style.backgroundSize = 'cover';

function setBackground() {
	if (currentBackground != 0) return setBackgroundApi()
	const greeting = greetingViewport.textContent;
	const imageLinks = bacgroundSourse[currentBackground];
	const image = new Image();
	let link = '';
	numbImg = Math.round(Math.random() * 19 + 1) + '';
	numbImg = numbImg.length == 2 ? numbImg : '0' + numbImg;
	link = imageLinks[greeting](numbImg);
	let url = `url(${link})`;
	image.src = link;
	image.onload = () => body.style.backgroundImage = url;
}

const buttonNext = document.querySelector('.slide-next');
const buttonPrev = document.querySelector('.slide-prev');

buttonNext.addEventListener('click', nextImage)
buttonPrev.addEventListener('click', prevImage);

function nextImage() {
	if (currentBackground != 0) return nextImageApi()
	const imageLinks = bacgroundSourse[currentBackground];
	const greeting = greetingViewport.textContent;
	const image = new Image();
	let link = '';
	numbImg = ((+numbImg + 1) % 20 == 0) ? '20' : (+numbImg + 1) % 20 + '';
	numbImg = numbImg.length == 2 ? numbImg : '0' + numbImg;
	link = imageLinks[greeting](numbImg);
	let url = `url(${link})`;
	urlList.push(url);
	image.src = link;
	image.onload = () => body.style.backgroundImage = url;
}

function prevImage() {
	if (currentBackground != 0) return prevImageApi()
	const imageLinks = bacgroundSourse[currentBackground];
	const greeting = greetingViewport.textContent;
	const image = new Image();
	let link = '';
	numbImg = ((+numbImg - 1) % 20 == 0) ? '20' : (+numbImg - 1) % 20 + '';
	numbImg = numbImg.length == 2 ? numbImg : '0' + numbImg;
	link = imageLinks[greeting](numbImg);
	let url = `url(${link})`;
	image.src = link;
	image.onload = () => body.style.backgroundImage = url;
}

//4-----------------------//

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const cityInput = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
	let city = cityInput.value;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${tranlateMap[currentLanguage].weather.apiLang}&appid=67fc566ce54c7d40430940ee1c8fcf97&units=metric`;
	const res = await fetch(url);
	if (res.status === 404) {
		weatherError.innerHTML = tranlateMap[currentLanguage].weather.weatherError;
		return
	}
	const data = await res.json();

	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${Math.round(data.main.temp)}°C`;
	weatherDescription.textContent = data.weather[0].description;
	wind.innerHTML = tranlateMap[currentLanguage].weather.wind;
	humidity.innerHTML = tranlateMap[currentLanguage].weather.humidity;
	weatherError.innerHTML = "";
}


cityInput.addEventListener('keypress', setCity);
function setCity(event) {
	if (event.key === 'Enter') {
		cityInput.blur();
		localStorage.setItem('city', cityInput.value)
		getWeather();
	}
}

function loadWether() {
	const city = localStorage.getItem('city');
	if (city && city.length != 0) {
		cityInput.value = city;
	} else {
		cityInput.value = tranlateMap[currentLanguage].city;
	}
	getWeather();
}

//5-----------------------//

async function quote() {
	const quoteOutput = document.querySelector('.quote');
	const authorOutput = document.querySelector('.author');
	const quotes = './assets/data.json';
	const res = await fetch(quotes);
	const data = await res.json();
	const n = Math.floor(Math.random() * data[currentLanguage].length);
	quoteOutput.innerHTML = data[currentLanguage][n].text;
	authorOutput.innerHTML = data[currentLanguage][n].author;
}
// quote();

const newQuoteButton = document.querySelector('.change-quote');
newQuoteButton.addEventListener('click', quote);

//6-----------------------//

import playList from "../js/playList.js";

const playerBtn = document.querySelector('.player-btn');
const playButton = document.querySelector('.play');
const nextAudioButton = document.querySelector('.play-next');
const prevAudioButton = document.querySelector('.play-prev');
const audio = new Audio();
let isPlay = false;
let numberAudio = 0;

playerBtn.addEventListener('click', playAudio);
playButton.addEventListener('click', playAudio);
nextAudioButton.addEventListener('click', nextAudio);
prevAudioButton.addEventListener('click', prevAudio);

function btnPause() {
	playButton.classList.add('pause');
	playerBtn.classList.add('btn-pause');
	playerBtn.classList.remove('btn-play');
}
function btnPlay() {
	playButton.classList.remove('pause');
	playerBtn.classList.remove('btn-pause');
	playerBtn.classList.add('btn-play');
}

function playAudio() {
	if (!isPlay) {
		if (audio.src) {
			audio.play();
			btnPause();
		} else {
			fetch(audio.src = playList[numberAudio].src)
				.then(() => audio.play())
				.then(() => {
					btnPause();
				});
			songs[numberAudio].classList.add('item-active');
		}
		isPlay = true;

	} else {
		isPlay = false;
		audio.pause();
		btnPlay();
	}
	setTimeout(showPlayerTime, 500);
}

function nextAudio() {
	numberAudio = (numberAudio + 1) % playList.length;
	fetch(audio.src = playList[numberAudio].src)
		.then(() => audio.play())
		.then(() => {
			isPlay = true;
			btnPause();
			songs.forEach(li => li.classList.remove('item-active'));
			songs[numberAudio].classList.add('item-active');
			showPlayerTime();
		});
}

function prevAudio() {
	numberAudio = (numberAudio - 1 + playList.length) % playList.length;
	fetch(audio.src = playList[numberAudio].src)
		.then(() => audio.play())
		.then(() => {
			isPlay = true;
			btnPause();
			songs.forEach(li => li.classList.remove('item-active'));
			songs[numberAudio].classList.add('item-active');
			showPlayerTime();
		})
}

const playListConteiner = document.querySelector('.play-list');
function loadPlayList() {
	playList.forEach(song => {
		const li = document.createElement('li');
		li.innerHTML = song.title;
		li.classList.add('play-item');
		playListConteiner.append(li);
	})
}
loadPlayList();
const songs = document.querySelectorAll('.play-item');

playListConteiner.addEventListener('click', (e) => {
	songs.forEach((song, index) => {
		if (song == e.target) numberAudio = index;
	});
	fetch(audio.src = playList[numberAudio].src)
		.then(() => audio.play())
		.then(() => {
			songs.forEach(li => li.classList.remove('item-active'));
			songs[numberAudio].classList.add('item-active');
			btnPause();
			isPlay = true;
			showPlayerTime()
		});

});

//7-----------------------//

const hidePlayer = document.querySelector('.hide-player');
const playerTime = document.querySelector('.time-code');
const timeLine = document.querySelector('.time-line');
const progressLine = document.querySelector('.progress');
const volumeBtn = document.querySelector('.volume-container');
const volumeSlider = document.querySelector('.volume-slider');
const volume = document.querySelector('.volume');
playerTime.innerHTML = '0:00/ 0:00'

function showPlayerTime() {
	if (audio.paused) {
		btnPlay();
		return isPlay = !isPlay
	}
	playerTime.innerHTML = getTimeCodeFromNum(audio.currentTime) + '/ ' + getTimeCodeFromNum(audio.duration);
	progress();
	return setTimeout(showPlayerTime, 500)
}


function getTimeCodeFromNum(num) {
	if (!num) return `0:00`
	let seconds = parseInt(num);
	let minutes = parseInt(seconds / 60);
	seconds = seconds - 60 * minutes;
	return `${minutes}:${String(seconds).padStart(2, 0)}`
}

timeLine.addEventListener('click', event => {
	const timeLineWidth = window.getComputedStyle(timeLine).width;
	const timeToSeek = event.offsetX / parseInt(timeLineWidth) * audio.duration;
	audio.currentTime = timeToSeek;
})


function progress() {
	const time = audio.currentTime;
	progressLine.style.width = time / audio.duration * 100 + '%';
	return setTimeout(progress, 500)
}

volumeBtn.addEventListener('mouseover', () => {
	volumeSlider.classList.add('active');
})
volumeBtn.addEventListener('mouseout', () => {
	volumeSlider.classList.remove('active');
})


volumeSlider.addEventListener('click', event => {
	const volumeRange = document.querySelector('.volume-range');
	const volume = event.offsetX /
		parseInt(window.getComputedStyle(volumeSlider).width);
	audio.volume = volume;
	volumeRange.style.width = volume * 100 + "%";
})


volume.addEventListener('click', () => {
	volume.classList.toggle('icono-volumeMedium');
	volume.classList.toggle('icono-volumeMute');
	audio.muted = !audio.muted;
})


audio.addEventListener('play', () => {
	document.querySelector('.new-player')
		.classList.add('active');
})

hidePlayer.addEventListener('click', () =>
	document.querySelector('.new-player')
		.classList.remove('active'));

//10-----------------------//

const apiInput = document.querySelector('.api-query');
const settingBtn = document.querySelector('.settings-container');
const settingsParam = document.querySelector('.settings-parametrs');
const checkLanguage = document.querySelector('.check-language');
const checkBackground = document.querySelectorAll('.check-background');
const background = {
	0: 'default',
	1: 'unsplash',
	2: 'flickr',
};
let urlList = [];

checkLanguage.addEventListener('click', () => {
	checkLanguage.classList.toggle('cheked');
	currentLanguage = (currentLanguage + 1) % 2;
	loadWether();
	showGreeting();
	quote();
});

checkBackground.forEach(btn => btn.addEventListener('click', e => {
	checkBackground.forEach((btn, index) => {
		btn.classList.remove('cheked');
		if (e.target == checkBackground[index]) {
			checkBackground[index].classList.add('cheked');
			currentBackground = index;
			setBackground();
		}
	});

	if (currentBackground != 0) {
		apiInput.classList.add('active');
	} else { apiInput.classList.remove('active'); }
}));


document.addEventListener('click', e => {
	if (e.target.closest('.settings-container')) {
		settingBtn.classList.toggle('active');
		settingsParam.classList.toggle('active');
		return
	}

	if (!e.target.closest('.settings-parametrs')) {
		settingBtn.classList.remove('active');
		settingsParam.classList.remove('active');
	}

})

function saveSettings() {

	localStorage.setItem('language', currentLanguage);
	localStorage.setItem('bacground', currentBackground);
}

function loadSettings() {

	currentLanguage = localStorage.hasOwnProperty('language') ?
		+localStorage.getItem('language') : 0;

	currentBackground = localStorage.hasOwnProperty('bacground') ?
		+localStorage.getItem('bacground') : 0;

	if (currentLanguage == 1) checkLanguage.classList.add('cheked');
	if (currentBackground != 0) apiInput.classList.add('active');

	checkBackground[currentBackground].classList.add('cheked');
}

//8-----------------------//


//9-----------------------//

apiInput.addEventListener('keypress', e => {
	if (e.key == 'Enter') loadBackground()
});


function loadBackground() {
	const image = new Image();
	const link = bacgroundSourse[currentBackground](apiInput.value);

	if (currentBackground == 1) {
		fetch(link)
			.then(res => res.json())
			.then(url => url.urls.regular)
			.then(url => {
				image.src = url;
				image.onload = () => {
					body.style.backgroundImage = `url(${url})`;
					urlList.push(body.style.backgroundImage);
					numbImg = urlList.length - 1;
				}
			});
	}

	if (currentBackground == 2) {
		let n = Math.floor(Math.random() * 100);
		fetch(link)
			.then(res => res.json())
			.then(url => url.photos.photo[n].url_l)
			.then(url => {
				image.src = url;
				image.onload = () => {
					body.style.backgroundImage = `url(${url})`;
					urlList.push(body.style.backgroundImage);
					numbImg = urlList.length - 1;
				}
			});
	}
}

function setBackgroundApi(n) {
	if (urlList.length == 0) return loadBackground();

	body.style.backgroundImage = urlList[n];
}


function nextImageApi() {
	if ((numbImg == urlList.length - 1) || (urlList.length == 0)) {
		return loadBackground();
	} else { numbImg++; }

	return setBackgroundApi(numbImg)
}


function prevImageApi() {
	let link = '';
	if (numbImg == 0) {
		return loadBackground();
	} else { numbImg-- }

	return setBackgroundApi(numbImg)
}

//11-----------------------//

const todoListBtn = document.querySelector('.icono-document');
const todoList = document.querySelector('.todolist-wraper');
const todoListCase = document.querySelector('.todolist-case');
const task = document.getElementsByClassName('task');
const inputTask = document.querySelector('.new-todo');

let taskList = {};

inputTask.addEventListener('keypress', (e) => {
	if (e.key == 'Enter') addTask()
});



todoListBtn.addEventListener('click', () => {
	const task = document.querySelectorAll('.task');
	if (todoList.classList.contains('active')) {
		todoList.classList.remove('active');
		task.forEach(el => el.classList.remove('active'));
	} else {
		todoList.classList.add('active');
		setTimeout(() => task.forEach(el => el.classList.add('active')), 1000);
	}
});

function addTask() {
	const task = document.querySelectorAll('.task');
	let n = 0;
	if (!inputTask.value) return
	if (task) n = task.length;
	
	const newTask = inputTask.value;
	const li = document.createElement('li');
	li.innerHTML = newTask;
	li.classList.add('task');
	todoListCase.append(li);
	taskList[n] = {
		task: `${newTask}`,
		done: false,
	};


	document.querySelectorAll('.task').forEach(el =>
		el.classList.add('active'));

	saveTodoList()
	loadCheckTask()
	addListener()
}

function saveTodoList() {
	const saveList = JSON.stringify(taskList);
	localStorage.setItem('todo', saveList);
}

function loadTodoList() {
	let loadTodo = localStorage.getItem('todo');
	if (!loadTodo) return
	taskList = JSON.parse(loadTodo);
	let n = Object.keys(taskList);
	n.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = taskList[item].task;
		li.classList.add('task');
		todoListCase.append(li);
	})
	loadCheckTask()
	addListener()
}

function loadCheckTask() {
	const n = Object.keys(taskList);
	const task = document.querySelectorAll('.task');
	n.forEach(item => {
		const done = taskList[item].done;
		if (done) task[item].classList.add('done');
	});
}

function addListener() {
	const task = document.querySelectorAll('.task');
	task.forEach(el =>
		el.addEventListener('click', doneTask))
	loadCheckTask()
}

function doneTask(event) {
	const task = document.querySelectorAll('.task');
	task.forEach((el, index) => {
		if (event.target == el) {
			el.classList.toggle('done');
			taskList[index].done = !taskList[index].done;
		}
	})
}

function saveTodoListDone() {
	let newTaskList = {};
	let n = 0;
	const keys = Object.keys(taskList);
	keys.forEach(item => {
		if (!taskList[item].done) {
			newTaskList[n] = taskList[item];
			n++;
		}
	})

	const saveList = JSON.stringify(newTaskList);
	localStorage.setItem('todo', saveList);
}

