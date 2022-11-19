import React, { useEffect } from "react";
import { render } from "react-dom";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

const App = () => {
	const [currentTab, setCurrentTab] = React.useState("table-tab");

	function handleToggle(tab) {
		setCurrentTab(tab);
	}

	//determine which component to show depending on which tab is clicked
	let main;
	if (currentTab === "table-tab") {
		let main = (
			<main>
				<div className="container">
					<CaseContainer />
				</div>
			</main>
		);
	} else {
		main = <main></main>;
	}
	return (
		<div>
			<Header />
			{main}
			<Footer />
		</div>
	);
};

render(<App />, document.getElementById("app"));
