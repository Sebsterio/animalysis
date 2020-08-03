import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// Components
import { OptIn, UserInfo } from "./index";
import { Copyright } from "components/Copyright";
import {
	Container,
	Box,
	Grid,
	Typography,
	TextField,
	Button,
	Link,
} from "@material-ui/core";

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
		width: "100%", // Fix IE 11 issue.
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const Auth = ({ mode, signIn }) => {
	const clx = useStyles();

	const modesData = {
		[authModes.signIn]: {
			btnText: "Sign In",
			btnHandler: signIn,
			linkText: "Don't have an account? Sing up",
			linkHref: authModes.signUp,
		},
		[authModes.signUp]: {
			btnText: "Sign Up",
			btnHandler: signIn,
			linkText: "Already have an account? Sign in",
			optIn: OptIn,
			userInfo: UserInfo,
			linkHref: authModes.signIn,
		},
	};

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Box className={clx.head}>
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

			<Box className={clx.paper}>
				<form className={clx.form} noValidate>
					<Grid container spacing={2}>
						{modesData[mode].userInfo || ""}

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
						{modesData[mode].optIn || ""}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={clx.submit}
						onClick={modesData[mode].btnHandler}
					>
						{modesData[mode].btnText || ""}
					</Button>

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
