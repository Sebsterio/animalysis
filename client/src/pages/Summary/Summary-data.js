import React from "react";

export const summaryData = [
	// none
	{
		textMain: (pet) => (
			<>
				Based on the information you've given, {pet.name} seems fine and an
				appointment with the vet is not necessary.
			</>
		),
		textContinue: () => (
			<>
				You may answer questions about areas that weren't noted as problems by
				pressing "continue".
			</>
		),
		textEnd: () => (
			<>
				If you wish to end the survey now, a report based on this analysis will
				be sent to your vet and they may instruct you further.
			</>
		),
	},
	// green
	{
		textMain: (pet) => (
			<>
				You should book an appointment for {pet.name} with the vet in{" "}
				<b>in the next 2 days</b>.
			</>
		),
		textContinue: (pet) => (
			<>
				If you have time, press continue to provide more information that may
				help your vet with {pet.name}'s' case.
			</>
		),
		textEnd: (pet) => (
			<>
				If you wish to end the survey now, a report based on this analysis will
				be sent to your vet and they may instruct you further.
			</>
		),
	},
	// yellow
	{
		textMain: (pet) => (
			<>
				You should book an appointment for {pet.name} with the vet in{" "}
				<b>in the next 24 hours</b>.
			</>
		),
		textContinue: (pet) => (
			<>
				If you have time, press continue to provide more information that may
				help your vet with {pet.name}'s' case.
			</>
		),
		textEnd: () => (
			<>
				If you wish to end the survey now, a report based on this analysis will
				be sent to your vet and they may instruct you further.
			</>
		),
	},
	// orange
	{
		textMain: (pet) => (
			<>
				You should book an appointment for {pet.name} with the vet{" "}
				<b>as soon as possible</b>.
			</>
		),
		textContinue: () => (
			<>
				If you have time on the way to the clinic, you may continue the analysis
				at any time or send it to your vet now.
			</>
		),
		textEnd: () => (
			<>
				If you wish to end the survey now, a report based on this analysis will
				be sent to your vet and they may instruct you further.
			</>
		),
	},
	// red
	{
		textMain: (pet) => (
			<>
				{pet.name}'s issue is <b>extremely urgent</b>.
			</>
		),
		textEnd: () => <>Stop what you are doing and get straight to the vet.</>,
	},
];
