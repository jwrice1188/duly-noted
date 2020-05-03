import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import NoteEditPage from "./NoteEditPage";
import useNotes from "../hooks/useNotes";

const GET_ONE_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      isArchived
      text
    }
  }
`;

export default function NoteEditPageController() {
  const { id } = useParams();
  const history = useHistory();
  const { data, error, loading } = useQuery(GET_ONE_NOTE, {
    variables: {
      id
    }
  });  
  
  const { deleteNote, updateNote, archiveNote } = useNotes();

  if (loading) {
    return "Loading..." //TODO: eventually show a loading spinner
  }

  if (error) {
    return `${error}`; // Display errors on page for now
  }

  const selectedNote = data && data.note;
  if (!selectedNote) return null;

  const handleSelectedNoteSave = (newText) => {
    if (newText.trim() === "") {
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