import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
						children={column.label}
					/>
				))}
			</TableRow>
		</TableHead>
	);
};
