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
		marginBottom: theme.spacing(0.5),
	},
	alert: {
		alignItems: "center",
	},
	link: {
		textDecoration: "none",
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
	userReminderOn,
	// dispatch
	clearSurvey,
	dismissClinicReminder,
	dismissUserReminder,
}) => {
	const clx = useStyles();

	const handleClinicAlertActionClick = (e) => {
		e.preventDefault();
		dismissClinicReminder();
	};

	const handleUserAlertActionClick = (e) => {
		e.preventDefault();
		dismissUserReminder();
	};

	const handleSurveyAlertActionClick = (e) => {
		e.preventDefault();
		clearSurvey();
	};

	return (
		<div className={clx.container}>
			<Collapse in={clinicReminderOn} className={clx.item}>
				<Link to="/my-clinic" className={clx.link}>
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

			<Collapse in={userReminderOn} className={clx.item}>
				<Link to="/profile" className={clx.link}>
					<Alert
						severity="warning"
						children="Add a phone number so that you clinic can contact you."
						className={clx.alert}
						action={
							<IconButton
								children={<CloseIcon fontSize="inherit" />}
								onClick={handleUserAlertActionClick}
								aria-label="dismiss reminder to add contact info"
								color="inherit"
							/>
						}
					/>
				</Link>
			</Collapse>

			<Collapse in={surveyIsLoaded} className={clx.item}>
				<Link to="/analysis" className={clx.link}>
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
