import React from "react";
import { render } from "react-dom";

const Header = (props) => {
	function handleChange(event) {
		//pass the id of clicked tab to handleToggle function
		props.handleToggle(event.target.id);

		//add/remove the "selected-tab" class to add underline css for clicked tab
		if (event.target.id === "table-tab") {
			event.target.nextSibling.classList.remove("selected-tab");
		} else {
			event.target.previousSibling.classList.remove("selected-tab");
		}
		event.target.classList.add("selected-tab");
	}
	return (
		<header>
			<img className="logo" src="../../public/logo.png"></img>
			<div className="tab-container">
				<div id="table-tab" className="selected-tab" onClick={handleChange}>
					Table
				</div>
				<div id="map-tab" onClick={handleChange}>
					Map
				</div>
			</div>
		</header>
	);
};

export default Header;
