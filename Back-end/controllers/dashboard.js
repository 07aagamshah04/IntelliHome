const { validateToken } = require("../services/authentication");
const Family = require("../models/family");
const User = require("../models/users");
const Events = require("../models/events");

async function getEvents(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    const { familyId } = req.user; // Assuming familyId is stored in req.user
    const events = await Events.find({ createdBy: familyId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
async function verifyMemebr(req, res) {
  return res.status(200).json({ msg: "Done" });
}
async function addEvent(req, res) {
  try {
    const { familyId } = req.user; // Assuming familyId is stored in req.user
    const { title, date, time } = req.body;

    // Create a new event document
    const newEvent = new Events({
      eventName: title,
      eventDate: date,
      eventTime: time,
      createdBy: familyId,
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    // Respond with the saved event
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
async function removeEvent(req, res) {
  const { id } = req.params;

  try {
    const event = await Events.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getEvents, verifyMemebr, addEvent, removeEvent };
