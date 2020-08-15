import React from "react";
import { Redirect } from "react-router-dom";

const Report = ({ match, getReport, recentReport }) => {
	const { id } = match.params;
	const report = id ? getReport(id) : recentReport;
	if (!report) return <Redirect to="/not-found" />;

	const { alert, problemList, syncing } = report;

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
