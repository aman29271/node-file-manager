/* eslint-disable react/prop-types */
const React = require('react');

const VideoTemplate = ({ uuid }) => {
	return <video src={`/${uuid}`} height="100" width="177" />;
};
module.exports = VideoTemplate;
