export const INITIAL_STATE = {
	// Meta
	dateModified: undefined,
	datePublished: undefined,
	publishedBy: '',       // user email
	// Sync status
	publishing: false,
	loading: false,
	// Data
	primerQueue: ["_sectionName_"], // prepended to mainQueue if reporting a problem (i.e. (not in routine health check))
	mainQueue: ["_sectionName_"],
	optionalQueue: ["_sectionName_"],
	sections: { 
		_sectionName_: { 	// (variable)
			title: "",    	// displayed in UI
			condition: '',  // run section only if pet matches condition
			hidden: false,  // don't run section unless referenced as followUp
			questions: [
				{
					label: "", 					// diplayed in UI
					type: "",  					// text | select-one | select-multiple
					setsTitle: false,		// if (type=text) answer becomes the report's title
					lengthLimit: 0,   	// if (type=text) character limit; 0 = no limit
					imageUrl: '',
					answers: [
						{
							text: "", 			// displayed in UI
							alert: 3, 			// highest alert reacheddisplayed in final report;
															// 0 (none) | 1 (green) | 2 (yellow) | 3 (orange) | 4 (red)
							print: "", 			// displayed in final report
							printNote: "",	// displayed in final report
							followUp: {
								target: ["_sectionName_"], // sections to inject
								after: ["_sectionName_"],	// location(s) after which to inject target
																					// ['all']: push target to queue (i.e. redirect at the end of survey)
																					// ['none']: unshift target to queue (i.e. redirect immediately)
							},
						},
					],
				},
			],
		},
	},
};
