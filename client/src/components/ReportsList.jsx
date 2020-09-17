import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button, Typography } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { getDateString } from "utils/date";
import { alertData } from "components";

const useStyles = makeStyles((theme) => ({
	report: {
		display: "flex",
		justifyContent: "stretch",
	},
	columnWide: {
		flex: 2.5,
		textAlign: "center",
		textTransform: "capitalize",
	},
	columnNarrow: {
		flex: 1,
		textAlign: "center",
		textTransform: "capitalize",
		textAlign: "left",
	},
	showAllBtn: {
		marginTop: theme.spacing(2),
		color: theme.palette.grey[600],
	},
}));

const LIMIT = 7;

export const ReportsList = ({
	history,
	reports,
	reportClickCallback,
	showPetName,
	// showOwner,
}) => {
	const [showAll, setShowAll] = useState(false);
	const toggleShowAll = () => setShowAll(!showAll);

	const overflowed = reports.length > LIMIT;
	const renderedReports = [...reports];
	if (!showAll) renderedReports.length = LIMIT;

	const c = useStyles({ overflowed });

	if (!reports.length)
		return (
			<Typography variant="h6" align="center">
				No reports...
			</Typography>
		);

	const openReport = (id) => {
		history.push(`/report/${id}`);
		if (reportClickCallback) reportClickCallback(id);
	};

	const getStyle = (alert) => ({ color: alertData[alert].color });

	return (
		<div>
			<ButtonGroup
				fullWidth
				orientation="vertical"
				children={renderedReports.map(
					({ id, dateCreated, title, alert, name, ownerName }) => (
						<Button className={c.report} onClick={() => openReport(id)}>
							<span>{getDateString(dateCreated)}</span>
							<span className={c.columnWide}>{title}</span>
							{showPetName && <span className={c.columnNarrow}>{name}</span>}
							{/* {showOwner && <span className={c.columnNarrow}>{ownerName}</span>} */}
							<FiberManualRecordIcon style={getStyle(alert)} />
						</Button>
					)
				)}
			/>
			{overflowed && (
				<Button
					fullWidth
					size="small"
					className={c.showAllBtn}
					children={showAll ? "Show less" : "Show all"}
					onClick={toggleShowAll}
				/>
			)}
		</div>
	);
};
