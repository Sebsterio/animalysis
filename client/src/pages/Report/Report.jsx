import React from "react";

const Report = ({ reports, match }) => {
	// select report by route param; no param -> select last report

	const alert = 0;

	return (
		<div>
			<div>Alert: {alert}</div>
			<div>--------</div>
			{}
		</div>
	);
};

export default Report;

// return (
//  <>
// 	 {print && <div>{print}</div>}
// 	 {printNote && <div>NOTE: {printNote}</div>}
//  </>
// );
