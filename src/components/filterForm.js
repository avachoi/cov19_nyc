import React from "react";
import { render } from "react-dom";

const FilterForm = (props) => {
	function handleChange(event) {
		props.onDropDownChange(event.target.value);
	}

	function handleChildClick(event) {
		event.stopPropagation();
	}

	return (
		<div className="filterContainer">
			<div className="select animated zoomIn">
				<input type="radio" name="option"></input>
				<i className="toggle icon icon-arrow-down"></i>
				<i className="toggle icon icon-arrow-up"></i>
				<span className="placeholder">Sort by...</span>
				<label className="option">
					<input
						type="radio"
						name="option"
						value="zip"
						onClick={handleChange}
					></input>
					<span className="title animated fadeIn" onClick={handleChildClick}>
						Zipcode
					</span>
				</label>
				<label className="option" name="Map">
					<input
						type="radio"
						name="option"
						value="positive"
						onClick={handleChange}
					></input>
					<span className="title animated fadeIn" onClick={handleChildClick}>
						Positive
					</span>
				</label>
			</div>
		</div>
	);
};

export default FilterForm;
