const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const db = require("../../db/db.json");

//gets notes list
router.get("/", (req, res) => {
  res.json(db);
  return db;
});

//adds note to notes list
router.post("/", (req, res) => {
  //save post to json variable and add json to notes list
  const newNote = {
    title: req.body.title,
    text: req.body.text,
  };

  //checks for title and text
  //returns error if no input
  if (!newNote.title || !newNote.text) {
    return res
      .status(400)
      .json({ msg: "Please include title and description." });
  }

  //adds new note to db list and returns list
  db.push(newNote);
  const dbLocation = path.join(__dirname, "../../db/db.json");
  //writes new note into db list
  fs.writeFileSync(dbLocation, JSON.stringify(db));
  res.send(db);
});

//deletes note from notes list

module.exports = router;
