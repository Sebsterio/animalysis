import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
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
	// dispatch
	fetchClinics,
}) => {
	const c = useStyles();

	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	// ------------------------- Handlers ----------------------------

	const closeForm = () => history.push("/");

	const handleInput = (e) => setQuery(e.target.value);

	const search = async (e) => {
		e.preventDefault();
		const res = await fetchClinics({ query });
		console.log({ res });
		if (res) setResults([...res]);
	};

	const loadMore = async (e) => {
		e.preventDefault();
		const res = await fetchClinics({ query, skip: results.length });
		console.log({ res });
		if (res) setResults([...results, ...res]);
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
