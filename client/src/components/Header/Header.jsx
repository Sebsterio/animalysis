import React from "react";
import { Switch, Route } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { routes } from "routes";
import { useStyles } from "./Header-styles";

// ----------------------------------------------------------------

export const Header = () => {
	const classes = useStyles();

	const titles = routes.map((route) => {
		const { path, title, exact } = route;
		return <Route exact={exact} path={path} render={() => title} key={path} />;
	});

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<Switch>{titles}</Switch>
				</Typography>
				<IconButton
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
