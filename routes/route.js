const express = require("express");
const { getHospitals, getUniqueAreas } = require("../controllers/hospitals");

const router = express.Router();

router.route("/getHospitals").get(getHospitals);
router.route("/getUniqueAreas").get(getUniqueAreas);

module.exports = router;
