export const getReportsList = (state) => state.reports.list;

export const getReportById = (state, id) => {
	const list = getReportsList(state);
	return list.find((report) => report.id === id);
};

export const getRecentReport = (state) => {
	const list = getReportsList(state);
	return list.length ? list[list.length - 1] : null;
};
