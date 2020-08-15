export const getReportsList = (state) => state.reports.list;

export const getReportByIndex = (state, index) => {
	const list = getReportsList(state);
	return list.length ? list[index] : null;
};

export const getRecentReport = (state) => {
	const list = getReportsList(state);
	return list.length ? list[list.lenght - 1] : null;
};
