import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => {
	const toolbar = {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
		flex: 1,
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
		toolbar: ({ selectionActive }) => (selectionActive ? highlight : toolbar),
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
	query,
	handleInput,
	seenHidden,
	toggleSeenHidden,
}) => {
	const selectionActive = selected.length > 0;

	const c = useStyles({ selectionActive });

	// Send fake input event with (value = "")
	const handleClear = () => handleInput({ target: { value: "" } });

	return (
		<div className={c.container}>
			<Toolbar className={c.toolbar}>
				{selectionActive ? (
					<>
						<Typography
							className={c.title}
							color="inherit"
							variant="subtitle1"
							component="div"
							children={selectionActive + " selected"}
						/>
						<Tooltip title="Mark as received">
							<IconButton onClick={markSelectedAsSeen}>
								<CheckCircleIcon color="primary" />
							</IconButton>
						</Tooltip>
					</>
				) : (
					<>
						<TextField
							autoFocus
							fullWidth
							label="Search"
							value={query}
							onChange={handleInput}
						/>
						<Tooltip title="Clear">
							<IconButton onClick={handleClear}>
								<ClearIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title={seenHidden ? "Show seen" : "Hide seen"}>
							<IconButton onClick={toggleSeenHidden}>
								{seenHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</IconButton>
						</Tooltip>
					</>
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
