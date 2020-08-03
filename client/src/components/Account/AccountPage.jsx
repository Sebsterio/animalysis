import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { Copyright } from "components/Copyright";

import { useStyles } from "./AccountPage-styles";

const AccountPage = () => {
	// TODO: routes
	const [mode, setMode] = useState("sing-in");
	const goToSingIn = () => setMode("sing-in");
	const goToSingUp = () => setMode("sing-up");

	const classes = useStyles();

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
						{mode === "sing-up" && (
							<>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="firstName"
										variant="outlined"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="lname"
									/>
								</Grid>
							</>
						)}
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
						{mode === "sing-up" && (
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{mode === "sing-up" && "Sign Up"}
						{mode === "sing-in" && "Sign In"}
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="#" variant="body2">
								{mode === "sing-up" && "Already have an account? Sign in"}
								{mode === "sing-in" && "Don't have an account? Sing up"}
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

export default AccountPage;
