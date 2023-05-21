const bacgroundSourse = [
	{
		'Good Morning': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/morning/${numbImg}.jpg`,
		'Good Afternoon': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/afternoon/${numbImg}.jpg`,
		'Good Evening': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/evening/${numbImg}.jpg`,
		'Good Nights': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/night/${numbImg}.jpg`,
		'Доброго Ранку': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/morning/${numbImg}.jpg`,
		'Доброго Обіду': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/afternoon/${numbImg}.jpg`,
		'Доброго Вечора': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/evening/${numbImg}.jpg`,
		'Доброї Ночі': (numbImg) => `https://rlexus90.github.io/stage1-tasks/images/night/${numbImg}.jpg`,
	},

	function getUrl(query) {
		const clientId = 'client_id=Wcim7TjAM6L8QRSjGixnS1qyIl-Oc4L_9o2SksBqTIk';
		if (!query) query = 'nature';
		return `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&${clientId}`;
	},

	function getUrl(query) {
		const clientId = '92318ac61c793b29bbf31b9294a3188d';
		if (!query) query = 'nature';
		return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${clientId}&tags=${query}&extras=url_l&format=json&nojsoncallback=1`;
	},
];

export default bacgroundSourse