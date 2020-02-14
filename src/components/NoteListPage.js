import React, { useState } from "react";
import NoteListItem from "./NoteListItem";
import NoteEditPage from "./NoteEditPage";

export default function NoteListPage(props) {
  const [notes, setNotes] = useState(initialNotes)
  const [selectedNoteID, setSelectedNoteId] = useState(null);

  function handleListItemClick(id) {
    setSelectedNoteId(id);
  };

  const handleSelectedNoteSave = (newText) => {
    const newNotes = notes.map((note) => {
      if (note.id === selectedNoteID) {
        return {
          ...note,
          text: newText
        };
      }
      return note;
    });

    setNotes(newNotes);
    setSelectedNoteId(null);
  };

  const handleSelectedNoteDelete = () => {
    const checkMatch = note => note.id !== selectedNoteID
    const deleteThis = notes.filter(checkMatch)
    setNotes(deleteThis);
    setSelectedNoteId(null);
  }

  const handleSelectedNoteCancel = () => {
    setSelectedNoteId(null);
  }

  if (selectedNoteID) {
    const selectedNote = notes.find((note) => note.id === selectedNoteID)
    return (
      <NoteEditPage
        onSave={handleSelectedNoteSave}
        onCancel={handleSelectedNoteCancel}
        onDelete={handleSelectedNoteDelete}
        text={selectedNote.text}
      />
    )
  }

  return (
    <div className="page">
      <h1>Note List</h1>
      <div className="noteList">
        {
          notes.map((note) => {
            return (
              <NoteListItem
                key={note.id}
                id={note.id}
                text={note.text}
                createdAt={note.createdAt}
                onClick={handleListItemClick}
              />
            );
          })
        }
      </div>
    </div>
  );
}

const oneHourAgo = Date.now() - (1 * 60 * 60 * 1000);
const sixDaysAgo = Date.now() - (6 * 24 * 60 * 60 * 1000);
const twoWeeksAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);

const initialNotes = [
  {
    id: "1",
    createdAt: new Date(oneHourAgo),
    text: "React _is_ **fun**!"
  },
  {
    id: "2",
    createdAt: new Date(sixDaysAgo),
    text: " "
  },
  {
    id: "3",
    createdAt: new Date(twoWeeksAgo),
    text: "This is note 3"
  },
];
