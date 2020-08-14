import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { summaryData } from "./Summary-data";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	content: {
		display: "grid",
		gridGap: theme.spacing(3),
	},
	nav: {
		display: "flex",
		justifyContent: "space-between",
	},
}));

const Summary = ({ alertLevel, continueSurvey, endSurvey, callClinic }) => {
	const clx = useStyles();

	const pet = { name: "Bobo" };

	const text = summaryData[alertLevel];

	return (
		<Container className={clx.page}>
			<Container className={clx.content}>
				<Typography children={text.paragraph1(pet)} />
				{!!text.paragraph2 && <Typography children={text.paragraph2(pet)} />}
				{!!text.paragraph3 && <Typography children={text.paragraph3(pet)} />}

				<Button
					fullWidth
					variant={alertLevel ? "contained" : "outlined"}
					color="primary"
					children="Call Clinic"
					className={clx.callButton}
					onClick={callClinic}
				/>
			</Container>

			<div className={clx.nav}>
				{alertLevel < 4 && (
					<Button
						color="default"
						children="Continue Analysis"
						className={clx.navButton}
						onClick={continueSurvey}
					/>
				)}
				<Button
					fullWidth={alertLevel === 4}
					color="default"
					children="Submit report"
					className={clx.navButton}
					onClick={endSurvey}
				/>
			</div>
		</Container>
	);
};

export default Summary;
