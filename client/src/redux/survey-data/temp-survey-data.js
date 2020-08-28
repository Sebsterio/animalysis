export const surveyData = {
	problemIntro: ["primer"], // prepended to mainQueue if reporting a problem
	mainQueue: ["bleeding", "activity", "urinating"],
	optionalQueue: ["nose_exam", "ears_exam", "behaviour_exam", "bleeding_exam"],
	sections: {
		// ------------------- section: primer -------------------

		primer: {
			title: "Primer Questions",
			questions: [
				{
					label: `What's wrong with [name] today?`,
					type: "text",
					setsTitle: true,
					lengthLimit: 40,
				},
				{
					label: `Where on [name]’s body is the problem/problems?`,
					type: "select-multiple",
					answers: [
						{
							text:
								"Nose (schedule follo-up Nose Exam at the end of the queue)",
							followUp: {
								target: "nose_exam",
								after: ["all"],
							},
						},
						{
							text: "Ears (schedule follo-up Ears Exam after this question)",
							followUp: {
								target: "ears_exam",
								after: ["none"],
							},
						},
						{
							text: "Other",
						},
					],
				},
			],
		},

		// ------------------- section: bleeding -------------------

		bleeding: {
			title: "Bleeding",
			questions: [
				{
					label:
						"Test question testing injecting followUp after multiple sections",
					type: "select-one",
					answers: [
						{
							text:
								"Schedule follow-up 'behaviour' after 'bleeding' and 'activity'",
							followUp: {
								target: "behaviour_exam",
								after: ["bleeding", "activity"],
							},
						},

						{
							text: "Answer 2 (orange alert)",
							alert: 3,
						},
					],
				},
				{
					label:
						"This question shuld appear immediately after test question testing injecting followUp after multiple sections",
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},

						{
							text: "Answer 2",
						},
					],
				},
				{
					label: `Is [name] bleeding?`,
					type: "select-one",
					answers: [
						{
							text: "Yes",
							followUp: {
								target: "bleeding_exam",
								after: "none",
							},
						},
						{ text: "No" },
					],
				},
			],
		},

		// ------------------- section: activity -------------------

		activity: {
			title: "Activity Level",
			questions: [
				{
					label: `Is [name] lethargic (i.e. not as active as usual)?`,
					type: "select-one",
					answers: [
						{
							text: "Normal activity",
						},
						{
							text: `Still; wants to [species? dog: go on walks | cat: play or interact with humans] but not as much as usual`,
							print: "Mild lethargy",
							alert: 2,
							followUp: {
								target: ["behaviour_exam", "bleeding_exam"],
								after: "none",
							},
						},
						{
							text: "Doesn't respond at all and can't move",
							print: "Comatose",
							alert: 4,
						},
					],
				},
			],
		},

		// ------------------- section: urinating -------------------

		urinating: {
			title: "Urinating",
			questions: [
				{
					label: `How much urine is [name] producing?`,
					type: "select-one",
					answers: [
						{
							text: "Normal",
							print: "Urination normal",
						},
						{
							text: "More than normal",
							followUp: {
								target: "increased_urination",
								after: "none",
							},
						},
					],
				},
				{
					label: `Is there blood in the urine?`,
					type: "select-one",
					answers: [
						{
							text: "Yes",
							alert: 2,
							followUp: {
								target: "bleeding_exam",
								after: "none",
							},
						},
						{
							text: "No",
						},
					],
				},
			],
		},

		increased_urination: {
			title: "Increased Urination",
			questions: [
				{
					label: "How long for?",
					type: "select-one",
					answers: [
						{
							text: "1 day",
							printNote: "Polyuric for 1 day",
							alert: 2,
						},
						{
							text: "1-3 days",
							printNote: "Polyuric for 1-3 days",
							alert: 3,
						},
					],
				},
			],
		},

		// ------------------- section: behaviour_exam -------------------

		behaviour_exam: {
			title: "Behaviour",
			questions: [
				{
					label: `Does [name] have any of the following movement issues?`,
					type: "select-one",
					answers: [
						{
							text: "Trembling or tremoring",
							print: "Tremoring",
							alert: 3,
						},
						{
							text: "No",
						},
					],
				},
			],
		},

		// ------------------- section: nose_exam -------------------

		nose_exam: {
			title: "Nose - examination",
			questions: [
				{
					label: `Question Text Here...`,
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
					],
				},
				{
					label: `Another nose question...`,
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
					],
				},
			],
		},

		// ------------------- section: ears_exam -------------------

		ears_exam: {
			title: "Ears - examination",
			questions: [
				{
					label: `Question Text Here...`,
					type: "select-one",
					answers: [
						{
							text: "Answer 1",
						},
						{
							text: "Answer 2",
						},
					],
				},
			],
		},

		// ------------------- section: bleeding_exam -------------------

		bleeding_exam: {
			title: "Bleeding- examination",
			questions: [
				{
					label: "How much blood is there?",
					type: "select-one",
					answers: [
						{
							text: "Blood only comes out when vomiting or urinating or pooing",
						},
						{
							text: "Dripping onto the floor",
							print: "Severe Heammorhage",
							alert: 4,
						},
					],
				},
				{
					label: "Where is the blood coming from?",
					type: "select-multiple",
					answers: [
						{
							text: "Skin wound",
							followUp: {
								target: "skin_wound",
								after: "none",
							},
						},
						{
							text: "Mouth",
							printNote: "from mouth",
						},
					],
				},
			],
		},

		skin_wound: {
			title: "Skin wound",
			questions: [
				{
					label: "How big is it? No need to measure, just estimate.",
					type: "select-one",
					answers: [
						{
							text: "&lt;1mm",
							printNote: "&lt;1mm wound",
							alert: 1,
						},
						{
							text: "1-10mm",
							printNote: "1-10mm wound",
							alert: 2,
						},
					],
				},
				{
					label: "Are there any more wounds?",
					type: "select-one",
					answers: [
						{
							text: "yes",
							followUp: {
								target: "skin_wound",
								after: "none",
							},
						},
						{
							text: "no",
						},
					],
				},
			],
		},
	},
};
