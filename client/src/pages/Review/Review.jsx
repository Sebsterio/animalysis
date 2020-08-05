import React from "react";
import { arrayify } from "utils/array";

const Review = ({ history, data }) => {
	const getQuestionData = ({ sectionName, questionIndex }) =>
		data[sectionName].questions[questionIndex];

	return (
		<div>
			{history.map(({ sectionName, questionIndex, answer }) => {
				let questionData = getQuestionData({ sectionName, questionIndex });
				if (typeof questionData === "function") questionData = questionData({});

				return arrayify(answer).map((answr) => {
					console.log(questionData.answers[answr]);
					const { print, printNote } = questionData.answers[answr];
					console.log({ print, printNote });
					return (
						<>
							{print && <div>{print}</div>}
							{printNote && <div>NOTE: {printNote}</div>}
						</>
					);
				});
			})}
		</div>
	);
};

export default Review;
