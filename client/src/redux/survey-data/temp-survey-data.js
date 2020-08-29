export const surveyData = {
	dateModified: null,
	datePublished: null,
	publishing: false,
	//-----------------
	primerQueue: ["primer"],
	mainQueue: ["bleeding", "activity", "urinating"],
	optionalQueue: ["nose_exam", "ears_exam", "behaviour_exam", "bleeding_exam"],
	sections: {
		// ------------------- section: primer -------------------

		primer: {
			title: "Primer Questions",
			questions: [
				{
					id: "1",
					label: `What's wrong with [name] today?`,
					type: "text",
					setsTitle: true,
					lengthLimit: 40,
				},
				{
					id: "2",
					label: `Where on [name]’s body is the problem/problems?`,
					type: "select-multiple",
					answers: [
						{
							id: "1",
							text:
								"Nose (schedule follo-up Nose Exam at the end of the queue)",
							followUp: {
								target: ["nose_exam"],
								after: ["all"],
							},
						},
						{
							id: "2",
							text: "Ears (schedule follo-up Ears Exam after this question)",
							followUp: {
								target: ["ears_exam"],
								after: ["none"],
							},
						},
						{
							id: "3",
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
					id: "1",
					label:
						"Test question testing injecting followUp after multiple sections",
					type: "select-one",
					answers: [
						{
							id: "1",
							text:
								"Schedule follow-up 'behaviour' after 'bleeding' and 'activity'",
							followUp: {
								target: ["behaviour_exam"],
								after: ["bleeding", "activity"],
							},
						},
						{
							id: "2",
							text: "Answer 2 (orange alert)",
							alert: 3,
						},
					],
				},
				{
					id: "2",
					label:
						"This question shuld appear immediately after test question testing injecting followUp after multiple sections",
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "Answer 1",
						},

						{
							id: "2",
							text: "Answer 2",
						},
					],
				},
				{
					id: "3",
					label: `Is [name] bleeding?`,
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "Yes",
							followUp: {
								target: ["bleeding_exam"],
								after: ["none"],
							},
						},
						{ id: "2", text: "No" },
					],
				},
			],
		},

		// ------------------- section: activity -------------------

		activity: {
			title: "Activity Level",
			questions: [
				{
					id: "1",
					label: `Is [name] lethargic (i.e. not as active as usual)?`,
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "Normal activity",
						},
						{
							id: "2",
							text: `Still; wants to [species? dog: go on walks | cat: play or interact with humans] but not as much as usual`,
							print: "Mild lethargy",
							alert: 2,
							followUp: {
								target: ["behaviour_exam", "bleeding_exam"],
								after: ["none"],
							},
						},
						{
							id: "3",
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
					id: "1",
					label: `How much urine is [name] producing?`,
					type: "select-one",
					answers: [
						{ id: "1", text: "Normal", print: "Urination normal" },
						{
							id: "2",
							text: "More than normal",
							followUp: {
								target: ["increased_urination"],
								after: ["none"],
							},
						},
					],
				},
				{
					id: "2",
					label: `Is there blood in the urine?`,
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "Yes",
							alert: 2,
							followUp: {
								target: ["bleeding_exam"],
								after: ["none"],
							},
						},
						{ id: "2", text: "No" },
					],
				},
			],
		},

		increased_urination: {
			title: "Increased Urination",
			questions: [
				{
					id: "1",
					label: "How long for?",
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "1 day",
							printNote: "Polyuric for 1 day",
							alert: 2,
						},
						{
							id: "2",
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
					id: "1",
					label: `Does [name] have any of the following movement issues?`,
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "Trembling or tremoring",
							print: "Tremoring",
							alert: 3,
						},
						{ id: "2", text: "No" },
					],
				},
			],
		},

		// ------------------- section: nose_exam -------------------

		nose_exam: {
			title: "Nose - examination",
			questions: [
				{
					id: "1",
					label: `Question Text Here...`,
					type: "select-one",
					answers: [
						{ id: "1", text: "Answer 1" },
						{ id: "2", text: "Answer 2" },
					],
				},
				{
					id: "2",
					label: `Another nose question...`,
					type: "select-one",
					answers: [
						{ id: "1", text: "Answer 1" },
						{ id: "2", text: "Answer 2" },
					],
				},
			],
		},

		// ------------------- section: ears_exam -------------------

		ears_exam: {
			title: "Ears - examination",
			questions: [
				{
					id: "1",
					label: `Question Text Here...`,
					type: "select-one",
					answers: [
						{ id: "1", text: "Answer 1" },
						{ id: "2", text: "Answer 2" },
					],
				},
			],
		},

		// ------------------- section: bleeding_exam -------------------

		bleeding_exam: {
			title: "Bleeding- examination",
			questions: [
				{
					id: "1",
					label: "How much blood is there?",
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "Blood only comes out when vomiting or urinating or pooing",
						},
						{
							id: "2",
							text: "Dripping onto the floor",
							print: "Severe Heammorhage",
							alert: 4,
						},
					],
				},
				{
					id: "2",
					label: "Where is the blood coming from?",
					type: "select-multiple",
					answers: [
						{
							id: "1",
							text: "Skin wound",
							followUp: {
								target: ["skin_wound"],
								after: ["none"],
							},
						},
						{ id: "2", text: "Mouth", printNote: "from mouth" },
					],
				},
			],
		},

		skin_wound: {
			title: "Skin wound",
			questions: [
				{
					id: "1",
					label: "How big is it? No need to measure, just estimate.",
					type: "select-one",
					answers: [
						{ id: "1", text: "&lt;1mm", printNote: "&lt;1mm wound", alert: 1 },
						{ id: "2", text: "1-10mm", printNote: "1-10mm wound", alert: 2 },
					],
				},
				{
					id: "2",
					label: "Are there any more wounds?",
					type: "select-one",
					answers: [
						{
							id: "1",
							text: "yes",
							followUp: {
								target: ["skin_wound"],
								after: ["none"],
							},
						},
						{ id: "2", text: "no" },
					],
				},
			],
		},
	},
};
