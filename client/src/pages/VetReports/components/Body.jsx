import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

const descendingComparator = (a, b, orderBy) => {
	if (b[orderBy] < a[orderBy]) return -1;
	if (b[orderBy] > a[orderBy]) return 1;
	return 0;
};

const getComparator = (order, orderBy) =>
	order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = (array, comparator) => {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
};

export const Body = ({
	page,
	rowsPerPage,
	isSelected,
	handleCheckboxClick,
	columns,
	rows,
	order,
	orderBy,
	c,
}) => {
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
