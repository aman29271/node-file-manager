/* eslint-disable react/prop-types */
const React = require('react');
const Image = require('./Image');
const Misc = require('./Misc');
const Loader = require('./Loader');
const Video = require('./video');
const Head = require('./Head');
const JsBundle = require('./JsBundle');

function Index({ data: { files, currURL, currentDir, pathname, parentList } }) {
	return (
		<>
			<Head />
			<section className="section">
				<div className="container">
					<p className="heading">File Manager</p>
					<p className="title is-size-4">Home dir: {pathname}</p>
				</div>
				<div className="container">
					<nav className="breadcrumb">
						<ul>
							<li>
								<a href="/" className={currURL === '/' ? 'is-active' : ''}>
									Home
								</a>
							</li>
							{parentList.map((ele) => {
								return (
									<li key={ele.uuid}>
										<a href={ele.uuid}>{ele.name}</a>
									</li>
								);
							})}
							{currURL !== '/' && (
								<li>
									<a href={currURL} className="is-active">
										{currentDir}
									</a>
								</li>
							)}
						</ul>
					</nav>
					<div id="colorlib-page">
						<div id="colorlib-main">
							<section className="ftco-section-2">
								<div className="photograhy">
									<div className="row no-gutters">
										{files.map((e) => {
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
				</div>
			</section>
			<Loader />
			<JsBundle />
			<script src="/static/js/intersection-observer.js"></script>
		</>
	);
}
module.exports = Index;
