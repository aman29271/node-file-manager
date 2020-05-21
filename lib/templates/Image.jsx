/* eslint-disable react/prop-types */
const React = require('react');

const Image = ({ data: { uuid } }) => {
	return (
		<div className="col-md-2 ftco-animate" key={uuid}>
			<a
				href={`/${uuid}`}
				className="photography-entry img image-popup d-flex justify-content-center align-items-center"
				style={{ backgroundImage: `url(/${uuid}?w=300&h=300)` }}
			></a>
		</div>
	);
};
module.exports = Image;
