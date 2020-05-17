const React = require('react');

function Index({ data }) {
	return (
		<>
			<h1>File Manager</h1>
			<ul>
				{data.map((e) => {
					if (e.type === 'directory') {
						return (
							<li key={e.uuid}>
								<a href={e.uuid}>{e.name}</a>
							</li>
						);
					}
					if (e.type === 'file') {
						return (
							<a href={`/${e.uuid}`} key={e.uuid} target="_blank">
								<img src={`/${e.uuid}?h=100&w=100`} height="100" width="100" />
							</a>
						);
					}
				})}
			</ul>
		</>
	);
}
module.exports = Index;
