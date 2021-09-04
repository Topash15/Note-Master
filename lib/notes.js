const fs = require('fs');
const path = require('path');
const { v4: uuidv4} = require('uuid');


function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id.toString() === id)[0];
  return result;
}


function validateNote(note) {
  if (!note.name || typeof note.name !== 'string') {
    return false;
  }
  if (!note.species || typeof note.species !== 'string') {
    return false;
  }
  if (!note.diet || typeof note.diet !== 'string') {
    return false;
  }
  if (!note.personalityTraits || !Array.isArray(note.personalityTraits)) {
    return false;
  }
  return true;
}

function createNote(title, text){
  //save post to json variable and add json to notes list
  const newNote = {
    title: title,
    text: text,
    id: uuidv4()
  };
  return newNote;
}

module.exports = {
  findById,
  createNote,
  validateNote
};
