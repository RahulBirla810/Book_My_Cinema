const express = require("express");
const router = express.Router();

const {
  getAllEvents,
  getEventDetails,
  getAllOffers,
  getAllGiftCards,
  submitListing,
} = require("../controllers/Event");

router.get("/getAllEvents", getAllEvents);
router.post("/getEventDetails", getEventDetails);
router.get("/getAllOffers", getAllOffers);
router.get("/getAllGiftCards", getAllGiftCards);
router.post("/submitListing", submitListing);

module.exports = router;
