import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { useStyles } from "../SurveyEditor-styles";

export const Division = ({
	heading,
	fields,
	form,
	formType,
	isFirst,
	isLast,
	handleDelete,
	handleMoveUp,
	handleMoveDown,
	addButtonText,
	handleAddButtonClick,
}) => {
	const clx = useStyles();

	// --------------------------- Mode ----------------------------

	const [editing, setEditing] = useState(false);
	const editConfig = () => setEditing("config");
	const editQuestions = () => setEditing("fields");
	const stopEditing = () => setEditing(false);

	// ------------------------- ENTER key -------------------------

	const isEditingConfig = () => editing === "config";

	useEffect(() => {
		if (!isEditingConfig) return;
		const handleEnter = (e) => e.key === "Enter" && stopEditing();
		window.addEventListener("keydown", handleEnter);
		return () => window.removeEventListener("keydown", handleEnter);
	}, [isEditingConfig, stopEditing]);

	// --------------------------- View -------------------------------

	// --- Viewer ---

	const viewer = (
		<Paper className={clx.innerPaper}>
			<Typography variant="h6" className={clx.heading}>
				{heading}
			</Typography>

			<div className={clx.row}>
				<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
				<IconButton children={<EditIcon />} onClick={editConfig} />
				<IconButton children={<QuestionAnswerIcon />} onClick={editQuestions} />

				<IconButton
					children={<ArrowUpwardIcon />}
					onClick={handleMoveUp}
					disabled={isFirst}
				/>
				<IconButton
					children={<ArrowDownwardIcon />}
					onClick={handleMoveDown}
					disabled={isLast}
				/>
			</div>
		</Paper>
	);

	// --- Config editor ---

	const configEditor =
		formType === "row" ? (
			<Paper className={clx.innerPaper}>
				<div className={clx.row}>
					{form}
					<IconButton children={<DoneIcon />} onClick={stopEditing} />
				</div>
			</Paper>
		) : (
			formType === "grid" && (
				<Paper className={clx.innerPaper}>
					<div className={clx.form}>
						{form}
						<div className={clx.row}>
							<IconButton children={<DoneIcon />} onClick={stopEditing} />
						</div>
					</div>
				</Paper>
			)
		);

	// --- Questions editor ---

	const questionsEditor = (
		<Paper className={clx.innerPaper}>
			<Typography variant="h6" className={clx.heading}>
				{heading}
			</Typography>

			{!!fields.length && <div className={clx.group}>{fields}</div>}

			<div className={clx.row}>
				<Button
					fullWidth
					variant="outlined"
					children={addButtonText}
					onClick={handleAddButtonClick}
				/>
				<IconButton children={<DoneIcon />} onClick={stopEditing} />
			</div>
		</Paper>
	);

	return editing === "config"
		? configEditor
		: editing === "fields"
		? questionsEditor
		: viewer;
};
