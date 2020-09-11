import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Checkbox from "@material-ui/core/Checkbox";
import { Toolbar } from "./components";

import { alertData } from "components";
import { getDateString } from "utils/date";
import { getAugmentedReports, getNewSelected } from "./VetReports-utils";

// =========================== Constants ===============================

const columns = [
	{
		id: "alert",
		label: "Alert",
		minWidth: 50,
		format: (alert) => (
			<FiberManualRecordIcon style={{ color: alertData[alert].color }} />
		),
	},
	{
		id: "dateCreated",
		label: "Date",
		minWidth: 100,
		format: (val) => getDateString(val),
	},
	{ id: "title", label: "Title", minWidth: 200 },
	{ id: "name", label: "Pet's name", minWidth: 120 },
	{ id: "species", label: "Species", minWidth: 100 },
	{ id: "breed", label: "Breed", minWidth: 100 },
	{ id: "ownerName", label: "Owner", minWidth: 120 },
];

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		height: "calc(100vh - 175px)", // Navbar + Toolbar + TablePagination
	},
	unseenReport: {
		fontWeight: "bold",
	},
});

// =========================== Component ===============================

export const VetReports = ({ history, reports, modifyReport }) => {
	const c = useStyles();

	// ---------------------------- Data ----------------------------

	const [rows, setRows] = useState([]);

	useEffect(() => {
		setRows(getAugmentedReports(reports));
	}, [reports]);

	// -------------------------- Selection -------------------------

	const [selected, setSelected] = React.useState([]);

	const handleSelectAllClick = (e) => {
		if (!e.target.checked) return setSelected([]);
		const newSelecteds = rows.map((row) => row.id);
		setSelected(newSelecteds);
	};

	const handleCheckboxClick = (e, id) => {
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

	const markAllAsSeen = () => selected.forEach((id) => markAsSeen(id));

	// ------------------------ Pagination ------------------------

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// --------------------------- View ---------------------------

	return (
		<Paper className={c.root}>
			<Toolbar numSelected={selected.length} {...{ markAllAsSeen }} />
			<TableContainer className={c.container}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align="center"
									style={{ minWidth: column.minWidth }}
									children={column.label}
								/>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								const isItemSelected = isSelected(row.id);
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isItemSelected}
												onClick={(e) => handleCheckboxClick(e, row.id)}
											/>
										</TableCell>

										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align="center"
													className={!row.dateSeen ? c.unseenReport : null}
												>
													{column.format ? column.format(value) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
