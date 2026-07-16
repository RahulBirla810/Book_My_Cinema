const Event = require("../models/Event");
const Offer = require("../models/Offer");
const GiftCard = require("../models/GiftCard");
const Submission = require("../models/Submission");

// Get all events/items filtered by type
exports.getAllEvents = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const events = await Event.find(filter);

    return res.status(200).json({
      success: true,
      data: events,
      message: "Listings fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch listings",
    });
  }
};

// Get single event details
exports.getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
      message: "Listing details fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch listing details",
    });
  }
};

// Get all offers
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    return res.status(200).json({
      success: true,
      data: offers,
      message: "Offers fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch offers",
    });
  }
};

// Get all gift cards
exports.getAllGiftCards = async (req, res) => {
  try {
    const giftCards = await GiftCard.find();
    return res.status(200).json({
      success: true,
      data: giftCards,
      message: "Gift Cards fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to fetch gift cards",
    });
  }
};

// Handle ListYourShow submission
exports.submitListing = async (req, res) => {
  try {
    const { title, type, description, contactName, contactEmail } = req.body;

    if (!title || !type || !description || !contactName || !contactEmail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const submission = await Submission.create({
      title,
      type,
      description,
      contactName,
      contactEmail,
    });

    return res.status(201).json({
      success: true,
      data: submission,
      message: "Listing request submitted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to submit listing request",
    });
  }
};
