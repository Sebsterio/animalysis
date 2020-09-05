import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Page } from "components";

const useStyles = makeStyles((theme) => ({
	row: {
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
	},
	logo: { marginRight: theme.spacing(2) },
	greeting: { margin: theme.spacing(4, 0) },
	denseStack: {
		display: "grid",
		gridGap: theme.spacing(1),
	},
}));

export const VetDashboard = ({
	history,
	profileLoading,
	username,
	clinic,
	hasClinic,
}) => {
	const c = useStyles();

	const { logo, name } = clinic;

	// ------------------------ Handlers -------------------------

	const handleJoinClinic = () => history.push("/clinic-search");

	const handleRegisterClinic = () => history.push("/my-clinic");

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
						<div className={c.row}>
							{logo && (
								<div className={c.logo}>
									<Avatar alt={name + " logo"} src={logo} />
								</div>
							)}
							<Typography variant="h6">{name}</Typography>
						</div>
						<Typography>- New reports list</Typography>
						<Typography>- Load old reports link</Typography>
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
		/>
	);
};
