import React from "react";
import { render } from "react-dom";

const CaseRow = (props) => {
	const { zipCode, positive, total } = props.covidCase;
	const { showPerPage, currentPage } = props;

	return (
		<tr>
			<td>{showPerPage * currentPage - showPerPage + props.idx}</td>
			<td>{zipCode}</td>
			<td>{positive}</td>
			<td>{total}</td>
		</tr>
	);
};

export default CaseRow;
