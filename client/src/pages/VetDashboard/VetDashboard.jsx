import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Page, ReportsList, Spinner } from "components";
// import { ClinicSnippet } from "./components";

const useStyles = makeStyles((theme) => ({
	greeting: { margin: theme.spacing(4, 0) },
	denseStack: {
		display: "grid",
		gridGap: theme.spacing(1),
	},
	spinnerContainer: {
		position: "relative",
		height: "30vh",
	},
}));

export const VetDashboard = ({
	history,
	profileLoading,
	username,
	// clinic,
	hasClinic,
	reports,
	modifyReport,
}) => {
	const c = useStyles();

	// ------------------------ Handlers -------------------------

	const handleJoinClinic = () => history.push("/clinic-search");

	const handleRegisterClinic = () => history.push("/my-clinic");

	const reportClickCallback = (id) =>
		modifyReport({ id, update: { dateSeen: new Date() } });

	const goToReportsage = () => history.push("/reports");

	// -------------------------- View ---------------------------

	return (
		<Page
			header={
				<Typography
					variant="h4"
					align="center"
					children={profileLoading ? " " : `Welcome, ${username || "Guest"}`}
					className={c.greeting}
				/>
			}
			main={
				hasClinic ? (
					// User is a member of a clinic
					<>
						{/* <ClinicSnippet {...{ clinic }} /> */}
						<Typography variant="h6">New reports</Typography>
						{!!reports.length ? (
							<ReportsList {...{ reports, history, reportClickCallback }} />
						) : (
							<div className={c.spinnerContainer}>
								<Spinner />
							</div>
						)}
					</>
				) : (
					// User is not a member of any clinic
					<div className={c.denseStack}>
						<Button
							variant="outlined"
							color="primary"
							children="Join a clinic"
							onClick={handleJoinClinic}
						/>
						<Typography align="center">- OR -</Typography>
						<Button
							variant="contained"
							color="primary"
							children="Register a clinic"
							onClick={handleRegisterClinic}
						/>
					</div>
				)
			}
			footer={
				hasClinic && (
					<Button
						fullWidth
						variant="contained"
						color="primary"
						children="Search history"
						onClick={goToReportsage}
					/>
				)
			}
		/>
	);
};
