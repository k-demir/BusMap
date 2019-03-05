const rp = require("request-promise");

const apiUrl = "http://data.foli.fi/siri/vm";

async function getInfo() {
  let data = {};

  await rp({uri: apiUrl, gzip: true}).then(function(body) {
    buses = JSON.parse(body).result.vehicles;

    for (let busKey in buses) {
      let bus = buses[busKey];

      if (bus.latitude && bus.longitude) {
        data[busKey] = {
          busNum: bus.publishedlinename,
          lat: bus.latitude,
          lon: bus.longitude,
          origin: bus.originname,
          destination: bus.destinationname
        }
      }
    }

  });
  return data;
}


exports.getData = getInfo;
