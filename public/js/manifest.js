window.addEventListener('DOMContentLoaded', () => {
	console.log('dom has loaded');
	const loadImages = [].slice.call(document.querySelectorAll('.photography-entry.img'));
	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver(
			function (entries, observer) {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						const DOMNode = e.target;
						const srcStr = e.target.pathname;
						const { clientHeight: height, clientWidth: width } = DOMNode;
						const src = `${srcStr}?h=${height}&w=${width}`;
						DOMNode.style.backgroundImage = `url(${src}`;
						observer.unobserve(DOMNode);
					}
				});
			},
			{ rootMargin: '0px 0px 100px 0px', threshold: 0.5 }
		);
		loadImages.forEach((e) => {
			observer.observe(e);
		});
	} else {
		// fallback to backward compatible code
	}
});
window.addEventListener('load', () => {
	const loader = document.getElementById('ftco-loader');
	if (loader) {
		loader.classList.remove('show');
	}
});
