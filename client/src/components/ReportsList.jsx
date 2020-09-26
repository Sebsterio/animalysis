import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
		textTransform: "capitalize",
		textAlign: "center",
		flex: 2.5,
	},
	columnNarrow: {
		textTransform: "capitalize",
		textAlign: "left",
		flex: 1,
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

	const theme = useTheme();
	const wideScreen = useMediaQuery(theme.breakpoints.up("sm"));

	const getAlertStyle = (alert) => ({ color: alertData[alert].color });

	const openReport = (id) => {
		history.push(`/report/${id}`);
		if (reportClickCallback) reportClickCallback(id);
	};

	if (!reports.length)
		return (
			<Typography variant="h6" align="center">
				No reports...
			</Typography>
		);

	return (
		<div>
			<ButtonGroup
				fullWidth
				orientation="vertical"
				children={renderedReports.map(
					({ id, dateCreated, title, alert, name, sent /* ownerName */ }) => (
						<Button
							className={c.report}
							color={sent ? "default" : "secondary"}
							onClick={() => openReport(id)}
						>
							<span>{getDateString(dateCreated)}</span>
							<span className={c.columnWide}>{title}</span>
							{showPetName && wideScreen && (
								<span className={c.columnNarrow}>{name}</span>
							)}
							{/* {showOwner && wideScreen && <span className={c.columnNarrow}>{ownerName}</span>} */}
							<FiberManualRecordIcon style={getAlertStyle(alert)} />
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
