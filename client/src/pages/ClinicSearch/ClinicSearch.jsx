import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Page, Stack, Nav } from "components";

const useStyles = makeStyles((theme) => ({
	link: {
		display: "block",
		textAlign: "right",
	},
	result: {
		padding: theme.spacing(2),
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: theme.spacing(2),
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
	const [loading, setLoading] = useState(false);
	const [fetchedAll, setFetchedAll] = useState(false);

	const hasResults = !!results.length;
	const canFetchMore = hasResults && !fetchedAll;

	const fetch = async (e, data, callback) => {
		e.preventDefault();
		setLoading(true);
		setFetchedAll(false);
		const res = await fetchClinics(data);
		if (res) callback(res);
		else setFetchedAll(true);
		setLoading(false);
	};

	// ------------------------- Handlers ----------------------------

	const closeForm = () => history.push("/");

	const handleInput = (e) => setQuery(e.target.value);

	// Replace results
	const search = async (e) =>
		fetch(e, { query }, (res) => setResults([...res]));

	// Add to results
	const loadMore = async (e) =>
		fetch(e, { query, skip: results.length }, (res) =>
			setResults([...results, ...res])
		);

	// --------------------------- View ------------------------------

	const formatAddress = (address) =>
		address
			.split(",")
			.map((part) => <Typography key={part}>{part}</Typography>);

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
				<Stack>
					<form onSubmit={search}>
						<TextField
							autoFocus
							fullWidth
							label="Search"
							value={query}
							onChange={handleInput}
							variant="outlined"
							disabled={loading}
						/>
					</form>

					{hasResults &&
						results.map(({ id, name, address, email, phone, logo }) => (
							<Paper className={c.result} key={id}>
								<div>
									<Typography>{name}</Typography>
									<Typography>{email}</Typography>
									<Typography>{phone}</Typography>
								</div>
								<div>{formatAddress(address)}</div>
							</Paper>
						))}

					{(hasResults || loading) && (
						<Button onClick={loadMore} disabled={!canFetchMore || loading}>
							{!canFetchMore
								? "All loaded"
								: loading
								? "Loading..."
								: "Load more"}
						</Button>
					)}
				</Stack>
			}
			footer={<Nav textLeft="Cancel" onClickLeft={closeForm} noArrows />}
		/>
	);
};
