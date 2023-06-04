import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import styled from "./BarChart.module.css";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function BarChart() {
  //Extracting data from central hub, Redux
  const data = useSelector((state) => state.measures.measures);
  //State management for location attribute
  const [location, setLocation] = useState("Select");

  //Storing all the unique locations
  var locations = [];

  // Process the data using reduce()
  const processedData = data.reduce((result, item) => {
    const { location, value, date } = item;

    // Check if the location already exists in the result
    const existingLocation = result.find(
      (locationData) => locationData.location === location
    );

    if (existingLocation) {
      // If the location exists, add the value and date to its data array
      existingLocation.data.push({ value, date });
    } else {
      // If the location doesn't exist, create a new location object
      const newLocation = { location, data: [{ value, date }] };
      locations.push(location);
      result.push(newLocation);
    }

    return result;
  }, []);

  //Handler for storing location value onChange event through setLocation function
  function changeLocationHandler(event) {
    setLocation(event.target.value);
  }

  //Converting YYYY-MM-DDTHH:MM:SS+00:00 format to DD MMM YYYY HH:MM format
  function dateConverter(dateArr) {
    const newDateArr = [];
    
    for (const eachDate in dateArr) {
      const date = new Date(dateArr[eachDate]);
      var month = date.toLocaleString('default', { month: 'long' });
      const newDate = date.getDate()+" "+month+" "+ date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
      newDateArr.push(newDate)
    }
    return newDateArr
  }

  return (
    <div className={styled.barChartContent}>
      <div>
        <select
          value={location}
          onChange={changeLocationHandler}
          className={styled.select}
        >
          <option>Select</option>
          {locations.map((eachLocation) => {
            return (
              <option value={eachLocation} key={eachLocation}>
                {eachLocation}
              </option>
            );
          })}
        </select>
      </div>
      {location != "Select" ? (
        processedData
          .filter((eachLoc) => eachLoc.location == location)
          .map((eachData, index) => {
            const xDateLabels = [];
            const yValueLabels = [];
            const dateValues = eachData.data;
            for (const dV in dateValues) {
              xDateLabels.push(dateValues[dV].date.utc);
              yValueLabels.push(dateValues[dV].value);
            }
            return (
              <div key={index}>
                <Bar
                  height={400}
                  width={400}
                  data={{
                    labels: dateConverter(xDateLabels),
                    datasets: [
                      {
                        label: "Values",
                        data: yValueLabels,
                        backgroundColor: "#2777bb",
                        borderColor: "#2777bb",
                        borderWidth: 1,
                        barThickness: 5,
                        hoverBackgroundColor: "#00205b",
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    layout: {
                      padding: 40,
                    },
                  }}
                />
              </div>
            );
          })
      ) : (
        <p className={styled.para}>Please Select the Location</p>
      )}
    </div>
  );
}

export default BarChart;
