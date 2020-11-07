import React, { useState, useEffect, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { Spinner } from "components";
import { Navbar, ErrorAlert } from "./components";
import { Account, Demo, NotFound } from "pages";
import { clientRoutes, vetRoutes, suRoutes } from "routes";
import { useStyles } from "./App-styles";

/*******************************
 * App layout
 * Trigger user sync
 * Show Spinner when user or page is loading
 * Root-level Routing
 *******************************/

export const App = ({
	loading,
	authenticated,
	isVet,
	isSuperuser,
	isDemo,
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

	useEffect(() => {
		const handleResize = () => setViewportHeight(window.innerHeight);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const c = useStyles({ viewportHeight });

	// -------------------------- View -----------------------------

	// Create user-relevant Routes from routes array
	const routesArray = isSuperuser ? suRoutes : isVet ? vetRoutes : clientRoutes;

	if (loading) return <Spinner />;

	return (
		<div className={c.app}>
			<Suspense fallback={<Spinner />}>
				{authenticated && (
					<header className={c.item}>
						<Navbar routes={routesArray} {...{ isSuperuser, isDemo }} />
					</header>
				)}

				{isError && (
					<div className={c.item}>
						<ErrorAlert />
					</div>
				)}

				<main className={c.main} onClick={handleMainClick}>
					{/* NOTE: Don't use Fragment between Routes and Switch */}
					{!authenticated ? (
						// Enforce authentication
						<Switch>
							<Route path="/demo" component={Demo} />
							<Route path="/account/:mode" component={Account} />
							<Route component={Account} />
						</Switch>
					) : (
						// Main routes
						<Switch>
							<Route path="/demo" component={Demo} />
							{routesArray.map((route) => {
								const { path, component, exact, demoOnly } = route;
								if (demoOnly && !isDemo) return null;
								return <Route key={path} {...{ exact, path, component }} />;
							})}
							<Route component={NotFound} />
						</Switch>
					)}
				</main>
			</Suspense>
		</div>
	);
};
