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
		marginBottom: theme.spacing(0.5),
	},
	link: { textDecoration: "none" },
	alert: { alignItems: "center" },
	greeting: { marginTop: theme.spacing(4) },
}));

export const Head = ({
	// store
	username,
	surveyIsLoaded,
	profileLoading,
	clinicReminderOn,
	profileReminderOn,
	// dispatch
	clearSurvey,
	dismissClinicReminder,
	dismissProfileReminder,
}) => {
	const c = useStyles();

	const handleClinicAlertActionClick = (e) => {
		e.preventDefault();
		dismissClinicReminder();
	};

	const handleUserAlertActionClick = (e) => {
		e.preventDefault();
		dismissProfileReminder();
	};

	const handleSurveyAlertActionClick = (e) => {
		e.preventDefault();
		clearSurvey();
	};

	const welcomeMessage = profileLoading
		? " "
		: `Welcome, ${username || "Guest"}`;

	return (
		<div className={c.container}>
			<Collapse in={clinicReminderOn} className={c.item}>
				<Link to="/my-clinic" className={c.link}>
					<Alert
						severity="warning"
						children="Choose a clinic to send your pet's health reports to."
						className={c.alert}
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

			<Collapse in={profileReminderOn} className={c.item}>
				<Link to="/profile" className={c.link}>
					<Alert
						severity="warning"
						children="Add a phone number so that your clinic can contact you."
						className={c.alert}
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

			<Collapse in={surveyIsLoaded} className={c.item}>
				<Link to="/analysis" className={c.link}>
					<Alert
						severity="info"
						children="Click to continue unfinished analysis"
						className={c.alert}
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
				children={welcomeMessage}
				className={c.greeting}
			/>
		</div>
	);
};
