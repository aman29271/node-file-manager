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
							<img src={`/${e.uuid}`} height="100" width="100" key={e.uuid} />
						);
					}
				})}
			</ul>
		</>
	);
}
module.exports = Index;
