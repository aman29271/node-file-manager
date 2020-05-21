/* eslint-disable react/prop-types */
const React = require('react');
const Image = require('./Image');

const ImageList = ({ data }) => {
	return (
		<>
			{data.map((e) => (
				<Image data={e} key={e.uuid} />
			))}
		</>
	);
};
module.exports = ImageList;
