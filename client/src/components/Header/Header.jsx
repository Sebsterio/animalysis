import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { routes } from "routes";

// ----------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	appLogo: {
		textDecoration: "none",
		color: "white",
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
				<Link to="/" className={clx.appLogo}>
					<Typography variant="h5" children="VC" />
				</Link>

				<Typography variant="h6" align="center" className={clx.title}>
					<Switch>{titles}</Switch>
				</Typography>

				<IconButton
					className={clx.menuButton}
					color="inherit"
					aria-label="menu"
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
