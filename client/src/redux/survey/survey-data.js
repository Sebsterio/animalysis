/*
 * queue: ['sectionName']
 * sections (Arr)
 * -sectionName (Obj)
 * --title (Str): displayed in UI
 * --questions (Arr)
 * ---question (Obj || Func(pet) => Obj)
 * ----label (Str): diplayed in UI
 * ----type (Str): text | select-one | select-multiple
 * ----answers (Arr)
 * -----text (Str): displayed in UI
 * -----print (Str): displayed in final report
 * -----alert (Num): displayed in final report (highest alert reached only)
 * -------0 (green) | 1 (yellow) | 2 (orange) | 3 (red),
 * -----followUp (Obj)
 * ------target (Str: sectionName): section to inject
 * ------priority (Num)
 * -------1 (now): unshift target to queue
 * -------2 (soon): inject target after given section
 * -------3 (eventually): push target to queue
 * ------after (Str): if priority=2, specifies sectionName after which to inject target
 */

export const surveyData = {
	mainQueue: ["primer", "bleeding", "activity", "urinating"],
	optionalQueue: ["nose_exam", "ears_exam", "behaviour_exam", "bleeding_exam"],
	sections: {
		// ------------------- section: primer -------------------

		primer: {
			title: "Primer Questions",
			questions: [
				(pet) => ({
					label: `Where on ${pet.name}’s body is the problem/problems?`,
					type: "select-multiple",
					answers: [
						{
							text: "Nose",
							followUp: {
								priority: 3,
								target: "nose",
							},
						},
						{
							text: "Ears",
							followUp: {
								priority: 3,
								target: "ears",
							},
						},
						{
							text: "Other",
						},
					],
				}),
			],
		},

		// ------------------- section: bleeding -------------------

		bleeding: {
			title: "Bleeding",
			questions: [
				(pet) => ({
					label: `Is ${pet.name} bleeding?`,
					type: "select-one",
					answers: [
						{
							text: "Yes",
							followUp: {
								priority: 1,
								target: "bleeding_exam",
							},
						},
						{ text: "No" },
					],
				}),
			],
		},

		// ------------------- section: activity -------------------

		activity: {
			title: "Activity Level",
			questions: [
				(pet) => ({
					label: `Is ${pet.name} lethargic (i.e. not as active as usual)?`,
					type: "select-one",
					answers: [
						{
							text: "Normal activity",
						},
						{
							text: `Still; ${
								pet.species === "canine"
									? "wants to go on walks"
									: pet.species === "feline"
									? "wants to play or interact with humans"
									: ""
							} but not as much as usual`,
							print: "Mild lethargy",
							alert: 1,
							followUp: {
								priority: 1,
								target: ["behaviour", "bleeding"],
							},
						},
						{
							text: "Doesnt respond at all and cant move",
							print: "Comatose",
							alert: 3,
						},
					],
				}),
			],
		},

		// ------------------- section: urinating -------------------

		urinating: {
			title: "Urinating",
			questions: [
				(pet) => ({
					label: `How much urine is ${pet.name} producing?`,
					type: "select-one",
					answers: [
						{
							text: "Normal",
							print: "Urination normal",
						},
						{
							text: "More than normal",
							redirect: {
								priority: 1,
								target: "increased_urination",
							},
						},
					],
				}),
				{
					label: `Is there blood in the urine?`,
					type: "select-one",
					answers: [
						{
							text: "Yes",
							alert: 1,
							followUp: "bleeding",
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
							print: "Polyuric for 1 day",
							alert: 1,
						},
						{
							text: "1-3 days",
							print: "Polyuric for 1-3 days",
							alert: 2,
						},
					],
				},
			],
		},

		// ------------------- section: behaviour_exam -------------------

		behaviour_exam: {
			title: "Behaviour",
			questions: [
				(pet) => ({
					label: `Does ${pet.name} have any of the following movement issues?`,
					type: "select-one",
					answers: [
						{
							text: "Trembling or tremoring",
							print: "Tremoring",
							alert: 2,
						},
						{
							text: "No",
						},
					],
				}),
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
							alert: 3,
						},
					],
				},
				{
					label: "Where is the blood coming from?",
					type: "select-multiple",
					answers: [
						{
							text: "Skin wound",
							redirect: {
								priority: 1,
								target: "skin_wound",
							},
						},
						{
							text: "Mouth",
							printAdd: "from mouth",
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
							printAdd: "&lt;1mm wound",
							alert: 1,
						},
						{
							text: "1-10mm",
							printAdd: "1-10mm wound",
							alert: 1,
						},
					],
				},
				{
					label: "Are there any more wounds?",
					type: "select-one",
					answers: [
						{
							text: "yes",
							redirect: {
								priority: 1,
								target: "skin_wound",
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
