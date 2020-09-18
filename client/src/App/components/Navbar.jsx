import React from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";

import Logo from "assets/logo_simple_white_small.png";

import { useStyles } from "./Navbar-styles";

// ----------------------------------------------------------------

export const Navbar = ({ routes, isSuperuser }) => {
	const c = useStyles();

	const titles = routes.map(({ path, title, exact }) => (
		<Route exact={exact} path={path} render={() => title} key={path} />
	));

	const [menuOpen, setMenuOpen] = React.useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<div>
			<AppBar position="static" color={isSuperuser ? "secondary" : "primary"}>
				{/* <AppBar position="fixed" className={c.appBar}> */}
				<Toolbar className={c.toolbar}>
					<IconButton
						color="inherit"
						aria-label="logo"
						children={
							<Link to="/">
								<Icon className={c.logoContainer}>
									<img className={c.logo} src={Logo} alt="app logo" />
								</Icon>
							</Link>
						}
					/>

					<Typography variant="h6" align="center" className={c.title}>
						<Switch>{titles}</Switch>
					</Typography>

					<IconButton
						aria-label="Open menu"
						children={<MenuIcon fontSize="large" />}
						onClick={toggleMenu}
						color="inherit"
					/>
				</Toolbar>
			</AppBar>

			<nav>
				<Hidden implementation="css">
					<Drawer
						variant="temporary"
						anchor="right"
						open={menuOpen}
						onClose={toggleMenu}
						classes={{ paper: c.drawerPaper }}
						ModalProps={{ keepMounted: true }} // Better mobile performance
					>
						<IconButton
							aria-label="Close menu"
							children={<CloseIcon fontSize="large" />}
							onClick={toggleMenu}
							className={c.closeMenuButton}
						/>
						<List>
							{routes.map(
								({ path, title, linkText, exact, inNav, suOnly }) =>
									inNav &&
									// TEMP <<<<<<<<<<<<<<<<<<<<<<<<<<<<
									(!suOnly || isSuperuser) && (
										// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
										<ListItem
											button
											component={NavLink}
											to={path}
											exact={exact}
											className={c.navLink}
											activeClassName={c.navLinkActive}
											onClick={toggleMenu}
											key={path}
										>
											<ListItemText
												primary={linkText || title}
												primaryTypographyProps={{ variant: "h4" }}
											/>
										</ListItem>
									)
							)}
						</List>
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
};
