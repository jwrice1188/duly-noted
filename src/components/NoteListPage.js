import React, { useState } from "react";
import NoteListItem from "./NoteListItem";
import NoteEditPage from "./NoteEditPage";
import dayjs from "dayjs";

export default function NoteListPage(props) {
  const [notes, setNotes] = useState(initialNotes)
  const [selectedNoteID, setSelectedNoteId] = useState(null);

  function handleListItemClick(id) {
    setSelectedNoteId(id);
  };

  // const oneHourAgoMS = Date.now() - (1 * 60 * 60 * 1000);
  // const createdAt = new Date(oneHourAgoMS);


  const handleSelectedNoteSave = (newText) => {
    const newNotes = notes.map((note) => {
      if(note.id === selectedNoteID) {
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
    const sameNote = notes.map((note) => {
      return note;
    });
    setNotes(sameNote);
    setSelectedNoteId(null);
  }

  if (selectedNoteID){
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

  return(
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

const oneHourAgo = Date.now() - (1*60*60*1000);
const sixDaysAgo = Date.now() - (6*24*60*60*1000);
const twoWeeksAgo = Date.now() - (14*24*60*60*1000);

function formatDate(date) {
  if(date >= Date.now() - (1*7 * 24 * 60 * 60 * 1000)){
    return dayjs(date).fromNow();
  } else {
    return dayjs(date).format("h:mm a on M/D/YYYY");
  }
}

const initialNotes = [
  {
    id: "1",
    createdAt: formatDate(oneHourAgo),
    text: "React _is_ **fun**!"
  },
  {
    id: "2",
    createdAt: formatDate(sixDaysAgo),
    text: "This is note 2"
  },
  {
    id: "3",
    createdAt: formatDate(twoWeeksAgo),
    text: "This is note 3"
  },
];
