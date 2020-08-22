import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
	},
	item: {
		textDecoration: "initial",
		marginBottom: theme.spacing(1),
	},
	alert: {
		alignItems: "center",
	},
	greeting: {
		margin: theme.spacing(4, 0),
	},
}));

export const Head = ({
	// store
	username,
	surveyIsLoaded,
	clinicReminderOn,
	// dispatch
	clearSurvey,
	dismissClinicReminder,
}) => {
	const clx = useStyles();

	const handleClinicAlertActionClick = (e) => {
		e.preventDefault();
		dismissClinicReminder();
	};

	const handleSurveyAlertActionClick = (e) => {
		e.preventDefault();
		clearSurvey();
	};

	return (
		<div className={clx.container}>
			<Collapse in={clinicReminderOn}>
				<Link to="/my-clinic" className={clx.item}>
					<Alert
						severity="warning"
						children="Choose a clinic to send your pet's health reports to."
						className={clx.alert}
						action={
							<IconButton
								children={<CloseIcon fontSize="inherit" />}
								onClick={handleClinicAlertActionClick}
								aria-label="dismiss reminder to add a clinic"
								color="inherit"
							/>
						}
					/>
				</Link>
			</Collapse>
			<Collapse in={surveyIsLoaded}>
				<Link to="/analysis" className={clx.item}>
					<Alert
						severity="info"
						children="Click to continue unfinished analysis"
						className={clx.alert}
						action={
							<IconButton
								children={<CloseIcon fontSize="inherit" />}
								onClick={handleSurveyAlertActionClick}
								aria-label="discard unfinished survey"
								color="inherit"
							/>
						}
					/>
				</Link>
			</Collapse>

			<Typography
				variant="h4"
				align="center"
				children={`Welcome, ${username || "Guest"}`}
				className={clx.greeting}
			/>
		</div>
	);
};
