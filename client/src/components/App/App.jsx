import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar } from "components";
import { Account } from "pages";

import { routes } from "routes";
import { useStyles } from "./App-styles";

/*******************************
 * App layout
 * Root-level Routing
 * Trigger authentication (TODO)
 *******************************/

export const App = ({ authenticated }) => {
	const clx = useStyles();

	// TEMP
	useEffect(() => {
		const ESCAPE_KEY = 27;
		const clearStorage = (e) =>
			e.keyCode === ESCAPE_KEY ? localStorage.clear() : null;
		window.addEventListener("keydown", clearStorage);
		return () => window.removeEventListener("keydown", clearStorage);
	}, []);

	// Create Routes from routes array
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

	return (
		<div className={clx.app}>
			{authenticated && (
				<header className={clx.header}>
					<Navbar />
				</header>
			)}
			<main className={clx.main}>
				<Switch>{!authenticated ? authRoutes : mainRoutes}</Switch>
			</main>
		</div>
	);
};
