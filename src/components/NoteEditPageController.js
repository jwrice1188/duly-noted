import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import NoteEditPage from "./NoteEditPage";
import NoteListPage from "./NoteListPage";

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

const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $note: UpdateNoteInput!) {
    updateNote(
      id: $id 
      note: {
        text: $text
      }
    ) 
    {
      isArchived
      text
    }
  }
`;

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(
      id: $id
    ) 
    {
      isArchived
      text
    }
  }
`;

export default function NoteEditPageController() {
  const [updateNote] = useMutation(UPDATE_NOTE, {
    onCompleted(data) {
      if (data && data.updateNote) {
        const id = data.updateNote.id;
        history.push(`/notes/edit/${id}`);
      }
    },
    refetchQueries: [
      {
        query: NoteListPage.GET_NOTES
      }
    ]
  });

  const [deleteNote] = useMutation(DELETE_NOTE, {
    onCompleted(data) {
      if (data && data.deleteNote) {
        const id = data.deleteNote.id;
        history.push(`/notes/edit/${id}`);
      }
    },
    refetchQueries: [
      {
        query: NoteListPage.GET_NOTES
      }
    ]
  });

  const { id } = useParams();
  const history = useHistory();
  const { data, error, loading } = useQuery(GET_ONE_NOTE, {
    variables: {
      id
    }
  });

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
      deleteNote({
        variables: {
          id: selectedNote.id
        }
      });
      history.goBack();
    } else {
      updateNote({
        variables: {
          id: selectedNote.id,
          note: {
            text: newText
          }
        }
      });
      history.goBack();
    }
  }

  const handleSelectedNoteArchive = () => {
    updateNote({
      variables: {
        id: selectedNote.id,
        note: {
          isArchived: selectedNote.isArchived
        }
      }
    });
    history.goBack();
  }

  const handleSelectedNoteDelete = () => {
    deleteNote({
      variables: {
        id: selectedNote.id
      }
    });
    history.goBack();
  };

  return (
    <NoteEditPage
      onSave={handleSelectedNoteSave}
      onDelete={handleSelectedNoteDelete}
      onArchive={handleSelectedNoteArchive}
      text={selectedNote.text}
    />
  );
}