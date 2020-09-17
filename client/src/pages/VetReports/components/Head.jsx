import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const Head = ({
	c,
	columns,
	handleSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	handleRequestSort,
}) => {
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
						className={c.cell}
						align="center"
						style={{ minWidth: column.minWidth }}
						// padding={column.disablePadding ? 'none' : 'default'}
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
