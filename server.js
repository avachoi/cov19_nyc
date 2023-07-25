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
		function stringify(obj) {
			let cache = [];
			let str = JSON.stringify(obj, function (key, value) {
				if (typeof value === "object" && value !== null) {
					if (cache.indexOf(value) !== -1) {
						// Circular reference found, discard key
						return;
					}
					// Store value in our collection
					cache.push(value);
				}
				return value;
			});
			cache = null; // reset the cache
			return str;
		}
		// ROUTES
		app.use("/api/covid", (req, res) => {
			let data = [];
			const API_URI =
				"https://github.com/nychealth/coronavirus-data/blob/master/latest/last7days-by-modzcta.csv";
			axios(API_URI).then((response) => {
				const html = response.data;
				const $ = cheerio.load(html);

				let script =
					$("script").get()[0].parent.parent.children[1].next.children[0].next
						.children[0].next.next.next.next.next.next.next.next.next
						.children[0].next.children[0].next.children[0].next.next.next
						.children[0].next.children[0].next.children[0].next.children[0]
						.data;

				data = JSON.parse(script).payload.blob.csv.slice(1);

				const covidByZipCode = [];
				let id = 1;

				data.forEach(function (area) {
					const zip_code = area[0];
					const pos = area[7];
					const tested = area[6];
					covidByZipCode.push({
						id: id,
						zipCode: zip_code,
						positive: pos,
						total: tested,
					});
					id++;
				});
				res.status(200).send(JSON.stringify(covidByZipCode));
			});
		});

		return app;
	},
};
