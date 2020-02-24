import React from "react";
import NoteListItem from "./NoteListItem";
import { action } from "@storybook/addon-actions";

export default {
  title: "NoteListItem",
  component: NoteListItem
};

//Short text
export const ShortText = () => {
  return (
    <NoteListItem id="1" createdAt={new Date()} text="This is a short note" />
  );
};

//Long text

export const LongText = () => {
  return (
    <NoteListItem id="1" createdAt={new Date()} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu pulvinar elit. Phasellus luctus diam massa, in elementum nisl placerat vitae. Sed elementum libero accumsan neque lobortis lobortis. Duis nibh turpis, venenatis sit amet vestibulum et, ultrices sed sem. Phasellus convallis metus." />
  );
};

//Markdown text

export const MarkdownText = () => {
  return (
    <NoteListItem id="1" createdAt={new Date()} text="This _is_ some **markdown** ``text``" />
  );
};

//Created less than 1 week ago

const sixDaysAgo = Date.now() - (6*24*60*60*1000);
export const LessThanOneWeek = () => {
  const createdAt = new Date(sixDaysAgo);
  return (
    <NoteListItem id="1" createdAt={createdAt} text="This is a note for this week" />
  );
};

//Created more than 1 week ago

const twoWeeksAgo = Date.now() - (14*24*60*60*1000);
export const MoreThanOneWeek = () => {
  const createdAt = new Date(twoWeeksAgo);
  return (
    <NoteListItem id="1" createdAt={createdAt} text="This is a note from over a week ago" />
  );
};

//Click action

export const ClickAction = () => {
  return (
    <NoteListItem 
      id="1" 
      createdAt={new Date()} 
      onClick = {action("onClick")}
      text="This is a short note" />
  );
};

//Empty state

export const EmptyText = () => {
  return (
    <NoteListItem id="1" createdAt={new Date()} text="" />
  );
};

//Error

export const ErrorText = () => {
  const onClick = () => {
    throw new Error("simulated error");
  }
  return (
    <NoteListItem 
      id="1" 
      createdAt={new Date()} 
      onClick = {onClick}
      text="This is a short note" />
  );
};

//White Space
export const WhiteSpace = () => {
  return (
    <NoteListItem id="1" createdAt={new Date()} text=" " />
  );
};