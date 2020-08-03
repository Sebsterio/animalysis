import React from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "./routes";
import { Header } from "./components";
import { Account } from "pages/Account";

import "./App.scss";

/*******************************
 * Routing
 * Trigger authentication (TODO)
 *******************************/

export const App = ({ isAuthenticated }) => {
	// Create Routes from routes array
	const pages = routes.map((route) => {
		const { path, component, exact } = route;
		return <Route exact={exact} path={path} component={component} key={path} />;
	});

	const authRoutes = (
		<>
			<Route path="/account/:mode" component={Account} />
			<Route component={Account} />
		</>
	);

	return (
		<div className="App">
			{isAuthenticated && (
				<header className="App__header">
					<Header routes={routes} />
				</header>
			)}
			<main className="App__main">
				<Switch>{isAuthenticated ? pages : authRoutes}</Switch>
			</main>
		</div>
	);
};
