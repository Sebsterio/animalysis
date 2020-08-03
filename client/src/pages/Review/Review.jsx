import React from "react";

const Review = ({ sequences }) => {
	const isAnswered = (q) => q.answers.some((a) => a.selected);

	const getAnswer = (q) => q.answers.findIndex((a) => a.selected);

	const allSections = Object.values(sequences).flat();

	return (
		<div className="answers">
			{allSections.map((section) => (
				<div className="answers__section" key={section.id}>
					{section.questions.map((question) => (
						<div className="answers__question" key={question.id}>
							{isAnswered(question) &&
								`${section.id} ${question.id} answer: ${getAnswer(question)}`}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Review;
