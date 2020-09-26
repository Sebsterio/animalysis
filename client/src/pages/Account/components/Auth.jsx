import React from "react";
import Icon from "@material-ui/core/Icon";
import Logo from "assets/logo_blue.svg";

// Components
import { Box, Typography, Button } from "@material-ui/core";
import {
	ProfileInfo,
	EmailInput,
	PasswordInput,
	Terms,
	TypeInput,
	CodeInput,
} from "./index";
import { Page, Stack, LinkBlock, Copyright } from "components";

// Other
import { authModes } from "../Account-constants";
import { useStyles } from "../Account-styles";

// --------------------------------------------------------------

export const Auth = ({ mode, handleSubmit, updating }) => {
	const c = useStyles();

	const modesData = {
		[authModes.signIn]: {
			block2: <EmailInput />,
			block3: <PasswordInput />,
			btnText: "Sign In",
			linkText: "Don't have an account? Sign up",
			linkHref: authModes.signUp,
			link2Text: "Forgot password?",
			link2Href: authModes.forgotPw,
		},
		[authModes.signUp]: {
			block1: ProfileInfo,
			block2: <EmailInput />,
			block3: <PasswordInput />,
			block4: <TypeInput defaultVal="client" />,
			block5: Terms,
			btnText: "Sign Up",
			linkText: "Already have an account? Sign in",
			linkHref: authModes.signIn,
		},
		[authModes.forgotPw]: {
			block2: <EmailInput />,
			btnText: updating ? "Sending..." : "Send Code",
			linkText: "Cancel",
			linkHref: authModes.signIn,
		},
		[authModes.resetPw]: {
			block1: (
				<Typography variant="body2" color="textSecondary" gutterBottom>
					Please check your email
				</Typography>
			),
			block2: <EmailInput />,
			block4: <CodeInput />,
			block5: <PasswordInput label="New Password" />,
			btnText: updating ? "Resetting..." : "Reset password",
			linkText: "Cancel",
			linkHref: authModes.signIn,
		},
	};

	return (
		<Page
			header={
				<Box className={c.head}>
					<Icon className={c.logoContainer}>
						<img className={c.logo} src={Logo} alt="logo" />
					</Icon>
					<Typography component="h1" variant="h2">
						Animalysis
					</Typography>
				</Box>
			}
			main={
				<Box className={c.main}>
					<form className={c.form} onSubmit={handleSubmit}>
						{/* Main form */}
						<Stack dense>
							{modesData[mode].block1 || null}
							{modesData[mode].block2 || null}
							{modesData[mode].block3 || null}
							{modesData[mode].block4 || null}
							{modesData[mode].block5 || null}
						</Stack>

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
						<LinkBlock
							to={modesData[mode].linkHref || "#"}
							variant="body2"
							children={modesData[mode].linkText || ""}
						/>

						{/* Change mode link (sing-in/up) */}
						<div className={c.link2}>
							<LinkBlock
								to={modesData[mode].link2Href || "#"}
								variant="body2"
								children={modesData[mode].link2Text || ""}
							/>
						</div>
					</form>
				</Box>
			}
			footer={<Copyright />}
		/>
	);
};

export default Auth;
