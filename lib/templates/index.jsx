const React = require("react");

function Index({ data }) {
	return (
		<>
			<h1>File Manager</h1>
			<ul>
				{data.map((e) => (
					<li key={e.uuid}>
						<a href={e.uuid}>{e.name}</a>
					</li>
				))}
			</ul>
		</>
	);
}
module.exports = Index;
