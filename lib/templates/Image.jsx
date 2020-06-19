/* eslint-disable react/prop-types */
const React = require('react');

const Image = ({ data: { uuid } }) => {
	return (
		<div className="col-md-2 col-6 " key={uuid}>
			<a
				href={`/${uuid}`}
				className="photography-entry img image-popup d-flex justify-content-center align-items-center"
				style={{ backgroundImage: 'url(/static/images/image-x-pict.svg' }}
			></a>
		</div>
	);
};
module.exports = Image;
