import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { Head, Body, Footer } from "./components";

import { getDateString } from "utils/date";
import { getNewSelected } from "./VetReports-utils";
import { columns, searchableFields } from "./VetReports-constants";

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

export const VetReports = ({ history, reports, modifyReport }) => {
	const c = useStyles();

	// ---------------------------- Data ----------------------------

	const [rows, setRows] = useState([]);

	useEffect(() => {
		setRows([...reports]);
	}, [reports]);

	// --------------------------- Sorting --------------------------

	const [order, setOrder] = React.useState("desc");
	const [orderBy, setOrderBy] = React.useState("dateCreated");

	const handleRequestSort = (e, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// -------------------------- Selection -------------------------

	const [selected, setSelected] = React.useState([]);

	const handleSelectAllClick = (e) => {
		if (!e.target.checked) return setSelected([]);
		const newSelecteds = rows.map((row) => row.id);
		setSelected(newSelecteds);
	};

	const handleCheckboxClick = (e, id) => {
		e.stopPropagation();
		const selectedIndex = selected.indexOf(id);
		setSelected(getNewSelected(id, selected, selectedIndex));
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// ---------------- Modification & Navigation ------------------

	const markAsSeen = (id) =>
		modifyReport({ id, update: { dateSeen: new Date() } });

	const openReport = (id) => {
		history.push(`/report/${id}`);
		markAsSeen(id);
	};

	const markSelectedAsSeen = () => {
		selected.forEach((id) => markAsSeen(id));
		setSelected([]);
	};

	// ------------------------ Pagination ------------------------

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(+e.target.value);
		setPage(0);
	};

	// -------------------- Search & Filtering ----------------------

	const [query, setQuery] = useState("");
	const [seenHidden, setSeenHidden] = useState(false);

	// Filter rows by search query (match any field) and "seen" status
	// prettier-ignore
	useEffect(() => {
		let newRows = [...reports]
		if (seenHidden)	newRows = newRows.filter((row) => !row.dateSeen)
		if (query !== '')	newRows = newRows.filter((row) =>
			searchableFields.some((field) => {
				const fieldString =	field === "dateCreated"
					? getDateString(row[field])
					: String(row[field]).toLowerCase();
				return fieldString.includes(query.toLowerCase());
			}))
		setRows(newRows);
		setPage(0);
	}, [query, seenHidden, reports]);

	const handleInput = (e) => setQuery(e.target.value);

	const toggleSeenHidden = () => setSeenHidden(!seenHidden);

	// --------------------------- View ---------------------------

	return (
		<Paper className={c.root}>
			<TableContainer className={c.container}>
				<Table stickyHeader>
					<Head
						numSelected={selected.length}
						rowCount={rows.length}
						{...{ c, columns, handleSelectAllClick }}
						{...{ order, orderBy, handleRequestSort }}
					/>
					<Body
						{...{ c, page, rowsPerPage, isSelected, order, orderBy }}
						{...{ handleCheckboxClick, columns, rows, openReport }}
					/>
				</Table>
			</TableContainer>
			<Footer
				{...{ selected, markSelectedAsSeen, rows, rowsPerPage }}
				{...{ page, handleChangePage, handleChangeRowsPerPage }}
				{...{ query, handleInput, seenHidden, toggleSeenHidden }}
			/>
		</Paper>
	);
};
