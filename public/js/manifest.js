window.addEventListener('DOMContentLoaded', () => {
	console.log('dom has loaded');
	let loadImages = [].slice.call(document.querySelectorAll('.photography-entry.img'));
	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver(
			function (entries, observer) {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						const DOMNode = e.target;
						const { clientHeight: height, clientWidth: width } = DOMNode;
						const srcStr = e.target.pathname;
						const src = `${srcStr}?h=${height}&w=${width}`;
						DOMNode.style.backgroundImage = `url(${src})`;
						observer.unobserve(DOMNode);
					}
				});
			},
			{ rootMargin: '0px 0px 256px 0px' }
		);
		loadImages.forEach((e) => {
			observer.observe(e);
		});
	} else {
		// fallback to backward compatible code
		let active = false;
		const lazyLoad = function () {
			if (active === false) {
				active = true;
				setTimeout(() => {
					loadImages.forEach((lazyImage) => {
						if (
							lazyImage.getBoundingClientRect().top <= window.innerHeight &&
							lazyImage.getBoundingClientRect().bottom >= 0 &&
							getComputedStyle(lazyImage).display !== 'none'
						) {
							const srcStr = lazyImage.pathname;
							const { clientHeight: height, clientWidth: width } = lazyImage;
							const src = `${srcStr}?h=${height}&w=${width}`;
							lazyImage.style.backgroundImage = `url(${src}`;

							loadImages = loadImages.filter((e) => e !== lazyImage);

							if (loadImages.length === 0) {
								document.removeEventListener('scroll', lazyLoad);
								window.removeEventListener('resize', lazyLoad);
								window.removeEventListener('orientationchange', lazyLoad);
							}
						}
					});
				}, 200);
			}
		};
		document.addEventListener('scroll', lazyLoad);
		window.addEventListener('resize', lazyLoad);
		window.addEventListener('orientationchange', lazyLoad);
	}
});
window.addEventListener('load', () => {
	const loader = document.getElementById('ftco-loader');
	if (loader) {
		loader.classList.remove('show');
	}
});
