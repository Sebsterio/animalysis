import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// Components
import {
	Container,
	Box,
	Grid,
	Typography,
	Button,
	Link,
} from "@material-ui/core";
import { ProfileInfo, UserInfo, Terms } from "./index";
import { Copyright } from "components";

// Other
import { authModes } from "../Account-modes";

// --------------------------------------------------------------

export const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(4),
		display: "flex",
		flexFlow: "column nowrap",
		alignItems: "stretch",
		justifyContent: "space-between",
	},
	head: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	paper: {
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(6),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fixes IE 11 issue.
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const Auth = ({ mode, submit }) => {
	const c = useStyles();

	const modesData = {
		[authModes.signIn]: {
			btnText: "Sign In",
			linkText: "Don't have an account? Sing up",
			linkHref: authModes.signUp,
		},
		[authModes.signUp]: {
			btnText: "Sign Up",
			linkText: "Already have an account? Sign in",
			terms: Terms,
			profileInfo: ProfileInfo,
			linkHref: authModes.signIn,
		},
	};

	return (
		<Container maxWidth="xs" className={c.container}>
			{/* Head */}
			<Box className={c.head}>
				<Typography component="h1" variant="h2">
					VetCheck
				</Typography>
				<Typography component="h1" variant="h5">
					Clinic Name
				</Typography>
				<Typography component="h1" variant="h6">
					(Logo)
				</Typography>
			</Box>

			<Box className={c.paper} onSubmit={submit}>
				<form className={c.form}>
					{/* Main form */}
					<Grid container spacing={2}>
						{modesData[mode].profileInfo || null}
						{UserInfo}
						{modesData[mode].terms || null}
					</Grid>

					{/* Button */}
					<Button
						fullWidth
						type="submit"
						color="primary"
						variant="contained"
						className={c.submit}
					>
						{modesData[mode].btnText || null}
					</Button>

					{/* Change mode link (sing-in/up) */}
					<Grid container justify="flex-end">
						<Grid item>
							<Link
								component={RouterLink}
								to={modesData[mode].linkHref || "#"}
								variant="body2"
							>
								{modesData[mode].linkText || ""}
							</Link>
						</Grid>
					</Grid>
				</form>
			</Box>

			<Copyright />
		</Container>
	);
};

export default Auth;
