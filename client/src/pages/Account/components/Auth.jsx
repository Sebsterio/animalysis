import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Logo from "assets/logo_blue.png";

// Components
import {
	Container,
	Box,
	Grid,
	Typography,
	Button,
	Link,
} from "@material-ui/core";
import {
	ProfileInfo,
	EmailInput,
	PasswordInput,
	Terms,
	TypeInput,
} from "./index";
import { Copyright } from "components";

// Other
import { authModes } from "../Account-constants";
import { useStyles } from "../Account-styles";

// --------------------------------------------------------------

export const Auth = ({ mode, handleSubmit }) => {
	const c = useStyles();

	const modesData = {
		[authModes.signIn]: {
			btnText: "Sign In",
			linkText: "Don't have an account? Sign up",
			linkHref: authModes.signUp,
		},
		[authModes.signUp]: {
			btnText: "Sign Up",
			linkText: "Already have an account? Sign in",
			terms: Terms,
			typeInput: <TypeInput defaultVal="client" />,
			profileInfo: ProfileInfo,
			linkHref: authModes.signIn,
		},
	};

	return (
		<Container maxWidth="xs" className={c.container}>
			{/* Head */}
			<Box className={c.head}>
				<Icon className={c.logoContainer}>
					<img className={c.logo} src={Logo} />
				</Icon>
				<Typography component="h1" variant="h2">
					Animalysis
				</Typography>
			</Box>

			<Box className={c.paper} onSubmit={handleSubmit}>
				<form className={c.form}>
					{/* Main form */}
					<Grid container spacing={2}>
						{modesData[mode].profileInfo || null}
						<EmailInput />
						<PasswordInput />
						{modesData[mode].typeInput || null}
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
