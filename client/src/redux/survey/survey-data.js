export const surveyData = {
	main: [
		{
			route: "p1",
			title: "Activity Level",
			questions: [
				{
					route: "q1",
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
					route: "q2",
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
							redirect: "px1",
						},
					],
				},
			],
		},
		{
			route: "p2",
			title: "Bleeding",
			questions: [
				{
					route: "q1",
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
					route: "q2",
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

	optional: [
		{
			route: "px1",
			title: "Activity - clarification",
			questions: [
				{
					route: "q1",
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
					route: "q2",
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
