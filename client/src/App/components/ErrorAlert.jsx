import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { withError } from "HOC/withError";

const useStyles = makeStyles((theme) => ({
	container: { marginBottom: theme.spacing(0.5) },
	alert: { alignItems: "center" },
}));

export const ErrorAlert = withError(
	({ isGenericError, errorMessage, clearError }) => {
		const c = useStyles();

		return (
			<Collapse in={isGenericError} className={c.container}>
				<Alert
					severity="error"
					children={errorMessage}
					className={c.alert}
					action={
						<IconButton
							children={<CloseIcon fontSize="inherit" />}
							onClick={clearError}
							aria-label="dismiss error"
							color="inherit"
						/>
					}
				/>
			</Collapse>
		);
	}
);
