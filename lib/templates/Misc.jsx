/* eslint-disable react/prop-types */
const React = require('react');

const Misc = ({ data: { uuid, name }, type }) => {
	let ImageName;
	switch (type) {
		case 'application/pdf':
			ImageName = '/static/images/application-pdf.svg';
			break;
		case 'directory':
			ImageName = '/static/images/blue-folder.svg';
			break;
		case 'text':
			ImageName = '/static/images/text-x-css.svg';
			break;
		case 'application/json':
			ImageName = '/static/images/text-x-javascript.svg';
			break;
		default:
			ImageName = '/static/images/applications-system.svg';
	}
	return (
		<div className="col-md-2 col-6 ">
			<a href={`/${uuid}`} key={uuid} className="anchor-misc">
				<img src={ImageName} height="64" width="64" />
				<p>{name}</p>
			</a>
		</div>
	);
};
module.exports = Misc;
