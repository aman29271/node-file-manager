window.addEventListener('DOMContentLoaded', () => {
	console.log('dom has loaded');
	const {
		clientHeight,
		clientWidth,
		style: { backgroundImage },
	} = document.querySelector('.photography-entry');
	console.log(`width: ${clientWidth}, height:${clientHeight}`);
	let bgImage = backgroundImage;
	const regex = /url\("(.*)\?.*"\)/;
	bgImage = `${bgImage.match(regex)[1]}?w=${clientWidth}&h=${clientHeight}`;
});
