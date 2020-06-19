/* eslint-disable react/prop-types */
const React = require('react');

const Video = ({ data: { uuid, mime } }) => {
	return (
		<a href={`/${uuid}`} key={uuid} target="_blank" rel="noreferrer">
			<video controls height="150" width="184" poster="/static/images/video-x-generic.svg" preload="none">
				<source src={`/${uuid}`} type={mime}></source>
			</video>
		</a>
	);
};
module.exports = Video;
