import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

export const ConfirmDialog = ({
	isOpen = false,
	close,
	cancel = close,
	confirm = close,
	title,
	text,
	buttonText = ["cancel", "confirm"],
	buttonColor = ["primary", "primary"],
}) => (
	<Dialog
		open={isOpen}
		onClose={close}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		{title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{text}
			</DialogContentText>
		</DialogContent>

		<DialogActions>
			<Button onClick={cancel} color={buttonColor[0]}>
				{buttonText[0]}
			</Button>
			<Button onClick={confirm} color={buttonColor[1]} autoFocus>
				{buttonText[1]}
			</Button>
		</DialogActions>
	</Dialog>
);
