import React from "react";
import { Switch, Route } from "react-router-dom";

import { Page } from "./components";
import { routes } from "./routes";

import "./App.scss";

/*******************************
 * Routing
 * TODO: trigger auth
 *******************************/

export const App = () => {
	// Create Route & Page components from routes array
	const pages = routes.map((route) => {
		const { path, title, component, exact } = route;
		return (
			<Route
				exact={exact}
				path={path}
				render={(routeProps) => (
					<Page {...routeProps} title={title} component={component} />
				)}
				key={path}
			/>
		);
	});

	return (
		<div className="App">
			<Switch>{pages}</Switch>
		</div>
	);
};
