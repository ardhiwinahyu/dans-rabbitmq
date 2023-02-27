const express = require("express");
const router = express.Router();
const { produceQueue } = require("../controllers/publisher.controller");

router.get("/", async (req, res, next) => {
	res.json({
		message: "Halo",
	});
});

router.get("/tesrabbit", produceQueue);

module.exports = router;
