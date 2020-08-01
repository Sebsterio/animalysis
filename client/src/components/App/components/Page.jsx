import React from "react";
import { Navbar } from "components/Navbar";
import "./Page.scss";

export const Page = (props) => (
	<div className="Page">
		<header className="Page__header">
			<Navbar title={props.title} />
		</header>
		<main className="Page__main">
			<props.component {...props} />
		</main>
	</div>
);
