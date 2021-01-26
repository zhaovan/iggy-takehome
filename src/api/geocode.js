export async function convertAddressToGeocode(location) {
    const queryURL =
        "https://api.opencagedata.com/geocode/v1/json?q=" +
        location +
        "&key=" +
        process.env.REACT_APP_OPENCAGE_KEY;
    const result = await fetch(queryURL)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });

    return result;
}
