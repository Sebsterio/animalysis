import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Page, ReportsList, Spinner } from "components";
// import { ClinicSnippet } from "./components";

import { makeSortedArray } from "utils/array";
import { byDateCreated_descending } from "utils/sort";

const useStyles = makeStyles((theme) => ({
	greeting: { margin: theme.spacing(4, 0) },
	denseStack: {
		display: "grid",
		gridGap: theme.spacing(1),
	},
	reportsPlaceholder: {
		position: "relative",
		height: "30vh",
		display: "flex",
		alignItems: "center",
	},
}));

export const VetDashboard = ({
	history,
	profileLoading,
	username,
	superuser,
	hasClinic,
	reports,
	syncing,
	modifyReport,
}) => {
	const c = useStyles();

	// Sort reports by date across all pets (else they're sorted separately for each pet)
	const sortedReports = makeSortedArray(reports, byDateCreated_descending);

	// ------------------------ Handlers -------------------------

	const handleJoinClinic = () => history.push("/clinic-search");

	const handleRegisterClinic = () => history.push("/my-clinic");

	const reportClickCallback = (id) =>
		modifyReport({ id, update: { dateSeen: new Date() } });

	const goToReportsPage = () => history.push("/reports");

	// -------------------------- View ---------------------------

	const WelcomeText = (
		<Typography
			variant="h4"
			align="center"
			children={profileLoading ? " " : `Welcome, ${username || "Guest"}`}
			className={c.greeting}
		/>
	);

	if (superuser) return WelcomeText;

	if (!hasClinic)
		// Vet user is not a member of any clinic
		return (
			<Page
				header={WelcomeText}
				main={
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
				}
			/>
		);

	// Vet user is a member of a clinic
	return (
		<Page
			maxWidth="sm"
			header={WelcomeText}
			main={
				<>
					{/* <ClinicSnippet {...{ clinic }} /> */}
					{!reports.length && !syncing ? (
						// No reports to show
						<Typography variant="h6" align="center" children="No new reports" />
					) : (
						// Reports loaded or loading
						<>
							<Typography variant="h6">New reports</Typography>
							{syncing ? (
								<div className={c.reportsPlaceholder}>
									<Spinner />
								</div>
							) : (
								<ReportsList
									showPetName
									reports={sortedReports}
									{...{ history, reportClickCallback }}
								/>
							)}
						</>
					)}
				</>
			}
			footer={
				<Button
					fullWidth
					variant="contained"
					color="primary"
					children="Search history"
					onClick={goToReportsPage}
				/>
			}
		/>
	);
};
