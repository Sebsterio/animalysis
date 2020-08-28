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

/*********************************************************************
 * Container for Section, Question, and Answer
 *
 * Has three modes:
 * 	- Viewer - compact and non-editable; has buttons for:
 * 		- Switch to other modes
 * 		- Delete parent
 * 		- Move parent up/down
 * 	- Config-editor - form for editing various parameters of parent
 * 	- Fields-editor - list of children
 *
 * "Done" button, ENTER-key, and click-away event - switch mode to "viewer"
 *********************************************************************/

export const Division = ({
	backgroundColor,
	// ------------ Viewer ------------
	heading, // (String)
	headingVariant = "body1", // Typography prop
	headingPrefix, // (String)
	body, // (String | Component)
	isFirst, // is move-up button disabled
	isLast, // is move-down button disabled
	fieldsButtonDisabled,
	handleDelete,
	handleMoveUp,
	handleMoveDown,
	// --------- Fields editor --------
	fields, // (Component)
	fieldsType = "stack", // 'stack' | 'grid'
	fieldsHeader, // (String | Component)
	fieldsFooter, // (String | Component)
	// --------- Config editor --------
	form, // (Component)
	formType = "row", // 'row' | 'grid'
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

	let style = {};
	if (backgroundColor) style = { backgroundColor };

	// --- Viewer ---

	const viewer = (
		<Paper className={c.division} style={style}>
			<div className={c.viewer}>
				<div>
					<Typography variant={headingVariant} className={c.heading}>
						{headingPrefix && headingPrefix + ": "}
						{heading}
					</Typography>
					{body && body}
				</div>

				<div className={c.row}>
					<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
					<IconButton children={<EditIcon />} onClick={editConfig} />
					{!fieldsButtonDisabled && (
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
			<Paper className={c.division} style={style}>
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
		<Paper className={c.divisionExpanded} style={style}>
			<div className={c.row}>
				<Typography variant={headingVariant} className={c.heading}>
					{headingPrefix && headingPrefix + ": "}
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

	// -----------------------

	return editing === "config"
		? configEditor
		: editing === "fields"
		? fieldsEditor
		: viewer;
};
