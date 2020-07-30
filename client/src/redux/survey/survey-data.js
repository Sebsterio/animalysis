export const surveyData = [
	{
		id: "p1",
		title: "Page 1",
		questions: [
			{
				id: "p1q1",
				label: "Question 1",
				type: "radio",
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
				id: "p1q2",
				label: "Question 2",
				type: "radio",
				answers: [
					{
						text: "Answer 1",
					},
					{
						text: "Answer 2",
					},
					{
						text: "Answer 3",
						redirect: "px1",
					},
				],
			},
		],
	},
	{
		id: "p1",
		title: "Page 2",
		questions: [
			{
				id: "p2q1",
				label: "Question 1",
				type: "radio",
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
				id: "p2q2",
				label: "Question 2",
				type: "radio",
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

	// ------------------------- Bonus pages -------------------------

	{
		id: "px1",
		title: "Bonus Page 1",
		questions: [
			{
				id: "p2q1",
				label: "Question 1",
				type: "radio",
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
				id: "p2q2",
				label: "Question 2",
				type: "radio",
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
];
