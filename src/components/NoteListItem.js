import React from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { IonItem, IonNote } from "@ionic/react";
import formatDate from "../util/formatDate";
import formatNoteItemText from "../util/formatNoteItemText";

export default function NoteListItem(props) {

  const {
    createdAt,
    id,
    onClick = () => { },
    text,
  } = props;

  return (
    <IonItem onClick={() => onClick(id)}>
        <ReactMarkdown source={formatNoteItemText(text)} />
        <IonNote slot="end" color="primary">
          {formatDate(createdAt)}
        </IonNote>
    </IonItem>
  );
}

NoteListItem.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired
}