import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar, ErrorAlert } from "./components";
import { Spinner } from "components";
import { Account, NotFound } from "pages";

import { useStyles } from "./App-styles";
import { clientRoutes, vetRoutes } from "routes";
import { useState } from "react";

/*******************************
 * App layout
 * Show Spinner when user is loading
 * Root-level Routing
 * Trigger user sync
 *******************************/

export const App = ({
	loading,
	authenticated,
	isVet,
	isSuperuser,
	syncData,
	isError,
	clearError,
}) => {
	// TEMP
	useEffect(() => {
		const ESCAPE_KEY = 27;
		const clearStorage = (e) =>
			e.keyCode === ESCAPE_KEY ? localStorage.clear() : null;
		window.addEventListener("keydown", clearStorage);
		return () => window.removeEventListener("keydown", clearStorage);
	}, []);

	// Trigger sync
	useEffect(() => {
		syncData();
	}, [syncData]);

	// Clear error on all clicks (if there's error)
	const handleMainClick = () => (isError ? clearError() : null);

	// ----------- Ensure <main> fills screen on mobile ------------

	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
	console.log({ viewportHeight });
	const handleResize = () => {
		console.log("resize");
		setViewportHeight(window.innerHeight);
	};

	useEffect(() => {
		const onResize = window.addEventListener("resize", handleResize);
		return window.removeEventListener("resize", onResize);
	}, []);

	const c = useStyles({ viewportHeight });

	// -------------------------- View -----------------------------

	// Create user-relevant Routes from routes array
	const routes = isVet ? vetRoutes : clientRoutes;
	const mainRoutes = routes.map((route) => {
		const { path, component, exact, suOnly } = route;
		if (suOnly && !isSuperuser) return null; // TEMP <<<<<<<<<<<<<<<<<<<<<<
		return <Route exact={exact} path={path} component={component} key={path} />;
	});
	mainRoutes.push(<Route key={404} component={NotFound} />);

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
					<Navbar {...{ routes, isSuperuser }} />
				</header>
			)}
			{isError && (
				<div className={c.item}>
					<ErrorAlert />
				</div>
			)}
			<main className={c.main} onClick={handleMainClick}>
				<Switch>{!authenticated ? authRoutes : mainRoutes}</Switch>
			</main>
		</div>
	);
};
