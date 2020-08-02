import React from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "./routes";
import { Header } from "./components";

import "./App.scss";

/*******************************
 * Routing
 * LATER: trigger auth
 *******************************/

export const App = () => {
	// Create Route & Page components from routes array
	const pages = routes.map((route) => {
		const { path, component, exact } = route;
		return <Route exact={exact} path={path} component={component} key={path} />;
	});

	return (
		<div className="App">
			<header className="App__header">
				<Header routes={routes} />
			</header>
			<main className="App__main">
				<Switch>{pages}</Switch>
			</main>
		</div>
	);
};
