/* eslint-disable react/prop-types */
const React = require('react');

const Misc = ({ data: { uuid, name }, type }) => {
	let ImageName;
	switch (type) {
		case 'application/pdf':
			ImageName = '/images/application-pdf.svg';
			break;
		case 'directory':
			ImageName = '/images/blue-folder.svg';
			break;
		case 'text':
			ImageName = '/images/text-x-css.svg';
			break;
		case 'application/json':
			ImageName = '/images/text-x-javascript.svg';
			break;
		default:
			ImageName = '/images/applications-system.svg';
	}
	return (
		<div className="col-md-2 ftco-animate">
			<a href={`/${uuid}`} key={uuid} className="anchor-misc">
				<img src={ImageName} height="64" width="64" />
				<p>{name}</p>
			</a>
		</div>
	);
};
module.exports = Misc;
