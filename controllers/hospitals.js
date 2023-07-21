const { get } = require("mongoose");
const hospitals = require("../models/hospitalDetailsModel");

exports.getHospitals = async (req, res) => {
    try {
        const { area, searchName } = req.query;

        const filter = {};
        if (area) filter.area = area;
        if (searchName) filter.hospitalName = { $regex: searchName, $options: "i" };

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