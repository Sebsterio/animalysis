import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useStyles } from "../SurveyEditor-styles";

export const Instructions = () => {
	const c = useStyles();

	return (
		<Accordion
			className={c.accordion}
			TransitionProps={{ unmountOnExit: true }}
		>
			<AccordionSummary
				classes={{ content: c.accordionSummaryContent }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography variant="h5">Instructions</Typography>
			</AccordionSummary>

			<AccordionDetails>
				<div>
					<Typography paragraph variant="h4">
						Variables
					</Typography>

					<hr className={c.mBottom2} />

					<Typography paragraph>
						Question labels and answer text support variables that get replaced
						by the pet's attributes when displayed to the user. Variables are
						denoted by square brackets: <code>[variable]</code>. Conditional
						statements have the following syntax:{" "}
						<code>[variable ? condition : expression]</code>
					</Typography>

					<Typography paragraph>
						<strong>Example:</strong>
					</Typography>
					<Typography paragraph>
						<code className={c.codeBlock}>
							Does [name] want to play[species? canine: and go on walks]?
						</code>
					</Typography>
					<Typography paragraph>
						<strong>Result:</strong> "Does Benny want to play and go on walks?"
					</Typography>

					<hr className={c.mBottom2} />

					<Typography paragraph>
						Multiple conditional statements are also supported:
					</Typography>
					<Typography>
						<code className={c.codeBlock}>
							[variable ? condition1 : expression1 | condition2: expression2]
						</code>
					</Typography>
					<Typography>is the equivalent of</Typography>
					<Typography paragraph>
						<code className={c.codeBlock}>
							[variable ? condition1 : expression1 ][ variable ? condition2:
							expression2]
						</code>
					</Typography>

					<Typography paragraph>
						<strong>Example:</strong>
					</Typography>
					<Typography paragraph>
						<code className={c.codeBlock}>
							Does [name] want to [species? canine: go on walks | feline: play]?
						</code>
					</Typography>
					<Typography paragraph>
						<strong>Result:</strong> "Does Benny want to go on walks?"
					</Typography>

					<hr className={c.mBottom2} />

					<Typography paragraph>
						Any spaces within a conditional statement but not inside an
						expression are ignored. Should you need to inject a space, use
						underscore "_" and a space will be put in it's place in the final
						message.
					</Typography>

					<hr className={c.mBottom2} />

					<Typography paragraph variant="h6">
						Available attributes
					</Typography>
					<Typography paragraph>
						<ul className={c.mTop0}>
							<li>name</li>
							<li>
								species: <code>canine | feline</code>
							</li>
							<li>
								sex:{" "}
								<code>
									male neutered | male entire | female neutered | female entire
								</code>
							</li>
						</ul>
					</Typography>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};
