import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { Head, Body, Footer } from "./components";

import { searchableFields } from "./VetReports-constants";

export const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	container: {
		height: "calc(100vh - 180px)", // Navbar + Toolbar + TablePagination
		[theme.breakpoints.up("sm")]: {
			height: "calc(100vh - 130px)", // Navbar + Footer
		},
	},
}));

// ================================================================

export const VetReports = ({
	// Router
	history,
	// Store
	query,
	seenHidden,
	isDemo,
	// Dispatch
	initTable,
	sortRows,
	modifyReport,
}) => {
	const c = useStyles();

	// Init table data on mount
	useEffect(() => {
		initTable();
	}, [initTable]);

	// Apply search & filtering on input
	useEffect(() => {
		sortRows({ query, seenHidden, searchableFields });
	}, [query, seenHidden, sortRows]);

	const markAsSeen = (id) => {
		if (!isDemo) modifyReport({ id, update: { dateSeen: new Date() } });
	};

	const openReport = (id) => {
		history.push(`/report/${id}`);
		markAsSeen(id);
	};

	return (
		<Paper className={c.root}>
			<TableContainer className={c.container}>
				<Table stickyHeader>
					<Head />
					<Body openReport={openReport} />
				</Table>
			</TableContainer>
			<Footer markAsSeen={markAsSeen} />
		</Paper>
	);
};
