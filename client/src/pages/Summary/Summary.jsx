import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { Nav, Alert } from "components";
import { summaryData } from "./Summary-data";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	main: {
		display: "grid",
		gridGap: theme.spacing(3),
	},
}));

const Summary = ({
	pet,
	alertLevel,
	optionalQueueExists,
	callClinic,
	continueSurvey,
	endSurvey,
}) => {
	const data = summaryData[alertLevel];
	const c = useStyles(data);

	const canContinue = optionalQueueExists && alertLevel < 4;

	return (
		<Container maxWidth="xs" className={c.page}>
			<Alert level={alertLevel} />

			<Container className={c.main}>
				<Typography children={data.textMain(pet)} />
				{canContinue && !!data.textContinue && (
					<Typography children={data.textContinue(pet)} />
				)}
				{!!data.textEnd && <Typography children={data.textEnd(pet)} />}

				<Button
					fullWidth
					variant={alertLevel ? "contained" : "outlined"}
					color="primary"
					children="Call Clinic"
					onClick={callClinic}
				/>
			</Container>

			<Nav
				textLeft={canContinue && "Continue Analysis"}
				onClickLeft={continueSurvey}
				textRight="Submit report"
				onClickRight={endSurvey}
				noArrows
			/>
		</Container>
	);
};

export default Summary;
