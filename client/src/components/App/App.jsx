import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "components/Header";
import { Account } from "pages/Account";

import { routes } from "routes";
import { useStyles } from "./App-styles";

/*******************************
 * App layout
 * Root-level Routing
 * Trigger authentication (TODO)
 *******************************/

export const App = ({ authenticated, noPets }) => {
	const clx = useStyles();

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
					<Header />
				</header>
			)}
			<main className={clx.main}>
				<Switch>{!authenticated ? authRoutes : mainRoutes}</Switch>
			</main>
		</div>
	);
};
