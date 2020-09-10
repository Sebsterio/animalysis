/************************************************
 * Sort functions used as arguments in Array.sort
 ************************************************/

export const byDateCreated_descending = (cur, next) => {
	const dateCur = new Date(cur.dateCreated).getTime();
	const dateNext = new Date(next.dateCreated).getTime();
	return dateNext - dateCur;
};
