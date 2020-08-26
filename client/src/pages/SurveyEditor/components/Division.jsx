import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { useStyles } from "../SurveyEditor-styles";

export const Division = ({
	heading,
	headingVariant = "body1",
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
			<Typography variant={headingVariant} className={clx.heading}>
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

	const configEditor = (
		<ClickAwayListener
			mouseEvent="onMouseDown"
			touchEvent="onTouchStart"
			onClickAway={stopEditing}
		>
			<Paper className={clx.innerPaper}>
				{formType === "row" ? (
					<div className={clx.row}>
						{form}
						<IconButton children={<DoneIcon />} onClick={stopEditing} />
					</div>
				) : (
					formType === "grid" && (
						<>
							<div className={clx.form}>{form}</div>
							<div className={clx.row}>
								<IconButton children={<DoneIcon />} onClick={stopEditing} />
							</div>
						</>
					)
				)}
			</Paper>
		</ClickAwayListener>
	);

	// --- Questions editor ---

	const questionsEditor = (
		<Paper className={clx.innerPaper}>
			<Typography variant={headingVariant} className={clx.heading}>
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
