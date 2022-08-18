const express = require("express");
const router = express.Router();



const mongoose = require("mongoose");
// const { Schema } = mongoose;
const Note = require("../models/Notes");

const { body, validationResult } = require("express-validator");
var fetchUser = require("../middleware/fetchUser");

router.post(
  "/addNote",
  body("title").isLength({ min: 3 }),
  body("description").isLength({ min: 5 }),
  body("tag").exists(),
  fetchUser,
  async (req, res) => {
    // Hanling errors
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const savedNote = Note({ title, description, tag, user: req.user.id });
      console.log(savedNote);
      savedNote.save();
      res.status(200).json({status:true,savedNote });
    } catch (error) {
      res.send({ error });
    }
  }
);

router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json({ notes });
  } catch (error) {
    res.send({ error });
  }
});

router.put("/updateNote/:id", fetchUser, async (req, res) => {
  // Hanling errors
  const { title, description, tag } = req.body;
  try {
    const { title, tag, description } = req.body;
    console.log(req.params.id)
    const updateNote = await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: title, description: description, tag: tag },
      { new: true }
    );
    res.status(200).json({ updateNote });
  } catch (error) {
    res.send({ error });
  }
});

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  // Hanling errors
  try {
    const deleteNote = await Note.findOneAndDelete({_id: req.params.id });
    console.log(req.params.id)
    res.status(200).json({deleteNote});
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;