import React, { createContext, useContext, useState } from "react";

const NotesContext = createContext([]);

const reviver = (key, value) => {
  if (key === "createdAt") {
    return new Date(value);
  }
  return value;
}

const savedNotes = localStorage.getItem("notes");
const initialNotes = savedNotes ? JSON.parse(savedNotes, reviver) : [];

export function NotesProvider(props) {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <NotesContext.Provider value = {[notes, setNotes]}>
      {props.children}
    </NotesContext.Provider>
  );
}

export default function useNotes() {
  const [notes, setNotes] = useContext(NotesContext);

  function savedNotes(updatedNotes) {
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  return {
    notes,
    createNote() {
      const id = String(notes.length + 1);

      const newNote = {
        id,
        createdAt: new Date(),
        text: ""
      };

      const updatedNotes = [newNote, ...notes];
      savedNotes(updatedNotes);

      return newNote;
    },
    deleteNote(id) {
      const checkMatch = note => note.id !== id
    const deleteThis = notes.filter(checkMatch)
    savedNotes(deleteThis);
    },
    updateNote(id, newText) {
      const newNotes = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            text: newText
          };
        }
        return note;
      });
      savedNotes(newNotes);
    }
  };
}