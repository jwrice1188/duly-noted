import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import NoteEditPage from "./NoteEditPage";

export default function NoteEditPageController() {
  const { id } = useParams();
  const history = useHistory();

  const selectedNote = notes.find((note) => note.id === id)
  if (!selectedNote) return null;
  const handleSelectedNoteSave = (newText) => {
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          text: newText
        };
      }
      return note;
    });
    setNotes(newNotes);
    history.goBack();
 
  };

  const handleSelectedNoteDelete = () => {
    const checkMatch = note => note.id !== id
    const deleteThis = notes.filter(checkMatch)
    history.goBack();
    setNotes(deleteThis);
  }


  return (
    <NoteEditPage
      onSave={handleSelectedNoteSave}
      onDelete={handleSelectedNoteDelete}
      text={selectedNote.text}
    />
  );
}