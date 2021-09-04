const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const notes = require("../../db/db.json");
const {findById, createNote, validateNote} = require("../../lib/notes");

//gets notes list
router.get("/", (req, res) => {
  return res.json(notes);
});

//gets note by id
router.get('/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.status(404);
  }
});

//adds note to notes list
router.post("/", (req, res) => {
  //save post to json variable and add json to notes list
  let title = req.body.title;
  let text = req.body.text;

  const newNote = createNote(title, text);
  res.send(newNote)

  //checks for title and text
  //returns error if no input
  if (!newNote.title || !newNote.text) {
    return res
      .status(400)
      .json({ msg: "Please include title and description." });
  }

  //adds new note to db list and returns list
  notes.push(newNote);
  const notesLocation = path.join(__dirname, "../../db/db.json");
  //writes new note into db list
  fs.writeFileSync(notesLocation, JSON.stringify(notes));
  res.send(notes);
});

//deletes note from notes list
router.delete("/:id", (req, res) => {
  //filters notes list and returns all that do not match id
  const remainingNotes = notes.filter(note => note.id.toString() !== req.params.id);
  
  console.log("here's what remains");
  console.log(remainingNotes);

  //writes new list of notes to db files
  const notesLocation = path.join(__dirname, "../../db/db.json");
  fs.writeFileSync(notesLocation, JSON.stringify(remainingNotes));
  res.send(notes);
  

  //checks that id matches the note that is trying to be deleted
  // const result = findById(req.params.id, notes);
  // if (result) {
  //   // const remainingNotes = notes.filter(note => note.id.toString() !== req.params.id);
  //   res.json(notes);
  //   return remainingNotes
  // } else {
  //   res.status(404);
  // }

})

module.exports = router;
