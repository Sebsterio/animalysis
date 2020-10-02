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

const AlertModal = ({ isActive, phone, closeModal, endSurvey }) => {
	const c = useStyles();

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
			<Container className={c.paper}>
				<Typography
					children="Attention!"
					component="h2"
					variant="h2"
					align="center"
					id="alert-modal-title"
				/>
				<Typography
					children="Your pet should be seen by a vet today. Please book an appointment."
					className={c.subHeading}
					color="error"
					id="alert-modal-description"
				/>
				<Button
					fullWidth
					variant="contained"
					color="default"
					children="Call Clinic"
					className={c.callButton}
					component="a"
					href={"tel:" + phone}
					disabled={!phone}
				/>
				<Typography children="If you have time before the appointment, please continue the survey as it will help your vet." />

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
