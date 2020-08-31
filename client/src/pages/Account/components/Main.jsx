import React from "react";
import { Button } from "@material-ui/core";

export const Main = ({ signOut }) => (
	<div>
		<h3>Account Main Menu</h3>

		<p>Edit Details Btn</p>
		<p>-> change user type</p>
		<p>-> register clinic?</p>

		<p>Close Account</p>

		<Button
			fullWidth
			color="primary"
			variant="contained"
			onClick={signOut}
			children="Sign out"
		/>
	</div>
);
