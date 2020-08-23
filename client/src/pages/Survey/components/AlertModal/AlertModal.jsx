import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Container, Typography, Button } from "@material-ui/core";
import { Nav } from "components";

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
}));

const AlertModal = ({ isActive, closeModal, endSurvey, callClinic }) => {
	const clx = useStyles();

	const handleClose = () => {
		closeModal();
		endSurvey();
	};

	return (
		<Modal
			open={isActive}
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
				<Typography children="You may complete the analysis at any time or send it to your vet now." />

				<Nav
					textLeft="Continue Analysis"
					onClickLeft={closeModal}
					textRight="Submit report"
					onClickRight={handleClose}
					noArrows
				/>
			</Container>
		</Modal>
	);
};

export default AlertModal;
