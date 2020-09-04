import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar, ErrorAlert } from "./components";
import { Spinner } from "components";
import { Account } from "pages";

import { useStyles } from "./App-styles";
import { clientRoutes, vetRoutes } from "routes";

/*******************************
 * App layout
 * Show Spinner when user is loading
 * Root-level Routing
 * Trigger user sync
 *******************************/

export const App = ({ loading, authenticated, isVet, syncData }) => {
	const c = useStyles();

	// TEMP
	useEffect(() => {
		const ESCAPE_KEY = 27;
		const clearStorage = (e) =>
			e.keyCode === ESCAPE_KEY ? localStorage.clear() : null;
		window.addEventListener("keydown", clearStorage);
		return () => window.removeEventListener("keydown", clearStorage);
	}, []);

	useEffect(() => {
		syncData();
	}, [syncData]);

	// Create user-relevant Routes from routes array
	const routes = isVet ? vetRoutes : clientRoutes;
	const mainRoutes = routes.map((route) => {
		const { path, component, exact } = route;
		return <Route exact={exact} path={path} component={component} key={path} />;
	});

	// Enforce authentication
	const authRoutes = (
		<>
			<Route path="/account/:mode" component={Account} />
			<Route component={Account} />
		</>
	);

	if (loading) return <Spinner />;
	return (
		<div className={c.app}>
			{authenticated && (
				<header className={c.item}>
					<Navbar routes={routes} />
				</header>
			)}
			<div className={c.item}>
				<ErrorAlert />
			</div>
			<main className={c.main}>
				<Switch>{!authenticated ? authRoutes : mainRoutes}</Switch>
			</main>
		</div>
	);
};
