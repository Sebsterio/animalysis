import React from "react";

export const summaryData = [
	// none
	{
		paragraph1: (pet) => (
			<>
				{pet.name} seems fine and an appointment with the vet is not necessary.
			</>
		),
		paragraph2: () => (
			<>
				You may answer questions about areas that weren't noted as problems by
				pressing "continue".
			</>
		),
		paragraph3: () => (
			<>
				If you wish to end the survey now, a report based on this analysis will
				be sent to your vet and they may instruct you further.
			</>
		),
	},
	// green
	{
		paragraph1: (pet) => (
			<>
				You should book an appointment for {pet.name} with the vet in{" "}
				<b>in the next 2 days</b>.
			</>
		),
		paragraph2: (pet) => (
			<>
				If you have time, press continue to provide more information that may
				help your vet with {pet.name}'s' case.
			</>
		),
		paragraph3: (pet) => (
			<>
				If you wish to end the survey now, a report based on this analysis will
				be sent to your vet and they may instruct you further.
			</>
		),
	},
	// yellow
	{
		paragraph1: (pet) => (
			<>
				You should book an appointment for {pet.name} with the vet in{" "}
				<b>in the next 24 hours</b>.
			</>
		),
		paragraph2: (pet) => (
			<>
				If you have time, press continue to provide more information that may
				help your vet with {pet.name}'s' case.
			</>
		),
		paragraph2: () => (
			<>
				If you wish to end the survey now, a report based on this analysis will
				be sent to your vet and they may instruct you further.
			</>
		),
	},
	// orange
	{
		paragraph1: (pet) => (
			<>
				You should book an appointment for {pet.name} with the vet{" "}
				<b>as soon as possible</b>.
			</>
		),
		paragraph2: () => (
			<>
				If you have time on the way to the clinic, you may continue the analysis
				at any time or send it to your vet now.
			</>
		),
	},
	// red
	{
		paragraph1: (pet) => (
			<>
				{pet.name}'s issue is <b>extremely urgent</b>.
			</>
		),
		paragraph2: () => <>Stop what you are doing and get straight to the vet.</>,
	},
];
