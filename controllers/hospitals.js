const hospitals = require("../models/hospitalDetailsModel");
const haversine = require("haversine");

exports.getHospitals = async (req, res) => {
  try {
    const { area, searchName, latitude, longitude, range, sortBy } = req.query;
    const filter = {};
    if (area) filter.area = area.split(",");
    if (searchName) filter.hospitalName = new RegExp(searchName, "i");

    const fixedPoint = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    if (range) {
      const allHospitals = await hospitals.find().select("latitude longitude");

      const hospitalsInRange = allHospitals.filter((hospital) => {
        const dist = haversine(
          fixedPoint,
          {
            latitude: hospital.latitude,
            longitude: hospital.longitude,
          },
          { unit: "km" }
        );
        return dist <= parseFloat(range);
      });

      const hospitalsInRangeIds = hospitalsInRange.map(
        (hospital) => hospital._id
      );

      filter._id = { $in: hospitalsInRangeIds };
    }

    const hospitalsList = await hospitals
      .find(filter)
      .sort({ [sortBy || "hospitalName"]: 1 });

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
      message: err.message,
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
