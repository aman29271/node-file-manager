(function ($) {
	'use strict';
	var fullHeight = function () {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();

	var carousel = function () {
		$('.home-slider').owlCarousel({
			loop: true,
			autoplay: true,
			margin: 0,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: false,
			autoplayHoverPause: false,
			items: 1,
			navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
			responsive: {
				0: {
					items: 1,
				},
				600: {
					items: 1,
				},
				1000: {
					items: 1,
				},
			},
		});
	};
	carousel();

	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(
			function (direction) {
				if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function () {
						$('body .ftco-animate.item-animate').each(function (k) {
							var el = $(this);
							setTimeout(
								function () {
									var effect = el.data('animate-effect');
									if (effect === 'fadeIn') {
										el.addClass('fadeIn ftco-animated');
									} else if (effect === 'fadeInLeft') {
										el.addClass('fadeInLeft ftco-animated');
									} else if (effect === 'fadeInRight') {
										el.addClass('fadeInRight ftco-animated');
									} else {
										el.addClass('fadeInUp ftco-animated');
									}
									el.removeClass('item-animate');
								},
								k * 50,
								'easeInOutExpo'
							);
						});
					}, 100);
				}
			},
			{ offset: '95%' }
		);
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [1, 1], // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true,
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
		},
	});
})(jQuery);
