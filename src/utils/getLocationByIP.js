async function getLocationByIP() {
  try{
    const response = await fetch('http://ip-api.com/json');

      if (response.status !== 200) {
        console.log('Request failed.  Returned status of', response.status);
        return;
      }

    const data = await response.json();
    return {
      latitutde: data.lat,
      longitude: data.lon
    }
  } catch (err) {
    console.log('Fetch Error :-S', err);
  }
}

export default getLocationByIP;