const htmlcontent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ApexCharts Pie Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        background: white;
      }
      #chart {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="chart"></div>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const options = {
          chart: {
            type: "pie",
            height: "100%",
          },
          labels: ["Resolved", "Raised"],
          series: [60, 40],
          colors: ["#00C49F", "#FF7F50"],
          legend: {
            position: "bottom",
          },
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      });
    </script>
  </body>
</html>
`;
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Donut Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        background: white;
      }
      #chart {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="chart"></div>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const options = {
          chart: {
            type: "donut",
            height: "100%",
          },
          labels: ["Resolved", "Raised"],
          series: [60, 40],
          colors: ["#00C49F", "#FF7F50"],
          legend: {
            position: "bottom",
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: "100%"
              },
              legend: {
                show:false,
                position: "bottom"
              }
            }
          }]
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      });
    </script>
  </body>
</html>
`;

import React, { useRef, useState } from "react";
import WebViewComponent from "../WebViewComponent";
//pie chart 
const PieChart = () => {
	const [locationReady, setLocationReady] = useState(false);
	const webviewRef = useRef<any>(null);
	const onMessage = async (event: any) => {
		const message = JSON.parse(event.nativeEvent.data);
		const { action, values, reason, isZoomed } = message;
		// console.log(action, values);
	};
	return (
		<WebViewComponent
			webviewRef={webviewRef}
			htmlcontent={htmlContent}
			onMessage={onMessage}
			setLoaded={setLocationReady}
		/>
	);
};

export default PieChart;
