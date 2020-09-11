export const getAugmentedReports = (reports) =>
	reports.map((report) => {
		const { firstName, surname } = report.owner;
		const ownerName = firstName + (surname ? ` ${surname}` : "");
		return { ...report, ownerName };
	});
