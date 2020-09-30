import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Page, Nav, Alert } from "components";
import { summaryData } from "./Summary-data";

const Summary = ({
	pet,
	alertLevel,
	phone,
	optionalQueueExists,
	continueSurvey,
	endSurvey,
}) => {
	const data = summaryData[alertLevel];

	const canContinue = optionalQueueExists && alertLevel < 4;

	return (
		<Page
			header={<Alert level={alertLevel} />}
			main={
				<>
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
						component="a"
						href={"tel:" + phone}
						disabled={!phone}
					/>
				</>
			}
			footer={
				<Nav
					textLeft={canContinue && "Continue Analysis"}
					onClickLeft={continueSurvey}
					textRight="Submit report"
					onClickRight={endSurvey}
					noArrows
				/>
			}
		/>
	);
};

export default Summary;
