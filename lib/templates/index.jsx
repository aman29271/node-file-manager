/* eslint-disable no-unused-vars */
const React = require('react');
// require('../styles/index.css')
const ImageList = require('./ImageList');
const Image = require('./Image');
const Misc = require('./Misc');

function Index({ data }) {
	const imageList = data.filter(
		(e) => e.type === 'file' && (e.mimetype == 'image/jpeg' || e.mimetype == 'image/png')
	);
	return (
		<>
			<head>
				<title>Home Page</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<link rel="stylesheet" href="css/open-iconic-bootstrap.min.css" />
				<link rel="stylesheet" href="css/animate.css" />
				<link rel="stylesheet" href="css/owl.carousel.min.css" />
				<link rel="stylesheet" href="css/owl.theme.default.min.css" />
				<link rel="stylesheet" href="css/magnific-popup.css" />
				<link rel="stylesheet" href="css/aos.css" />
				<link rel="stylesheet" href="css/ionicons.min.css" />
				<link rel="stylesheet" href="css/bootstrap-datepicker.css" />
				<link rel="stylesheet" href="css/jquery.timepicker.css" />
				<link rel="stylesheet" href="css/flaticon.css" />
				<link rel="stylesheet" href="css/icomoon.css" />
				<link rel="stylesheet" href="css/style.css" />
			</head>
			<center>
				<h1>File Manager</h1>
			</center>
			<div id="colorlib-page">
				<div id="colorlib-main">
					<section className="ftco-section-2">
						<div className="photograhy">
							<div className="row no-gutters">
								{/* <ImageList data={imageList} /> */}
								{data.map((e) => {
									if (e.type === 'directory') {
										return <Misc type={e.type} data={e} key={e.uuid} />;
									}
									if (e.type === 'file') {
										switch (e.mime) {
											case 'application/json':
											case 'application/pdf':
												return <Misc type={e.mime} data={e} key={e.uuid} />;
											case 'image/jpeg':
											case 'image/svg+xml':
											case 'image/png':
												return <Image data={e} key={e.uuid} />;
											// break;
											case 'video/mp4':
												return (
													<a href={`/${e.uuid}`} key={e.uuid} target="_blank" rel="noreferrer">
														<video controls height="150" width="184">
															<source src={`/${e.uuid}`} type={e.mime}></source>
														</video>
													</a>
												);
											case 'video/x-matroska':
												return (
													<a href={`/${e.uuid}`} key={e.uuid} target="_blank" rel="noreferrer">
														<video controls height="150" width="184">
															<source src={`/${e.uuid}`}></source>
														</video>
													</a>
												);
											default:
												return <Misc type={e.mime} data={e} key={e.uuid} />;
										}
									}
								})}
							</div>
						</div>
					</section>
				</div>
			</div>
			<div id="ftco-loader" className="show fullscreen">
				<svg className="circular" width="48px" height="48px">
					<circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee" />
					<circle
						className="path"
						cx="24"
						cy="24"
						r="22"
						fill="none"
						strokeWidth="4"
						strokeMiterlimit="10"
						stroke="#F96D00"
					/>
				</svg>
			</div>

			<script src="js/jquery.min.js"></script>
			<script src="js/jquery-migrate-3.0.1.min.js"></script>
			<script src="js/popper.min.js"></script>
			<script src="js/bootstrap.min.js"></script>
			<script src="js/jquery.easing.1.3.js"></script>
			<script src="js/jquery.waypoints.min.js"></script>
			<script src="js/jquery.stellar.min.js"></script>
			<script src="js/owl.carousel.min.js"></script>
			<script src="js/jquery.magnific-popup.min.js"></script>
			<script src="js/aos.js"></script>
			<script src="js/jquery.animateNumber.min.js"></script>
			<script src="js/bootstrap-datepicker.js"></script>
			<script src="js/scrollax.min.js"></script>
			<script src="js/main.js"></script>
			<script src="js/manifest.js"></script>
		</>
	);
}
module.exports = Index;
