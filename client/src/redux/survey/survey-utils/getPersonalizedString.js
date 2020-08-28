/**********************************************************************************
 * Injects object props into a string
 * 
 * Variable format: "[variable"];
 * returns: pet[variable]
 * 
 * Conditionals format: "[variable ? condition: expression | condition: expression]"
 * returns: pet[variable] === condition ? expression : ""
 * 
 * Whitespace outside of values is trimmed
 * "_" turns into whitespace
 ***********************************************************************************/

 export const getPersonalizedString = (text, pet) =>
	text.replace(/\[[A-Za-z?:|_ ]+\]/g, (str) => {
		let [prop, statements] = str.replace(/^\[|\]$/g, "").split("?").map((str) => str.trim());
		return (!statements) 
			? pet[prop] 
			:	statements.split("|").map((statement) => {
				const [condition, expression] = statement.split(":").map((str) => str.trim());
				return pet[prop] === condition ? expression : "";
			}).join("").replace("_", " ");
	});