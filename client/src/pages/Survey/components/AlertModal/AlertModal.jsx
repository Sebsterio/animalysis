import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Container, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: `translate(-50%, -50%)`,
		width: 400,
		maxWidth: "96vw",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 3),
		display: "grid",
		gridGap: theme.spacing(3),
	},
	subHeading: {
		fontWeight: "bold",
	},
	nav: {
		display: "flex",
		justifyContent: "space-between",
	},
}));

const AlertModal = ({ active, closeModal, history }) => {
	const clx = useStyles();

	const endSurvey = () => {
		closeModal();
		history.replace("/analysis/report");
	};

	const callClinic = () => alert("CALL_CLINIC--STUB");

	return (
		<Modal
			open={active}
			onClose={closeModal}
			aria-labelledby="alert-modal-title"
			aria-describedby="alert-modal-description"
		>
			<Container className={clx.paper}>
				<Typography
					children="Attention!"
					component="h2"
					variant="h2"
					align="center"
					id="alert-modal-title"
				/>
				<Typography
					children="Your pet's issue is urgent. Please book an appointment immediately."
					className={clx.subHeading}
					color="error"
					id="alert-modal-description"
				/>
				<Button
					fullWidth
					variant="contained"
					color="default"
					children="Call Clinic"
					className={clx.callButton}
					onClick={callClinic}
				/>
				<Typography children="You may complete the survey at any time or send it to your vet now." />
				<div className={clx.nav}>
					<Button
						color="default"
						children="Continue Analysis"
						className={clx.navButton}
						onClick={closeModal}
					/>
					<Button
						color="default"
						children="Submit report"
						className={clx.navButton}
						onClick={endSurvey}
					/>
				</div>
			</Container>
		</Modal>
	);
};

export default AlertModal;
