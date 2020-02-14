import React from "react";
import NoteEditPage from "./NoteEditPage";

export default {
  title: "NoteEditPage",
  component: NoteEditPage
};

//Edit Note With Text

export const NoteWithText = () => {
  return (
    <NoteEditPage
      text="This is an editable note"
    />
  );
};

//Edit Note Without Text

export const NoteWithoutText = () => {
  return (
    <NoteEditPage
      text=""
    />
  );
};