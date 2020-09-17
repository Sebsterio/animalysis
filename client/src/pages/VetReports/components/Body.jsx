import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { getComparator, stableSort } from "../VetReports-utils";

export const useStyles = makeStyles((theme) => ({
	row: { cursor: "pointer" },
	cell: { whiteSpace: "nowrap" },
	cellUnseen: {
		whiteSpace: "nowrap",
		fontWeight: "bold",
	},
}));

export const Body = ({
	page,
	rowsPerPage,
	isSelected,
	handleCheckboxClick,
	columns,
	rows,
	order,
	orderBy,
	openReport,
}) => {
	const c = useStyles();

	return (
		<TableBody>
			{stableSort(rows, getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row) => {
					const isItemSelected = isSelected(row.id);
					return (
						<TableRow
							hover
							role="checkbox"
							tabIndex={-1}
							key={row.id}
							className={c.row}
							selected={isItemSelected}
							onClick={() => openReport(row.id)}
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
										className={!row.dateSeen ? c.cellUnseen : c.cell}
									>
										{column.format ? column.format(value) : value}
									</TableCell>
								);
							})}
						</TableRow>
					);
				})}
		</TableBody>
	);
};
