import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { columns } from "../../VetReports-constants";

const useStyles = makeStyles((theme) => ({
	headCell: {
		whiteSpace: "nowrap",
		paddingRight: 0, // Counter text displacement caused by sort-arrow-icon
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
}));

export const Head = ({
	// Store
	rows,
	selected,
	order,
	orderBy,
	// Dispatch
	setSelected,
	setOrder,
	setOrderBy,
}) => {
	const numSelected = selected.length;
	const rowCount = rows.length;

	const c = useStyles();

	const handleSelectAllClick = (e) => {
		if (!e.target.checked) return setSelected([]);
		const newSelecteds = rows.map((row) => row.id);
		setSelected(newSelecteds);
	};

	const handleRequestSort = (e, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const createSortHandler = (property) => (e) => handleRequestSort(e, property);

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={handleSelectAllClick}
					/>
				</TableCell>

				{columns.map((column) => (
					<TableCell
						key={column.id}
						className={c.headCell}
						align="center"
						style={{ minWidth: column.minWidth }}
						sortDirection={orderBy === column.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === column.id}
							direction={orderBy === column.id ? order : "asc"}
							onClick={createSortHandler(column.id)}
						>
							{column.label}
							{orderBy === column.id ? (
								<span className={c.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};
