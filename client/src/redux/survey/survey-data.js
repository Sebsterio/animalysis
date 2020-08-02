export const surveyData = {
	main: [
		{
			id: "p1",
			title: "Activity Level",
			questions: [
				{
					id: "q1",
					label:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
						{
							text: "Answer 3",
						},
					],
				},
				{
					id: "q2",
					label: "Excepteur sint occaecat cupidatat non proident?",
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
						{
							text: "Answer 3 (-> addl. questions)",
							redirect: "activity",
						},
					],
				},
			],
		},
		{
			id: "p2",
			title: "Bleeding",
			questions: [
				{
					id: "q1",
					label: "Ut enim ad minim veniam, quis nostrud exercitation?",
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
						{
							text: "Answer 3",
						},
					],
				},
				{
					id: "q2",
					label: "Sed ut perspiciatis unde omnis iste natus?",
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
						{
							text: "Answer 3",
						},
					],
				},
			],
		},
	],

	// ------------------------- Bonus sections -------------------------

	activity: [
		{
			id: "px1",
			title: "Activity - clarification",
			questions: [
				{
					id: "q1",
					label: "Nemo enim ipsam voluptatem quia voluptas?",
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
						{
							text: "Answer 3",
						},
					],
				},
				{
					id: "q2",
					label: "Quis autem vel eum iure reprehenderit qui in ea voluptate?",
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
						{
							text: "Answer 3",
						},
					],
				},
			],
		},
	],
};
