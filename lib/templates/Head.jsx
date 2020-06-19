const React = require('react');

const Head = () => {
	return (
		<head>
			<title>Home Page</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<link rel="stylesheet" href="/static/css/style.css" />
			<link rel="stylesheet" href="/static/bulma.css" />
			<link rel="preload" as="script" href="/static/js/jquery.min.js" />
			<link rel="preload" as="script" href="/static/js/manifest.js" />
			<link rel="preload" as="script" href="/static/js/owl.carousel.min.js" />
			<link rel="preload" as="script" href="/static/js/jquery.magnific-popup.min.js" />
			<link rel="preload" as="script" href="/static/js/jquery.waypoints.min.js" />
		</head>
	);
};
module.exports = Head;
