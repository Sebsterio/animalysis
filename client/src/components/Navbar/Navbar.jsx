import React from "react";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ title }) => {
	return (
		<nav className="Navbar">
			<div className="Navbar__wrap">
				<h1 className="Navbar__title">{title}</h1>
				<div className="Navbar__hamburger">=</div>
			</div>
		</nav>
	);
};

export default withRouter(Navbar);
