import React from "react";
import { render } from "react-dom";
import CaseRow from "./caseRow.js";

const CaseContainer = (props) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Rank</th>
					<th>Zipcode</th>
					<th>Positive</th>
					<th>Tested</th>
				</tr>
			</thead>
			<tbody>
				{props.cases.map((covidCase, idx) => {
					return (
						<CaseRow
							key={idx}
							covidCase={covidCase}
							idx={idx + 1}
							showPerPage={props.showPerPage}
							currentPage={props.currentPage}
						/>
					);
				})}
			</tbody>
		</table>
	);
};

export default CaseContainer;
