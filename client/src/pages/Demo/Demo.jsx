import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Icon from "@material-ui/core/Icon";

import { Page, Stack, Copyright } from "components";

import Logo from "assets/logo_blue.svg";

const useStyles = makeStyles((theme) => ({
	logoContainer: {
		margin: "auto",
		marginTop: theme.spacing(2),
		display: "block",
		width: 200,
		height: "auto",
		objectFit: "contain",
	},
	logo: { width: "100%" },
	link: { textAlign: "right" },
}));

export const Demo = ({ history, signIn }) => {
	const c = useStyles();

	// if is authenticated, go to '/'

	const runClientDemo = () => {
		signIn({
			email: "pet-owner@animalysis.com",
			password: "Animalysis",
		});
		history.push("/");
	};
	const runVetDemo = () => {
		signIn({
			email: "vet@animalysis.com",
			password: "Animalysis",
		});
		history.push("/");
	};

	return (
		<Page
			header={
				<Box className={c.head}>
					<Icon className={c.logoContainer}>
						<img className={c.logo} src={Logo} alt="logo" />
					</Icon>
					<Typography component="h1" variant="h2" align="center">
						Animalysis
					</Typography>
				</Box>
			}
			main={
				<>
					<Typography component="h2" variant="h5">
						Welcome to the demo!
					</Typography>
					<Typography gutterBottom>
						Here you can explore the app in offline mode. You can switch to the
						full version at any time by signing out.
					</Typography>
				</>
			}
			main2={
				<>
					<Button
						fullWidth
						color="default"
						variant="contained"
						children="Pet Owner Demo"
						onClick={runClientDemo}
					/>

					<Button
						fullWidth
						color="default"
						variant="contained"
						children="Vet Demo"
						onClick={runVetDemo}
					/>

					<Link
						children="Switch to full version"
						component={RouterLink}
						to="/"
						variant="body2"
						className={c.link}
					/>
				</>
			}
			footer={<Copyright />}
		/>
	);
};
