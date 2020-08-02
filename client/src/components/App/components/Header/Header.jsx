import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Header.scss";

const Header = ({ routes }) => {
	const titles = routes.map((route) => {
		const { path, title, exact } = route;
		return <Route exact={exact} path={path} render={() => title} key={path} />;
	});

	return (
		<nav className="Header">
			<div className="Header__wrap">
				<h1 className="Header__title">
					<Switch>{titles}</Switch>
				</h1>
				<div className="Header__hamburger">=</div>
			</div>
		</nav>
	);
};

export default Header;
