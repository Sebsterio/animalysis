import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "components/Header";
import { Account } from "pages/Account";

import { routes } from "routes";
import "./App.scss";

/*******************************
 * Root-level Routing
 * Trigger authentication (TODO)
 * Main layout & semantic HTML tags
 *******************************/

export const App = ({ isAuthenticated }) => {
	// Create Routes from routes array
	const mainRoutes = routes.map((route) => {
		const { path, component, exact } = route;
		return <Route exact={exact} path={path} component={component} key={path} />;
	});

	// Redirect to /account/sing-in if user not authenticated
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
					<Header />
				</header>
			)}
			<main className="App__main">
				<Switch>{isAuthenticated ? mainRoutes : authRoutes}</Switch>
			</main>
		</div>
	);
};
