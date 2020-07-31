import React from "react";

export const Review = ({ surveyData }) => {
	const isAnswered = (q) => q.answers.some((a) => a.selected);

	const getAnswer = (q) => q.answers.findIndex((a) => a.selected);

	return (
		<div className="answers">
			{[...surveyData.main, ...surveyData.optional].map((s) => (
				<div className="answers__section" key={s.route}>
					{s.questions.map((q) => (
						<div className="answers__question" key={q.route}>
							{isAnswered(q) && (
								<>
									{s.route} - {q.route} - answer: {getAnswer(q)}
								</>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};
