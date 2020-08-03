import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { OptIn, UserInfo } from "./index";
import { Copyright } from "components/Copyright";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { authModes } from "../Account-modes";
import { useStyles } from "../Account-styles";

// --------------------------------------------------------------

export const Auth = ({ mode, signIn }) => {
	const classes = useStyles();

	const handleSignIn = (e) => {
		e.preventDefault();
		signIn();
	};

	const modesData = {
		[authModes.signIn]: {
			btnText: "Sign In",
			btnHandler: handleSignIn,
			linkText: "Don't have an account? Sing up",
			linkHref: authModes.signUp,
		},
		[authModes.signUp]: {
			btnText: "Sign Up",
			btnHandler: handleSignIn,
			linkText: "Already have an account? Sign in",
			optIn: OptIn,
			userInfo: UserInfo,
			linkHref: authModes.signIn,
		},
	};

	return (
		<Container maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h2">
					VetCheck
				</Typography>
				<Typography component="h1" variant="h5">
					Clinic Name
				</Typography>
				<Typography component="h1" variant="h6">
					(Logo)
				</Typography>

				<form className={classes.form} noValidate>
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
						className={classes.submit}
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
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Auth;
