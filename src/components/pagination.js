import React from "react";
import { render } from "react-dom";

const Pagination = (props) => {
	const handlePagination = (event) => {
		//send page number clicked to the onPageChange function
		props.onPageChange(event.target.value);
	};

	const pages = [];
	//create the number of pages needed for the amount of data
	for (let i = 1; i <= Math.ceil(props.dataLength / props.showPerPage); i++) {
		pages.push(i);
	}

	return (
		<ul className="pages">
			{pages.map((page) => {
				return props.currentPage === page ? (
					<li
						className="current-page"
						key={page}
						value={page}
						onClick={handlePagination}
					>
						{page}
					</li>
				) : (
					<li key={page} value={page} onClick={handlePagination}>
						{page}
					</li>
				);
			})}
		</ul>
	);
};

export default Pagination;
