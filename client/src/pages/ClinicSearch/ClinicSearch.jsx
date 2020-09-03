import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Page, Nav } from "components";

const useStyles = makeStyles((theme) => ({
	link: {
		display: "block",
		textAlign: "right",
	},
}));

export const ClinicSearch = ({
	// router
	history,
	// store
	clinicId,
}) => {
	const c = useStyles();

	const [query, setQuery] = useState("");

	// ------------------------- Handlers ----------------------------

	const closeForm = () => history.push("/");

	const handleInput = (e) => setQuery(e.target.value);

	const search = (e) => {
		e.preventDefault();
		console.log("sdfsldfjlsdfsdfsdlf");
	};

	// --------------------------- View ------------------------------

	return (
		<Page
			header={
				<Link
					className={c.link}
					component={RouterLink}
					to="/my-clinic"
					children="Register an organisation"
				/>
			}
			main={
				<div>
					<form onSubmit={search}>
						<TextField
							autoFocus
							fullWidth
							label="Search"
							value={query}
							onChange={handleInput}
							variant="outlined"
						/>
					</form>
				</div>
			}
			footer={<Nav textLeft="Cancel" onClickLeft={closeForm} noArrows />}
		/>
	);
};
