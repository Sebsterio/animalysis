import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: `translate(-50%, -50%)`,
		width: 400,
		maxWidth: "95vw",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	closeBtn: {
		margin: theme.spacing(1, 0),
	},
	bookingBtn: {
		margin: theme.spacing(1, 0),
	},
}));

const AlertModal = ({ level, closeModal, history }) => {
	const clx = useStyles();

	const organgeAlert = level === 2;
	const redAlert = level === 3;

	const goToBookingPage = () => {
		closeModal();
		history.push("/appointment");
	};

	const handleBgClick = () => {
		console.log("bg click");
		if (redAlert) goToBookingPage();
		else closeModal();
	};

	return (
		<Modal
			open={!!level}
			onClose={handleBgClick}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div className={clx.paper}>
				<h2 id="simple-modal-title">Attention!</h2>
				<p id="simple-modal-description">
					Your pet's issue is urgent. You should book an appointment
					immediately.{" "}
					{organgeAlert && "You may complete the survey afterwards."}
				</p>
				<Button
					fullWidth
					variant="contained"
					color="default"
					children="Continue Survey"
					disabled={redAlert}
					className={clx.closeBtn}
					onClick={closeModal}
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					children="Book an Appointment"
					className={clx.bookingBtn}
					onClick={goToBookingPage}
				/>
			</div>
		</Modal>
	);
};

export default AlertModal;
