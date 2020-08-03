import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<Link to="/new-report">Report a Problem</Link>
		</div>
	);
};

export default Home;
