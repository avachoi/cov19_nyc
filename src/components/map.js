import React from "react";
import mapData from "./nyc.json";

const Map = (props) => {
	const rn = React.useRef(null);

	React.useEffect(() => {
		renderMap();
	}, [mapData]);

	const renderMap = () => {
		const node = rn.current;
		const width = node.width.animVal.value;
		const height = node.height.animVal.value;

		//add covidData into mapData
		const combinedData = mapData;
		props.covidData.forEach((area, idx) => {
			let zip = area.zipCode;

			for (let i = 0; i < mapData.features.length; i++) {
				if (mapData.features[i].properties.postalCode === zip) {
					combinedData.features[i].properties.covid = props.covidData[idx];
					break;
				}
			}
		});

		let originalHex;
		const group = SVG.selectAll("g")
			.data(combinedData.features)
			.enter()
			.append("g")
			.attr("fill", areaColor)
			.on("mouseover", function (d) {
				originalHex = d3.select(this).style("fill");
				d3.select(this).attr("opacity", ".5");
				tooltip.transition().duration(200).style("opacity", 0.9);
				console.log(d);
				tooltip
					.html(
						`City: ${d.properties.PO_NAME} <br> Zipcode: ${
							d.properties.postalCode
						} <br> Positive: ${
							d.properties.covid ? d.properties.covid.positive : "No Data"
						}`
					)
					.style("left", d3.event.pageX + "px")
					.style("top", d3.event.pageY - 50 + "px");
			})
			.on("mouseout", function () {
				d3.select(this).attr("opacity", "1");

				tooltip.transition().duration(500).style("opacity", 0);
			});

		function areaColor(d) {
			if (!d.properties.covid) {
				return "black";
			} else if (d.properties.covid.positive >= 100) {
				return "#3D0DB8";
			} else if (d.properties.covid.positive >= 75) {
				return "#5231AD";
			} else if (d.properties.covid.positive >= 50) {
				return "#664D9E";
			} else if (d.properties.covid.positive >= 25) {
				return "#9D89C4";
			} else if (d.properties.covid.positive < 25) {
				return "#D7CFE8";
			}
		}

		const areas = group.append("path").attr("d", path).attr("class", "area");
	};

	return <svg width={960} height={720} ref={rn} />;
};

export default Map;
