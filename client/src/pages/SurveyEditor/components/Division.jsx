import React, { useState, useEffect, useCallback } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
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
	fieldsHeader,
	fieldsFooter,
	form,
	formType = "row",
	isFirst,
	isLast,
	handleDelete,
	handleMoveUp,
	handleMoveDown,
}) => {
	const c = useStyles();

	// --------------------------- Mode ----------------------------

	const [editing, setEditing] = useState(false);
	const editConfig = () => setEditing("config");
	const editFields = () => setEditing("fields");
	const stopEditing = useCallback(() => setEditing(false), [setEditing]);

	// ------------------------- ENTER key -------------------------

	const isEditingConfig = useCallback(() => editing === "config", [editing]);

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
				<div>
					<Typography variant={headingVariant} className={c.heading}>
						{heading}
					</Typography>
					{body && body}
				</div>

				<div className={c.row}>
					<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
					<IconButton children={<EditIcon />} onClick={editConfig} />
					<IconButton children={<QuestionAnswerIcon />} onClick={editFields} />
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

			{!!fieldsHeader && <div className={c.mTop2}>{fieldsHeader}</div>}

			{!!fields && !!fields.length && (
				<div className={fieldsType === "grid" ? c.grid : c.mTop2}>{fields}</div>
			)}

			{!!fieldsFooter && <div className={c.mTop2}>{fieldsFooter}</div>}
		</Paper>
	);

	console.log({ fields });

	return editing === "config"
		? configEditor
		: editing === "fields"
		? fieldsEditor
		: viewer;
};
