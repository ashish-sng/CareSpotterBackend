const express = require('express');
const { getHospitals } = require("../controllers/hospitals");


const router = express.Router();

router.route("/getHospitals").get(getHospitals);

module.exports = router;