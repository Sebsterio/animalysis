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

import { getDateString } from "utils/date";
import { alertData } from "components";

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
];

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		height: "calc(100vh - 118px)", // Navbar + TablePagination
	},
	unseenReport: {
		fontWeight: "bold",
	},
});

// =========================== Component ===============================

export const VetReports = ({ history, reports, modifyReport }) => {
	const c = useStyles();

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

	// --------------------------- Data ---------------------------

	const [rows, setRows] = useState([]);

	useEffect(() => {
		setRows(reports);
	}, [reports]);

	const openReport = (id) => {
		history.push(`/report/${id}`);
		modifyReport({ id, update: { dateSeen: new Date() } });
	};

	// --------------------------- View ---------------------------

	return (
		<Paper className={c.root}>
			<TableContainer className={c.container}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align="center"
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align="center"
													className={!row.dateSeen && c.unseenReport}
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
