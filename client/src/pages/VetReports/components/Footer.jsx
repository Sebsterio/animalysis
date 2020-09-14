import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => {
	const toolbar = {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	};
	const highlight = {
		...toolbar,
		color: theme.palette.secondary.main,
		backgroundColor: lighten(theme.palette.secondary.light, 0.85),
	};
	return {
		container: {
			[theme.breakpoints.up("sm")]: {
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			},
		},
		toolbar: ({ active }) => (active ? highlight : toolbar),
		title: { flex: "1 1 100%" },
	};
});

export const Footer = ({
	selected,
	markSelectedAsSeen,
	rows,
	rowsPerPage,
	page,
	handleChangePage,
	handleChangeRowsPerPage,
}) => {
	const numSelected = selected.length;

	const c = useStyles({ active: numSelected > 0 });

	return (
		<div className={c.container}>
			<Toolbar className={c.toolbar}>
				{
					numSelected > 0 ? (
						<Typography
							className={c.title}
							color="inherit"
							variant="subtitle1"
							component="div"
							children={numSelected + " selected"}
						/>
					) : null
					// TODO: Search bar here
				}

				{numSelected > 0 ? (
					<Tooltip title="Mark as received">
						<IconButton onClick={markSelectedAsSeen}>
							<CheckCircleIcon color="primary" />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Filter list">
						<IconButton>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</Toolbar>

			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
};
