import React, { useEffect } from "react";
import { render } from "react-dom";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

const App = () => {
	let main;
	return (
		<div>
			<Header />
			{main}
			<Footer />
		</div>
	);
};

render(<App />, document.getElementById("app"));
