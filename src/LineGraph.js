import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {                                                         // a package which allows you view the 
        mode: "index",                                                 // when you hover around it
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [{
            type: "time",
            time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
            },
        }],
        yAxes: [{
            gridLines: {
                display: false,
            },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                    return numeral(value).format("0a");
                },
            },
        }],
    },
};

const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,                                                    // ...HELPER FUNCTION
                y: data[casesType][date] - lastDataPoint,                  // mathematical operation to find difference between
            };                                                            // number of cases between two consecutive days to determine y-axis value
            chartData.push(newDataPoint);                                // push x, y value into data array
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

export default function LineGraph({casesType = "cases"}) {                // defaults to display cases
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => response.json())
                .then((data) => {
                    let chartData = buildChartData(data, "cases");
                    setData(chartData);
                    // console.log(chartData);
                    // buildChart(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div>
                {data?.length > 0 && (
                    <Line 
                        options={options}
                        data={{
                        datasets: [{
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1034",
                            data: data,
                            fill: true,
                        }]
                    }} />
                )}
        </div>
    )
}

