const path = require("path");
const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = {
	app: function () {
		const app = express();
		const indexPath = path.join(__dirname, "public/index.html");
		const publicPath = express.static(path.join(__dirname, "public"));
		app.get("/", function (_, res) {
			res.sendFile(indexPath);
		});
		app.use("/public", publicPath);
		app.use(cors());

		// ROUTES.
		app.use("/api/covid", (req, res) => {
			const API_URI =
				"https://github.com/nychealth/coronavirus-data/blob/master/latest/last7days-by-modzcta.csv";
			axios(API_URI).then((response) => {
				const html = response.data;
				const $ = cheerio.load(html);
				const statsTable = $(".markdown-body .csv-data tbody > .js-file-line");
				const covidByZipCode = [];
				let id = 1;

				statsTable.each(function () {
					const zip_code = $(this).find("td:nth-child(2)").text();
					const pos = $(this).find("td:nth-child(9)").text();
					const tested = $(this).find("td:nth-child(8)").text();

					if (zip_code !== "" && zip_code !== "MODZCTA" && zip_code !== "NA") {
						covidByZipCode.push({
							id: id,
							zipCode: zip_code,
							positive: pos,
							total: tested,
						});
						id++;
					}
				});
				res.status(200).send(JSON.stringify(covidByZipCode));
			});
		});

		return app;
	},
};
