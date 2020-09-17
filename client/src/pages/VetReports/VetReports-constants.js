import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { alertData } from "components";
import { getDateString } from "utils/date";

export const columns = [
	{
		id: "alert",
		label: "Alert",
		format: (alert) => (
			<FiberManualRecordIcon style={{ color: alertData[alert].color }} />
		),
	},
	{
		id: "dateCreated",
		label: "Date",
		format: (val) => getDateString(val),
	},
	{ id: "title", label: "Title" },
	{ id: "name", label: "Pet's name" },
	{ id: "species", label: "Species" },
	{ id: "breed", label: "Breed" },
	{ id: "ownerName", label: "Owner" },
];
// disablePadding: true

export const searchableFields = [
	"name",
	"species",
	"breed",
	"ownerName",
	"dateCreated",
	"title",
];
