import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PetsIcon from "@material-ui/icons/Pets";

import { routes } from "routes";

// ----------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	// TEMP
	appLogo: {
		textDecoration: "none",
		color: "white",
		lineHeight: 0,
	},
	title: { flexGrow: 1 },
}));

export const Header = () => {
	const clx = useStyles();

	const titles = routes.map((route) => {
		const { path, title, exact } = route;
		return <Route exact={exact} path={path} render={() => title} key={path} />;
	});

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="logo"
					children={
						<Link to="/" className={clx.appLogo}>
							<PetsIcon />
						</Link>
					}
				/>

				<Typography variant="h6" align="center" className={clx.title}>
					<Switch>{titles}</Switch>
				</Typography>

				<IconButton
					color="inherit"
					aria-label="menu"
					children={<MenuIcon fontSize="large" />}
				/>
			</Toolbar>
		</AppBar>
	);
};
