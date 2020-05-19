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
						switch (e.mimetype) {
							case 'json':
								return (
									<a href={`/${e.uuid}`} key={e.uuid} target="_blank">
										{e.name}
									</a>
								);
							case 'pdf':
								return (
									<a href={`/${e.uuid}`} key={e.uuid} target="_blank">
										{e.name}
									</a>
								);
							case 'image/jpeg':
							case 'image/png':
								return (
									<a href={`/${e.uuid}`} key={e.uuid} target="_blank">
										<img src={`/${e.uuid}?w=100&h=100`} height="100" width="100" />
									</a>
								);
							case 'video/mp4':
								return (
									<a href={`/${e.uuid}`} key={e.uuid} target="_blank">
										<video controls height="100" width="177">
											<source src={`/${e.uuid}`} type={e.mimetype}></source>
										</video>
									</a>
								);
							case 'video/x-matroska':
								return (
									<a href={`/${e.uuid}`} key={e.uuid} target="_blank">
										<video controls height="100" width="177">
											<source src={`/${e.uuid}`} type="video/webm"></source>
										</video>
									</a>
								);
							default:
								return (
									<a href={`/${e.uuid}`} key={e.uuid} target="_blank">
										<img src={`/${e.uuid}`} />
									</a>
								);
						}
					}
				})}
			</ul>
		</>
	);
}
module.exports = Index;
