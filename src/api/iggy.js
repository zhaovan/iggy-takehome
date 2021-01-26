// Quick frontend wrapper for API lookup call that passes in
// @param {float} lat - latitude of a location
// @param {float} lng - longtitude of a location
// @param {string} option - the specific option being passed into the
//                          API Call (wildfire-risk, air_quality, etc)

// Returns the result vlaue from
export async function lookup(lat, lng, option) {
    const iggyURL =
        "https://api.askiggy.com/v1/lookup?latitude=" +
        lat +
        "&longitude=" +
        lng +
        "&labels=" +
        option;

    const iggyResult = await fetch(iggyURL, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "X-Iggy-Token": process.env.REACT_APP_IGGY_KEY,
        },
    })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        });

    return iggyResult;
}
