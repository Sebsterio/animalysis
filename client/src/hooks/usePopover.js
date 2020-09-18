import { useState } from "react";

export const usePopover = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [infoText, setInfoText] = useState("");

	const selectors = {
		isOpen: !!anchorEl,
		anchorEl,
		infoText,
	};

	const operations = {
		showPopover: (e, infoText) => {
			e.stopPropagation();
			setInfoText(infoText);
			setAnchorEl(e.currentTarget);
		},

		hidePopover: (e) => {
			e.stopPropagation();
			setAnchorEl(null);
		},
	};

	return [selectors, operations];
};
