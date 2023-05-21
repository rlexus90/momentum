const data = {
	weather: [{
		id: 0,
		description: 0,
	}],
	main: {
		temp: 0,
		humidity: 0,
	},
	wind: {
		speed: 0,
	},
}

const tranlateMap = [
	{
		language: 'Ukrainian',
		quote: 0,
		date: 'ua-De',
		timeKey: {
			'го Ранку': [6, 7, 8, 9, 10, 11],
			'го Обіду': [12, 13, 14, 15, 16, 17],
			'го Вечора': [18, 19, 20, 21, 22, 23],
			'ї Ночі': [24, 0, 1, 2, 3, 4, 5]
		},
		greetingStart: 'Добро',
		weather: {
			weatherError: "Місто не знайдено",
			wind: `Швидкість вітру: ${Math.round(data.wind.speed)} м/с.`,
			humidity: `Вологість ${Math.round(data.main.humidity)}%`,
			apiLang: 'lang=ua',
		},
		city: 'Київ',
	},
	{
		language: 'English',
		quote: 1,
		date: 'en-De',
		timeKey: {
			Morning: [6, 7, 8, 9, 10, 11],
			Afternoon: [12, 13, 14, 15, 16, 17],
			Evening: [18, 19, 20, 21, 22, 23],
			Nights: [24, 0, 1, 2, 3, 4, 5]
		},
		greetingStart: 'Good ',
		weather: {
			weatherError: "City not found",
			wind: `Wind speed: ${Math.round(data.wind.speed)} m/s.`,
			humidity: `Humidity ${Math.round(data.main.humidity)}%`,
			apiLang: 'lang=en',
		},
		city: 'Kiev',
	}
];

export default tranlateMap