import React from "react";
import { Switch, Route } from "react-router-dom";

import routes from "./routes";

import "./App.scss";

export const App = () => {
	const pages = routes.map((route) => {
		const { path, component } = route;
		return <Route exact path={path} component={component} key={path} />;
	});

	return (
		<div className="App">
			<main>
				<Switch>{pages}</Switch>
			</main>
		</div>
	);
};
