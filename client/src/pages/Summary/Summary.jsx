import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { Alert } from "components/Alert";
import { Nav } from "components/Nav";

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
	const clx = useStyles(data);

	const canContinue = optionalQueueExists && alertLevel < 4;

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Alert level={alertLevel} />

			<Container className={clx.main}>
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
					className={clx.callButton}
					onClick={callClinic}
				/>
			</Container>

			<Nav
				textLeft="Continue Analysis"
				onClickLeft={continueSurvey}
				textRight="Submit report"
				onClickRight={endSurvey}
				onlyRight={!canContinue}
				noArrows
			/>
		</Container>
	);
};

export default Summary;
