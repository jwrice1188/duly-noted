import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import NoteEditPage from "./NoteEditPage";
import useNotes from "../hooks/useNotes";

export default function NoteEditPageController() {
  const { id } = useParams();
  const history = useHistory();
  const { notes, deleteNote, updateNote, archiveNote } = useNotes();

  const selectedNote = notes.find((note) => note.id === id)

  if (!selectedNote) return null;

  const handleSelectedNoteSave = (newText) => {
    if (newText === "") {
      deleteNote(id);
      history.goBack();
    } else {
      updateNote(id, newText);
      history.goBack();
    }
  };

  const handleSelectedNoteArchive = () => {
    archiveNote(id);
    history.goBack();
  }

  const handleSelectedNoteDelete = () => {
    deleteNote(id);
    history.goBack();
  }

  return (
    <NoteEditPage
      onSave={handleSelectedNoteSave}
      onDelete={handleSelectedNoteDelete}
      onArchive={handleSelectedNoteArchive}
      text={selectedNote.text}
    />
  );
}