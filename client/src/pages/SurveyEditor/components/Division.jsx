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
	body,
	fields,
	fieldsType = "stack",
	form,
	formType = "row",
	isFirst,
	isLast,
	handleDelete,
	handleMoveUp,
	handleMoveDown,
	addButtonText,
	handleAddButtonClick,
}) => {
	const c = useStyles();

	// --------------------------- Mode ----------------------------

	const [editing, setEditing] = useState(false);
	const editConfig = () => setEditing("config");
	const editFields = () => setEditing("fields");
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
		<Paper className={c.division}>
			<div className={c.viewer}>
				<Typography variant={headingVariant} className={c.heading}>
					{heading}
					{body && body}
				</Typography>

				<div className={c.row}>
					<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
					<IconButton children={<EditIcon />} onClick={editConfig} />
					{!!fields && (
						<IconButton
							children={<QuestionAnswerIcon />}
							onClick={editFields}
						/>
					)}
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
			<Paper className={c.division}>
				{formType === "row" ? (
					<div className={c.row}>
						{form}
						<IconButton children={<DoneIcon />} onClick={stopEditing} />
					</div>
				) : (
					formType === "grid" && (
						<>
							<div className={c.form}>{form}</div>
							<div className={c.mTop2}>
								<div className={c.row}>
									<IconButton children={<DoneIcon />} onClick={stopEditing} />
								</div>
							</div>
						</>
					)
				)}
			</Paper>
		</ClickAwayListener>
	);

	// --- Questions editor ---

	const fieldsEditor = (
		<Paper className={c.division}>
			<div className={c.row}>
				<Typography variant={headingVariant} className={c.heading}>
					{heading}
				</Typography>
				<IconButton children={<DoneIcon />} onClick={stopEditing} />
			</div>

			{!!fields && !!fields.length && (
				<div className={fieldsType === "grid" ? c.grid : c.mTop2}>{fields}</div>
			)}

			<div className={c.mTop2}>
				<Button
					fullWidth
					variant="outlined"
					children={addButtonText}
					onClick={handleAddButtonClick}
				/>
			</div>
		</Paper>
	);

	return editing === "config"
		? configEditor
		: editing === "fields"
		? fieldsEditor
		: viewer;
};
