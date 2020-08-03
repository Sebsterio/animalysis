import React from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "./routes";
import { Header } from "./components";
import { AccountPage } from "components/Account";

import "./App.scss";

/*******************************
 * Routing
 * Trigger authentication (TODO)
 *******************************/

export const App = ({ isAuthenticated }) => {
	// Create Route & Page components from routes array
	const pages = routes.map((route) => {
		const { path, component, exact } = route;
		return <Route exact={exact} path={path} component={component} key={path} />;
	});

	return (
		<div className="App">
			{isAuthenticated && (
				<header className="App__header">
					<Header routes={routes} />
				</header>
			)}
			<main className="App__main">
				{isAuthenticated ? <Switch>{pages}</Switch> : <AccountPage />}
			</main>
		</div>
	);
};
