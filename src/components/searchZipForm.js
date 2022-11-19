import React from "react";
import { render } from "react-dom";

const searchZipForm = (props) => {
	function handleChange(event) {
		props.handleZipSearch(event.target.value);
	}

	return (
		<input type="text" value={props.zipSearchVal} onChange={handleChange} />
	);
};

export default searchZipForm;
