/* eslint-disable react/prop-types */
const React = require('react');
// require('../styles/index.css')
const Image = require('./Image');
const Misc = require('./Misc');
const Loader = require('./Loader');
const Video = require('./video');
const Head = require('./Head');
const JsBundle = require('./JsBundle');

function Index({ data }) {
	return (
		<>
			<Head />
			<center>
				<h1>File Manager</h1>
			</center>
			<div id="colorlib-page">
				<div id="colorlib-main">
					<section className="ftco-section-2">
						<div className="photograhy">
							<div className="row no-gutters">
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
											case 'video/mp4':
											case 'video/x-matroska':
												return <Video data={e} key={e.uuid} />;
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
			<Loader />
			<JsBundle />
			<script src="js/intersection-observer.js"></script>
		</>
	);
}
module.exports = Index;
