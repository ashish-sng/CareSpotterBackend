const hospitals = require("../models/hospitalDetailsModel");

exports.getHospitals = async (req, res) => {
  try {
    const { area, searchName, latitude, longitude, range } = req.query;
    const filter = {};
    if (area) filter.area = area.split(",");
    if (searchName) filter.hospitalName = new RegExp(searchName, "i");
    // console.log( latitude && longitude && range);
    if (latitude && longitude && range) {
      // Convert the range to kilometers (you can adjust this if needed)
      const rangeInKm = parseFloat(range);
      // const rangeInKm = parseFloat(range) / 1000;

      // Calculate the coordinates for the square bounding box
      const earthRadiusKm = 6371; // Earth radius in kilometers
      const latRadian = (parseFloat(latitude) * Math.PI) / 180;
      const lonRadian = (parseFloat(longitude) * Math.PI) / 180;
      const latDelta = rangeInKm / earthRadiusKm;
      const lonDelta = rangeInKm / (earthRadiusKm * Math.cos(latRadian));

      // Create a bounding box for the given range
      const minLat = parseFloat(latitude) - latDelta;
      const maxLat = parseFloat(latitude) + latDelta;
      const minLon = parseFloat(longitude) - lonDelta;
      const maxLon = parseFloat(longitude) + lonDelta;

      // Add the latitude and longitude filter to the query
      filter.latitude = { $gte: minLat, $lte: maxLat };
      filter.longitude = { $gte: minLon, $lte: maxLon };
    }

    // console.log(filter);

    const hospitalsList = await hospitals.find(filter);

    res.status(200).json({
      status: "success",
      results: hospitalsList.length,
      data: {
        hospitalsList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUniqueAreas = async (req, res) => {
  try {
    const areas = await hospitals.find().distinct("area");
    res.status(200).json({
      status: "success",
      results: areas.length,
      data: {
        areas,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
