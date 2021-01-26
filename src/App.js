import React, { useState } from "react";
import "./App.css";

// Importing api functions from wrappers, one is for the actually iggy API,
// the other is a conversion api from open geocode
import { lookup } from "./api/iggy.js";
import { convertAddressToGeocode } from "./api/geocode.js";

function App() {
    const [location, setLocation] = useState(null);
    // setting default option to light polution
    const [option, setOption] = useState("light-pollution");
    const [error, setErrors] = useState(null);
    const [resultValue, setResult] = useState(null);
    const [loading, setLoader] = useState(false);

    // Clearing results in case of input change
    function clearResult() {
        setResult(null);
    }

    // Asynchronous function to make sure that we actually get back the data
    async function handleSubmit() {
        // Set the loader to true
        setLoader(true);

        // Should handle more error checking here (api, submissions)
        const result = await convertAddressToGeocode(location);
        let lookupResult;
        if (result.status.code === 200) {
            const data = result.results;
            console.log(data[0].geometry);

            lookupResult = await lookup(
                data[0].geometry.lat,
                data[0].geometry.lng,
                option
            );

            // Hard coded-value
            lookupResult = {
                "wildfire-risk": {
                    value: 1,
                },
            };
        } else {
            setErrors("Failed to get data");
        }

        // Set the result from fetching here
        setResult(lookupResult);

        // Set the Loader to false
        setLoader(false);
    }

    return (
        <div className="App">
            <div className="App-header">
                <div className="header">
                    Real Estate Developer Location Search
                </div>

                <div className="container">
                    <div className="label">Enter your address here:</div>
                    <input
                        onChange={(e) => {
                            setLocation(e.target.value);
                            clearResult();
                        }}
                        className="input-bar"
                    />
                </div>
                <div className="container">
                    <div className="label">Choose a parameter to search on</div>

                    {/*Dropdown menu for the various options to pick from. 
                    Refactor to map using React principles */}
                    <select
                        name="type"
                        id="type"
                        className="dropdown"
                        onChange={(e) => {
                            setOption(e.target.value);
                            clearResult();
                        }}
                        value={option}
                    >
                        <option value="light-pollution">light-pollution</option>
                        <option value="landcover">landcover</option>
                        <option value="tree-canopy">tree-canopy</option>
                        <option value="wildfire-risk">wildfire-risk</option>

                        <option value="air_quality">air_quality</option>

                        <option value="population_density_per_km">
                            population_density_per_km
                        </option>
                    </select>
                </div>

                <button className="button" onClick={() => handleSubmit()}>
                    Search for a location
                </button>
                {/* Checks if the button has been hit */}
                {loading ? <div>Loading... </div> : <div />}
                {/* Check for errors */}
                {error ? <div className="result-box">{error}</div> : <div />}

                {/* If value has been successfully found, store in a resulting box */}
                {resultValue ? (
                    <div className="result-box">
                        {location} has a {option} value of{" "}
                        {Object.keys(resultValue).map((key, index) => {
                            // console.log(resultValue[key]);
                            return resultValue[key].value;
                        })}{" "}
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}

export default App;
