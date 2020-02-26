import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import NoteEditPage from "./NoteEditPage";
import useNotes from "../hooks/useNotes";

export default function NoteEditPageController() {
  const { id } = useParams();
  const history = useHistory();
  const { notes, deleteNote, updateNote } = useNotes();

  const selectedNote = notes.find((note) => note.id === id)
  if (!selectedNote) return null;
  const handleSelectedNoteSave = (newText) => {
    updateNote(id, newText);
    history.goBack();
  };

  const handleSelectedNoteDelete = () => {
    deleteNote(id);
    history.goBack();
  }


  return (
    <NoteEditPage
      onSave={handleSelectedNoteSave}
      onDelete={handleSelectedNoteDelete}
      text={selectedNote.text}
    />
  );
}